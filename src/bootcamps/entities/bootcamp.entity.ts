// src/bootcamps/entities/bootcamp.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Course } from "src/courses/entities/course.entity";
import { Review } from "src/reviews/entities/review.entity";

@Entity('bootcamps')
export class Bootcamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20 })
    phone: string;

    @Column('varchar', { length: 20 })
    name: string;

    @Column('varchar', { length: "100", default: "XXXX" })
    address: string;

    @Column('text')
    topics: string;

    @Column('double', { default: 0 })
    averageRating: number;

    @Column('date')
    createdAt: Date;

    @ManyToMany(() => User, user => user.bootcamps)
    @JoinTable()
    users: User[];

    @OneToMany(() => Course, course => course.bootcamp)
    courses: Course[];

    @OneToMany(() => Review, review => review.bootcamp)
    reviews: Review[];
}