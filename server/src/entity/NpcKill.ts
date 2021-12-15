import { Exclude } from "class-transformer";
import {Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { ItemDrop } from "./ItemDrop";
import { Monster } from "./Monster";
import { Player } from "./Player";

@Entity()
export class NpcKill extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    killValue: number

    @OneToMany(() => ItemDrop, item => item.kill, {eager: true, cascade: true})
    items: ItemDrop[]

    @ManyToOne(() => Monster, monster => monster.id, {eager: true, cascade: true})
    @JoinColumn()
    monster: Monster;

    @ManyToOne(() => Player, player => player.kills)
    @JoinColumn()
    player: Player
}