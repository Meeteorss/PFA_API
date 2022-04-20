import { NextFunction, Response } from "express";
import { ObjectId } from "mongodb";
import UserRepository from "../repositories/UserRepository";
import { Req } from "../types/types";

export const isAuth = async (req: Req, res: Response, next: NextFunction) => {
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
      next();
    }
  }
};
