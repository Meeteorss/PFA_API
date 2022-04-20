import express from "express";
import { CreateCoordResponse, Req } from "../types/types";
import { isAuth } from "../middlewares/isAuth";
import UserRepository from "../repositories/UserRepository";
import { ObjectId } from "mongodb";
import { Coordinates } from "../entities/Coordinates";
import CoordinatesRepository from "../repositories/CoordinatesRepository";
import { isAuthAndOwner } from "../middlewares/isAuthAndOwner";

export const coordinatesRouter = express.Router();

coordinatesRouter.post("/", isAuth, async (req: Req, res) => {
  const user = await UserRepository.findOneBy({
    where: {
      _id: new ObjectId(req.session.userId?.toString()),
    },
  });
  const input: Coordinates = { ...req.body.body.inputs, creator: user };
  let response: CreateCoordResponse = { coordinates: null, errors: [] };
  //validation
  // console.log("Input : ", input);
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

coordinatesRouter.get("/", isAuth, async (req: Req, res) => {
  const ls = await CoordinatesRepository.find({});
  // await CoordinatesRepository.deleteMany({});
  res.send(ls);
});
