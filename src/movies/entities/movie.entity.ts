import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Movies {
    @PrimaryColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    length: number

    @Column({nullable: true})
    genre: string

    @Column({nullable: true})
    rating: number

}