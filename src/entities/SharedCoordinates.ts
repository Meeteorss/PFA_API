import {
  Entity,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Coordinates } from "./Coordinates";

@Entity()
export class SharedCoordinates extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  coordinates: Coordinates;

  @Column()
  userId: string;
  @Column()
  user: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
