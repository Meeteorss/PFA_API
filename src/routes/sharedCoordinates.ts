import express from "express";
import { CreateCoordResponse, Req } from "../types/types";
import { isAuth } from "../middlewares/isAuth";
import UserRepository from "../repositories/UserRepository";
import { ObjectId } from "mongodb";

import { isAuthAndOwner } from "../middlewares/isAuthAndOwner";
import SharedCoordinatesRepository from "../repositories/SharedCoordinatesRepository";

export const sharedCoordinatesRouter = express.Router();

sharedCoordinatesRouter.post("/", isAuth, async (req: Req, res) => {
  const u = await UserRepository.findOneBy({
    where: {
      _id: new ObjectId(req.session.userId?.toString()),
    },
  });

  const input = {
    ...req.body.body,
    user: u?.username,
    userId: u?.id.toString(),
  };
  const c = input.input;

  let response = { coordinates: null as any, errors: [] };

  if (response.errors.length) {
    res.send(response);
  } else {
    response.coordinates = await SharedCoordinatesRepository.save({
      coordinates: c,
      userId: u?.id.toString(),
      user: u?.username,
    });

    res.send(response);
  }
});

sharedCoordinatesRouter.get("/", isAuth, async (req: Req, res) => {
  const id = req.session.userId;

  const scs = await SharedCoordinatesRepository.find({
    where: { userId: id!.toString() },
  });

  res.send({ sharedCoordinates: scs, error: null });
});

sharedCoordinatesRouter.delete("/:id", isAuth, async (req: Req, res) => {
  const { id } = req.params;
  const sc = await SharedCoordinatesRepository.findOneBy({
    where: {
      _id: new ObjectId(id),
    },
  });
  if (!sc) {
    res.send({ error: "Shared Coordinates does'nt exist." });
  } else {
    if (sc.userId !== req.session.userId?.toString()) {
      res.send({ error: "Not autorized." });
    } else {
      const re = await SharedCoordinatesRepository.remove(sc);
      if (re) {
        res.send("Deleted succesfully");
      } else {
        res.send({ error: "An error has occured" });
      }
    }
  }
});

// sharedCoordinatesRouter.delete("/:id", isAuth, async (req: Req, res) => {
//   const { id } = req.params;

//   const c = await CoordinatesRepository.findOneBy({
//     where: {
//       _id: new ObjectId(id),
//     },
//   });
//   if (!c) {
//     res.send("Coordinates doesn't exsit").status(404);
//   } else {
//     if (c.creator.id.toString() !== req.session.userId?.toString()) {
//       res.send("Not authorized").status(401);
//     } else {
//       await CoordinatesRepository.remove(c);
//       res.send("Deleted succesfully").status(200);
//     }
//   }
// });

// sharedCoordinatesRouter.get("/:id", isAuth, async (req: Req, res) => {
//   const { id } = req.params;
//   const c = await CoordinatesRepository.findOneBy({
//     where: {
//       _id: new ObjectId(id),
//     },
//   });
//   if (!c) {
//     res.send({ error: "Coordinates doesn't exsit" });
//   } else {
//     res.send({ coordinates: c });
//   }
// });

// sharedCoordinatesRouter.get("/", isAuth, async (req: Req, res) => {
//   const ls = await CoordinatesRepository.find({});
//   // await CoordinatesRepository.deleteMany({});
//   res.send(ls);
// });
