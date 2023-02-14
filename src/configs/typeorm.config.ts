import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '0000',
    database: 'Peptalk',
    entities: [__dirname + '/../**/*.entity.{js,ts}', User],
    synchronize: false,
}