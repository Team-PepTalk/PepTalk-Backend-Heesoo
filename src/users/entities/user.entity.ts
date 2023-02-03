import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, MaxLength, MinLength, Matches } from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: string;
    
    @Column()
    password: string;

    @Column()
    email: string;
}
