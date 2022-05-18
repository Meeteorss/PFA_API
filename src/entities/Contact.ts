import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Contact extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  owner_id: string;

  @Column()
  contact_id: string;

  @Column()
  contact_username: string;

  @Column()
  contact_fullname: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
