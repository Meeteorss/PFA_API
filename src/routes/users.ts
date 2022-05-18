import express from "express";
import { isAuth } from "../middlewares/isAuth";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import { Req } from "../types/types";
import { ObjectId } from "mongodb";
import { formatUser } from "../utils/format/formatUser";

export const userRouter = express.Router();

userRouter.get("/:id", isAuth, async (req: Req, res) => {
  try {
    const user = await UserRepository.findOneBy(
      new ObjectId(req.params.id.toString())
    );
    if (user) {
      res.send({ user: formatUser(user) });
    } else {
      res.send({ error: "User not found" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

userRouter.get("/username/:username", isAuth, async (req: Req, res) => {
  try {
    const user = await UserRepository.findOneBy({
      where: { username: { $regex: req.params.username, $options: "-i" } },
    });
    if (user) {
      res.send({ user: formatUser(user) });
    } else {
      res.send({ error: "User not found" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

userRouter.get("/", async (req, res) => {
  const data = await UserRepository.find();

  res.send({ users: data });
});

userRouter.get("/private", isAuth, (req, res) => {
  res.send("Private route");
});

userRouter.post("/", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const user = new User();
  user.username = username;
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.password = password;
  const UserRepo = AppDataSource.getMongoRepository(User);
  const us = await User.find();
  await User.remove(us);
  const u = await UserRepo.save(user);
  console.log(u);

  res.send(u);
});
