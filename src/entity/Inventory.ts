import { Exclude, instanceToPlain } from "class-transformer";
import {Entity, Column, BaseEntity, PrimaryColumn, OneToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import { InventorySlot } from "./InventorySlot";

@Entity()
export class Inventory extends BaseEntity{

    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;

    @OneToMany(() => InventorySlot, slot => slot.inventory, {eager: true, cascade: true})
    slots: InventorySlot[]
}