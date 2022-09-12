import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    name: string;

    @Column()
    age: number;

    @Column({nullable: true})
    password?: string;
}