import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
