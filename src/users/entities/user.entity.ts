// src/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Bootcamp } from './../../bootcamps/entities/bootcamp.entity';
import { Review } from './../../reviews/entities/review.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20 })
    name: string;

    @Column('varchar', { length: 100 })
    email: string;

    @Column('varchar', { length: 50 })
    role: string;

    @Column('varchar', { length: 255 })
    password: string;

    @ManyToMany(() => Bootcamp, bootcamp => bootcamp.users)
    @JoinTable()
    bootcamps: Bootcamp[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}