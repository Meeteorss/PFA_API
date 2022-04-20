import "reflect-metadata";
import { Coordinates } from "../entities/Coordinates";

import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { SharedCoordinates } from "../entities/SharedCoordinates";

export const AppDataSource = new DataSource({
  url: "mongodb://localhost:27017",
  type: "mongodb",
  database: "PFA",
  synchronize: true,
  logging: true,
  entities: [User, Coordinates, SharedCoordinates],
  migrations: [],
  subscribers: [],
});
