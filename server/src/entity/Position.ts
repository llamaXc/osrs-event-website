import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Player } from "./Player";

@Entity()
export class Position extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    x: number

    @Column()
    y: number

    @Column()
    z: number

    @OneToOne(() => Player, p => p.position)
    player: Player;

}


