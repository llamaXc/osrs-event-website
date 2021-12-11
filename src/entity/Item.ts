import {Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, UsingJoinTableIsNotAllowedError} from "typeorm";
import { NpcKill } from "./NpcKill";

@Entity()
export class Item extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

}

@Entity()
export class ItemDrop extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, {eager: true})
    @JoinTable()
    item: Item;

    @Column()
    quantity: number;

    @ManyToOne(type => NpcKill, kill => kill.items)
    kill: NpcKill
}





