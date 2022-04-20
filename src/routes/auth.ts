import express from "express";
import UserRepository from "../repositories/UserRepository";

import { login, logout, registerUser } from "../controllers/Auth";

import { ObjectId } from "mongodb";

export const authRouter = express.Router();

authRouter.post("/login", (req: any, res) => {
  login(req, res, req.body.body);
});

authRouter.post("/logout", (req, res) => {
  logout(req, res);
});

authRouter.post("/register", async (req: any, res) => {
  registerUser(req, res, req.body.body);
});

authRouter.get("/", async (req: any, res) => {
  if (req.session.userId) {
    const user = await UserRepository.findOneBy({
      where: {
        _id: new ObjectId(req.session.userId),
      },
    });

    if (user) {
      res.send({
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.send({ user: null });
    }
  } else {
    res.send({ user: null });
  }
});
