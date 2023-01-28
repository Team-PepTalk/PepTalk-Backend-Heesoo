import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmExModule } from 'src/configs/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository(
      [UsersRepository]
    )
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
