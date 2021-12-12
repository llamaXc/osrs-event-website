import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Player } from "./Player";

@Entity()
export class Quest extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questId: number

    @Column()
    name: string;

    @Column()
    state: string;

    @ManyToOne(() => Player, player => player.quests)
    @JoinColumn()
    player: Player

}