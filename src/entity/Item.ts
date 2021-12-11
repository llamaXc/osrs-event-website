import {Entity, Column, BaseEntity, PrimaryColumn} from "typeorm";

@Entity()
export class Item extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

}