import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Bootcamp } from "src/bootcamps/entities/bootcamp.entity";

export enum minimumSkill {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advance = 'Advance',
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('varchar', { length: 100 })
  description: string;

  @Column('varchar', { length: 20 })
  weeks: number;

  @Column('decimal', { nullable: true })
  tuition: number;

  @Column('varchar', { length: 30 })
  minimum: minimumSkill;

  @Column('date')
  createdAt: Date;

  @ManyToOne(() => Bootcamp, bootcamp => bootcamp.courses)
  bootcamp: Bootcamp;
}