import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Timestamp,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
class Blog extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "integer",
    comment: "The id of the comment",
  })
  id!: number;

  @Column({
    type: "varchar",
    comment: "Title of the Blog",
  })
  title!: string;

  @Column({
    type: "text",
    comment: "Description of the Blog",
  })
  description!: string;

  @CreateDateColumn({
    type: "timestamp",
    comment: "Creation data",
    default: Timestamp,
  })
  created_on!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    comment: "Time of Update",
    default: Timestamp,
  })
  updated_on!: Date;
}

export default Blog;