import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    userId: string;
    password: string;
}
