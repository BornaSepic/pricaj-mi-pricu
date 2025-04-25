import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  title: string;
  description: string;

  @CreateDateColumn()
  public date: Date;

  @ManyToMany(() => User, (user) => user.events, { cascade: true })
  @JoinTable()
  users: User[];
}
