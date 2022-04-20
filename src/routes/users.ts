import express from "express";
import { isAuth } from "../middlewares/isAuth";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const data = await UserRepository.find({ select: { password: false } });

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
