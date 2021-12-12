import {Entity, Column, BaseEntity, PrimaryGeneratedColumn,  JoinColumn, OneToMany, OneToOne, } from "typeorm";
import { Equipment } from "./Equipment";
import { Inventory } from "./Inventory";
import { Level } from "./Level";
import { NpcKill } from "./NpcKill";
import { Position } from "./Position";

@Entity()
export class Player extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    token: string

    @Column()
    combatLevel: number

    @OneToOne(() => Position, p => p.player, {cascade: true, eager: true})
    @JoinColumn()
    position!: Position;

    @OneToOne(() => Inventory, {eager: true, cascade: true})
    @JoinColumn()
    inventory: Inventory

    @OneToOne(() => Equipment, {eager: true, cascade: true})
    @JoinColumn()
    equipment: Equipment

    @OneToMany(() => NpcKill, k => k.player, {eager: true, cascade: true})
    kills: NpcKill[]

    @OneToMany(() => Level, l => l.player, {eager: true, cascade: true})
    levels: Level[]

    @Column({default: 0})
    questPoints: number
}


