import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinTable} from "typeorm";
import { Inventory } from "./Inventory";
import { ItemDrop } from "./ItemDrop";

@Entity()
export class InventorySlot extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @ManyToOne(() => ItemDrop, {eager: true})
    @JoinTable()
    item: ItemDrop

    @Column()
    slotIndex: number

    @ManyToOne(type => Inventory, i => i.slots)
    inventory: Inventory
}