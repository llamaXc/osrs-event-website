import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinTable, PrimaryGeneratedColumn} from "typeorm";
import { Inventory } from "./Inventory";
import { Item } from "./Item";

@Entity()
export class InventorySlot extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, {eager: true})
    @JoinTable()
    item: Item

    @Column()
    slotIndex: number

    @Column()
    quantity: number

    @ManyToOne(type => Inventory, i => i.slots)
    inventory!: Inventory
}