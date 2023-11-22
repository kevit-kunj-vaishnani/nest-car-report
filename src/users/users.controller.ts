/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAllUser()
    }

    @Post('/add')
    async addUser(@Body() user:CreateUserDto): Promise<User> {
        return this.usersService.createUser(user)
    }
    
    @Get('/:_id')
    async getUserById(@Param('_id') _id: string ): Promise<User> {     
        return this.usersService.findOneUserById(_id)
    }

    @Patch('/update/:_id')
    async getUserByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateUserDto): Promise<User> {
        return this.usersService.findOneUserByIdAndUpdate(_id,body)
    }

    @Delete('/delete/:_id')
    async getUserByIdAndDelete(@Param('_id') _id: string): Promise<User> {
        return this.usersService.findOneUserByIdAndDelete(_id)
    } 
}
