import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinTable, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Equipment } from "./Equipment";
import { Item } from "./Item";

@Entity()
export class EquipmentSlot extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, {eager: true})
    @JoinTable()
    item: Item

    @Column()
    slotName: string

    @Column()
    quantity: number

    @ManyToOne(() => Equipment, e => e.slots)
    equipment: Equipment
}