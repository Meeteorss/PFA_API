import { ObjectID } from "bson";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
// import { Coordinates } from "./Coordinates";
// import { User } from "./User";
@Entity()
export class Sharing extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  coordsId: string;
  @Column()
  userId: string;
  @Column()
  sharedWith: string[] | "*";
  @Column()
  url: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
