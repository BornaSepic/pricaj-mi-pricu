import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Reading } from '../../readings/entities/reading.entity';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  role: 'admin' | 'user';

  @Column()
  seniority: 'junior' | 'senior';

  @Column()
  status: 'active' | 'inactive';

  @OneToMany(() => Reading, reading => reading.user)
  readings: Reading[];

  @ManyToMany(() => Event, event => event.users)
  events: Event[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}

export type NullableUser = User | null;


