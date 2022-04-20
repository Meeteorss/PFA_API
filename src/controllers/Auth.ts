import UserRepository from "../repositories/UserRepository";
import argon2 from "argon2";
import { Request, Response } from "express";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  Req,
} from "../types/types";
import { validateRegisterInput } from "../utils/validation/validateInput";

export const registerUser = async (
  req: Req,
  res: Response,
  input: RegisterInput
) => {
  let response: RegisterResponse = {
    user: null,
    errors: await validateRegisterInput(input),
  };

  if (response.errors?.length) {
    res.send(response);
  } else {
    const hashedPassword = await argon2.hash(input.password);
    const user = await UserRepository.save({
      ...input,
      password: hashedPassword,
    });
    if (!user) {
      res.send("An error has occured");
    } else {
      req.session!.userId = user.id;

      response.user = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.send(response);
    }
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.clearCookie("sessionID");
    if (err) {
      console.log(err);

      res.send({ value: false, message: "Error:" + err });
    } else {
      res.send({ value: true, message: "Logged out" });
    }
  });
};

export const login = async (req: Req, res: Response, input: LoginInput) => {
  let response: LoginResponse = {
    user: null,
    errors: [],
  };
  // console.log("inpuit : ", input);

  const user = await UserRepository.findOneBy({
    where: {
      $or: [
        { username: { $regex: input.login, $options: "-i" } },
        { email: { $regex: input.login, $options: "-i" } },
      ],
    },
  });
  if (!user) {
    response.errors = [
      ...response.errors,
      { field: "password", message: "Incorrect Credentials" },
    ];
    res.send(response);
  } else {
    const isValid = await argon2.verify(user.password, input.password);
    if (!isValid) {
      response.errors = [
        ...response.errors,
        { field: "password", message: "Incorrect Credentials" },
      ];
      res.send(response);
    } else {
      response.user = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      req.session.userId = user.id;
      res.send(response);
    }
  }
};
