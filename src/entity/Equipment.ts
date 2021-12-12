import {Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, OneToMany} from "typeorm";
import { EquipmentSlot } from "./EquipmentSlot";
import { Player } from "./Player";

@Entity()
export class Equipment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => EquipmentSlot, slot => slot.equipment, {eager: true, cascade: true})
    slots: EquipmentSlot[]

    @OneToOne(() => Player, p => p.equipment)
    player: Player

}