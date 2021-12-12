import {Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, OneToMany} from "typeorm";
import { BankSlot } from "./BankSlot";
import { EquipmentSlot } from "./EquipmentSlot";
import { Player } from "./Player";

@Entity()
export class Bank extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => BankSlot, slot => slot.bank, {eager: true, cascade: true})
    slots: BankSlot[]

}