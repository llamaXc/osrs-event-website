
import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinTable} from "typeorm";
import { Item } from "./Item";
import { NpcKill } from "./NpcKill";
import { classToPlain, Exclude, instanceToPlain } from "class-transformer";

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
    @Exclude()
    kill: NpcKill

    toJSON() {
        return instanceToPlain(this);
    }
}
