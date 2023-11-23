/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.findAllUser()
    }

    @Post('/add')
    async addUser(@Body() user:CreateUserDto, @Session() session:any) {
        const userData = await this.authService.addUser(user.email, user.password)
        
        session.userId = userData._id;   
        return user;
    }

    @Post('/login')
    async login(@Body() user: LoginUserDto, @Session() session:any) {
        const userData = await this.authService.login(user.email, user.password);

        session.userId = userData._id;
        return user;
    }

    @Get('/me')
    me(@Session() session:any){
        return this.usersService.findOneUserById(session.userId);
    }

    @Post('/logout')
    logout(@Session() session:any){
        session.userId = null;
        return 'User Logout'
    }

    @UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:_id')
    getUserById(@Param('_id') _id: string ): Promise<User> { 
        
        // console.log('handler is running')
        return this.usersService.findOneUserById(_id)
    }

    @Patch('/update/:_id')
    getUserByIdAndUpdate(@Param('_id') _id: string, @Body() body: UpdateUserDto): Promise<User> {
        return this.usersService.findOneUserByIdAndUpdate(_id,body)
    }

    @Delete('/delete/:_id')
    getUserByIdAndDelete(@Param('_id') _id: string): Promise<User> {
        return this.usersService.findOneUserByIdAndDelete(_id)
    } 
}
