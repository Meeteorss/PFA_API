import { Session, SessionData } from "express-session";
import { ObjectID } from "typeorm";
// import { User } from "../entities/User";
import { Request } from "express";
import { Coordinates } from "../entities/Coordinates";
export type LoginInput = {
  login: string;
  password: string;
};
export type RegisterInput = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
};
export type ErrorField = {
  field: string;
  message: string;
};
export type RegisterResponse = {
  user: UserMinusPassword | null;
  errors: ErrorField[];
};
type UserMinusPassword = {
  id: ObjectID;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginResponse = {
  user: UserMinusPassword | null;
  errors: ErrorField[];
};

export type CreateCoordResponse = {
  coordinates: Coordinates | null;
  errors: ErrorField[];
};

export type Req = Request & {
  session: Session & Partial<SessionData> & { userId?: ObjectID };
};
