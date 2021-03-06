import express from "express";
import { CreateCoordResponse, Req } from "../types/types";
import { isAuth } from "../middlewares/isAuth";
import UserRepository from "../repositories/UserRepository";
import { ObjectId } from "mongodb";

import CoordinatesRepository from "../repositories/CoordinatesRepository";
import { isAuthAndOwner } from "../middlewares/isAuthAndOwner";
import { formatUser } from "../utils/format/formatUser";

export const coordinatesRouter = express.Router();

coordinatesRouter.post("/", isAuth, async (req: Req, res) => {
  const u = await UserRepository.findOneBy({
    where: {
      _id: new ObjectId(req.session.userId?.toString()),
    },
  });
  const user = formatUser(u!);
  const input = { ...req.body.body.inputs, creator: user };
  let response: CreateCoordResponse = { coordinates: null, errors: [] };
  //validation

  if (!input.gps?.lat || !input.gps?.lng) {
    response.errors = [
      ...response.errors,
      { field: "gps", message: "Gps coordinates are invalid" },
    ];
  }
  if (input.tags?.length == 0) {
    response.errors = [
      ...response.errors,
      { field: "tags", message: "Provide at least one tag" },
    ];
  }
  //....
  //end validation

  if (response.errors.length) {
    res.send(response);
  } else {
    response.coordinates = await CoordinatesRepository.save(input);
    res.send(response);
  }
});

coordinatesRouter.put("/:id", isAuth, async (req: Req, res) => {
  const id = new ObjectId(req.params.id.toString());
  const input = { ...req.body.body.inputs };

  let c = await CoordinatesRepository.findOneBy({
    where: {
      _id: id,
    },
  });
  if (c) {
    c = {
      ...c,
      ...input,
      // socials: [...c.socials, ...input.socials],
      socials: [
        ...(c.socials ? c.socials : []),
        ...(input.socials ? input.socials : []),
      ],
      photos: [
        ...(c.photos ? c.photos : []),
        ...(input.photos ? input.photos : []),
      ],
    };
    const r = await CoordinatesRepository.save(c!);

    res.send({ coordinates: r });
  } else {
    res.send({ error: "Not found" });
  }
});

coordinatesRouter.get("/user/:id", isAuthAndOwner, async (req: Req, res) => {
  const id = new ObjectId(req.params.id.toString());

  const ls = await CoordinatesRepository.findAndCount({
    where: { "creator.id": id },
  });

  res.send({ count: ls[1], data: ls[0], error: null });
});

coordinatesRouter.delete("/:id", isAuth, async (req: Req, res) => {
  const { id } = req.params;

  const c = await CoordinatesRepository.findOneBy({
    where: {
      _id: new ObjectId(id),
    },
  });
  if (!c) {
    res.send("Coordinates doesn't exsit").status(404);
  } else {
    if (c.creator.id.toString() !== req.session.userId?.toString()) {
      res.send("Not authorized").status(401);
    } else {
      await CoordinatesRepository.remove(c);
      res.send("Deleted succesfully").status(200);
    }
  }
});

coordinatesRouter.get("/:id", isAuth, async (req: Req, res) => {
  const { id } = req.params;
  const c = await CoordinatesRepository.findOneBy({
    where: {
      _id: new ObjectId(id),
    },
  });
  if (!c) {
    res.send({ error: "Coordinates doesn't exsit" });
  } else {
    res.send({ coordinates: c });
  }
});

coordinatesRouter.get("/", isAuth, async (req: Req, res) => {
  const ls = await CoordinatesRepository.find({});
  // await CoordinatesRepository.deleteMany({});
  res.send(ls);
});
