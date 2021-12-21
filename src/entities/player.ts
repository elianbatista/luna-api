import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Match } from './match';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => Match, match => match.player)
  matchs: Match[]

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'integer' })
  age: number

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}