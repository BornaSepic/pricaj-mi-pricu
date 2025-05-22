import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class RegistrationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  isValid: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}

