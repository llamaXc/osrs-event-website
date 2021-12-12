import {Entity, Column, BaseEntity, PrimaryGeneratedColumn,  JoinColumn, OneToMany, OneToOne, } from "typeorm";
import { Bank } from "./Bank";
import { Equipment } from "./Equipment";
import { Inventory } from "./Inventory";
import { Level } from "./Level";
import { NpcKill } from "./NpcKill";
import { Position } from "./Position";
import { Quest } from "./Quest";

@Entity()
export class Player extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    username: string

    @Column({ unique: true })
    token: string

    @Column()
    combatLevel: number

    @OneToOne(() => Position, p => p.player, {cascade: true})
    @JoinColumn()
    position!: Position;

    @OneToOne(() => Inventory, {cascade: true})
    @JoinColumn()
    inventory: Inventory

    @OneToOne(() => Equipment, {cascade: true})
    @JoinColumn()
    equipment: Equipment

    @OneToOne(() => Bank, {cascade: true})
    @JoinColumn()
    bank: Bank

    @OneToMany(() => NpcKill, k => k.player, {cascade: true})
    kills: NpcKill[]

    @OneToMany(() => Level, l => l.player, {cascade: true})
    levels: Level[]

    @OneToMany(() => Quest, q => q.player, {cascade: true})
    quests: Quest[]

    @Column({default: 0})
    questPoints: number

    @Column({default: 0})
    totalLevel: number


}


