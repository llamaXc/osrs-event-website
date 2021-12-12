import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Player } from "./Player";

@Entity()
export class Quest extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    state: string;

    @ManyToOne(() => Player, player => player.quests)
    player: Player

}