import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Report } from '../../reports/entities/report.entity';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false
  })
  blocked: boolean;

  @ManyToOne(() => User, user => user.readings)
  user?: User;

  @ManyToOne(() => Department, department => department.readings)
  department: Department;

  @OneToOne(() => Report, {
    nullable: true
  })
  @JoinColumn()
  report: Report;

  @CreateDateColumn()
  public date: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
