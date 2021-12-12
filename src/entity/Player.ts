import {Entity, Column, BaseEntity, PrimaryGeneratedColumn,  JoinColumn, OneToMany, OneToOne, } from "typeorm";
import { Inventory } from "./Inventory";
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

    // @OneToOne(() => Inventory, i => i.player, {cascade: true, eager: true})
    // inventory: Inventory;
}


