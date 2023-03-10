import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    // commit
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: string;
    
    @Column()
    password: string;

    @Column()
    email: string;
}
