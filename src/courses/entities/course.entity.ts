import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number 

    @Column('varchar', {length: "100"} )
    title: string

    @Column('varchar', {length: "100"} )
    description: string

    @Column('varchar', { length: 20 })
    weeks: number

    @Column('varchar', { length: 20 })
    tuition: number

    @Column('varchar', { length: 30 })
    minimum: minimumSkill

        @Column('date')
    createdAt: Date


}

enum minimumSkill {
    'Beginner',
    'Intermediate',
    'Advance'
}
