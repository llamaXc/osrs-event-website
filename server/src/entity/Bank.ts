import {Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, OneToMany, RelationId, Index} from "typeorm";
import { BankSlot } from "./BankSlot";

@Entity()
export class Bank extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => BankSlot, slot => slot.bank, {eager: true, cascade: true})
    slots: BankSlot[]

}