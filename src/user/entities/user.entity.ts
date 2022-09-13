import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, OneToMany, PrimaryColumn, JoinColumn } from "typeorm"
import { Todos } from "../../todos/entities/todo.entity";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryColumn()
    id : number;
    
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    age: number;

    @ApiProperty()
    @Column({nullable: true})
    password?: string;

    @ApiProperty()
    @OneToMany(() => Todos, todos => todos.user, {eager: true})
    todos : Todos[]
}