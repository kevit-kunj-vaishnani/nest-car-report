/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';


@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
