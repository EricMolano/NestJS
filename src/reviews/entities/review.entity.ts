import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number 

    @Column('varchar', {length: "100"} )
    title: string

    @Column('varchar', {length: "100"} )
    comment: string
    
    @Column('varchar', { length: 20 })
    rating: number

}
