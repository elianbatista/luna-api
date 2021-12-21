import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Player } from './player'

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Player, player => player.matchs)
  player: Player

  @Column({ type: 'integer' })
  level: number

  @Column({ type: 'integer' })
  errors: number

  @Column({ type: 'integer' })
  time: number

  @Column({ type: 'integer' })
  stars: number

  @Column({ type: 'integer', default: 0 })
  coins: number

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}