import {Entity, Column, BaseEntity, PrimaryGeneratedColumn,  JoinColumn, OneToMany, } from "typeorm";
import { NpcKill } from "./NpcKill";

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
}


