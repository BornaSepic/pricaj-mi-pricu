import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';


@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.readings)
  user?: User;

  @ManyToOne(() => Department, department => department.readings)
  department: Department;

  @Column({
    default: false
  })
  blocked: boolean;

  @CreateDateColumn()
  public date: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
