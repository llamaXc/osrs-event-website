import {Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Player } from "./Player";

@Entity()
export class Level extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @ManyToOne(() => Player, player => player.levels)
    @JoinColumn()
    player: Player

}