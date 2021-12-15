import { Exclude, instanceToPlain } from "class-transformer";
import {Entity, Column, BaseEntity, PrimaryColumn, OneToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import { InventorySlot } from "./InventorySlot";
import { Player } from "./Player";

@Entity()
export class Inventory extends BaseEntity{

    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;

    @OneToMany(() => InventorySlot, slot => slot.inventory, {eager: true, cascade: true})
    slots: InventorySlot[]

    @OneToOne(() => Player, p => p.inventory)
    player: Player
}