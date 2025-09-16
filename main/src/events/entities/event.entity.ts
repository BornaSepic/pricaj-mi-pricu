import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: 10
  })
  limit: number;

  @CreateDateColumn()
  public date: Date;

  @ManyToMany(() => User, (user) => user.events, { cascade: true })
  @JoinTable()
  users: User[];
}
