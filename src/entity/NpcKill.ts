import {Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Item, ItemDrop } from "./Item";
import { Monster } from "./Monster";
import { Player } from "./Player";

@Entity()
export class NpcKill extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    // @OneToMany(type => Monster, monster => monster.id)
    // @JoinColumn()
    // npc: Monster;

    @Column()
    killValue: number

    @OneToMany(() => ItemDrop, item => item.kill, {eager: true})
    @JoinTable()
    items: ItemDrop[]

    @ManyToOne(type => Player, player => player.id, {eager: true})
    @JoinColumn()
    player: Player
}