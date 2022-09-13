import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Todos {
    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    date: Date;

    @ApiProperty()
    @Column()
    done: boolean;

    @ApiProperty()
    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user: User
}
