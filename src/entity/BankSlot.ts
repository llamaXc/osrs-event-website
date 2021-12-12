import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinTable, PrimaryGeneratedColumn, OneToOne, Index} from "typeorm";
import { Bank } from "./Bank";
import { Item } from "./Item";

@Entity()
export class BankSlot extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, {lazy: true})
    @JoinTable()
    item: Item

    @Column()
    slotIndex: number

    @Column()
    quantity: number

    @ManyToOne(() => Bank, e => e.slots)
    bank: Bank
}