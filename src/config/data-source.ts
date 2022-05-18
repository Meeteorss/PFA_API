import "reflect-metadata";
import { Coordinates } from "../entities/Coordinates";

import { DataSource } from "typeorm";
import { User } from "../entities/User";

import { Contact } from "../entities/Contact";
import { Sharing } from "../entities/Sharing";
import { SharedCoordinates } from "../entities/SharedCoordinates";

export const AppDataSource = new DataSource({
  url: process.env.DB_URL,
  type: "mongodb",
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Coordinates, Sharing, SharedCoordinates, Contact],
  migrations: [],
  subscribers: [],
});
