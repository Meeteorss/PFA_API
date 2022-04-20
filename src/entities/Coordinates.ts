import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

export class Geoposition {
  @Column()
  lat: number;
  @Column()
  lng: number;
}

export class Photo {
  @Column()
  url: string;
}

export class SocialMedia {
  @Column()
  url: string;
  @Column()
  platform: string;
}

export class Address {
  @Column()
  street: string;
  @Column()
  district: string;
  @Column()
  city: string;
  @Column()
  country: string;
}

export class AdditionalInfos {
  @Column()
  info: string;
  @Column()
  desc: string;
}
@Entity()
export class Coordinates extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  tags: string[];

  @Column({ nullable: false })
  gps!: Geoposition;

  @Column()
  photos?: Photo[];
  //add legend
  @Column()
  socials?: SocialMedia[];

  @Column()
  creator: User;

  @Column()
  address: Address;

  @Column()
  infos: AdditionalInfos[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
