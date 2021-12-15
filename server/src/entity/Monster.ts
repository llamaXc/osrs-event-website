import {Entity, Column, BaseEntity, PrimaryColumn, ManyToMany, JoinTable, ManyToOne} from "typeorm";

@Entity()
export class Monster extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    combat_level: number

    @Column({nullable: true})
    max_hit!: number

    @Column({nullable: true})
    hitpoints!: number
}
