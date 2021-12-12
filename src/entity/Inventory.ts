import {Entity, Column, BaseEntity, PrimaryColumn, OneToOne, OneToMany} from "typeorm";
import { InventorySlot } from "./InventorySlot";
import { Player } from "./Player";

@Entity()
export class Inventory extends BaseEntity{

    @PrimaryColumn()
    id: number;

    // Some data about the sltos
    @OneToMany(() => InventorySlot, slot => slot.inventory, {eager: true, cascade: true})
    slots: InventorySlot[]

    // @OneToOne(() => Player, p => p.position)
    // player: Player;

}