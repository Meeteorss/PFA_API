import { ObjectID } from "bson";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { Coordinates } from "./Coordinates";
import { User } from "./User";

export class SharedCoordinates extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  coordinates: Coordinates;
  @Column()
  users: User[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
