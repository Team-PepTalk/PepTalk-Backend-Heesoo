import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    // commit
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    nickname: string;
    
    @Column()
    password: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    @Exclude()
    currentHashedRefreshToken?: string;
}
