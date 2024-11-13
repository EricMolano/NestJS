import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Bootcamp } from "src/bootcamps/entities/bootcamp.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    title: string;

    @Column('varchar', { length: 100 })
    comment: string;

    @Column('int')
    rating: number;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @ManyToOne(() => Bootcamp, bootcamp => bootcamp.reviews)
    bootcamp: Bootcamp;
}