import { NextFunction, Response } from "express";
import { ObjectId } from "mongodb";
import UserRepository from "../repositories/UserRepository";
import { Req } from "../types/types";

export const isAuthAndOwner = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    res.send("Not Authenticated");
  } else {
    const user = await UserRepository.findOneBy({
      where: {
        _id: new ObjectId(req.session.userId.toString()),
      },
    });
    if (!user) {
      res.send("Not Authenticated");
    } else {
      const paramId = new ObjectId(req.params.id.toString());
      const sessionId = user.id;
      if (paramId.toString() !== sessionId.toString()) {
        console.log("param id: ", paramId);
        console.log("session id:", sessionId);

        res.send({ error: "You cannot get these infos" });
      } else {
        next();
      }
    }
  }
};
