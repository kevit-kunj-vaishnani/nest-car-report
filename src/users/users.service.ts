/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User')     //  This decorator is used to inject a MongoDB/Mongoose model into the UsersService class
        private userModel: mongoose.Model<User>
    ){}

    async findAllUser(): Promise<User[]> {
        const user = await this.userModel.find();
        return user;
    }

    async createUser(user): Promise<User> {
        const result = this.userModel.create(user);
        return result
    }

    async findOneUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException('User not found in  findOneUserById  in user.service.ts');
        }

        return user;
    }

    async findOneUserByIdAndUpdate(id: string, attrs: Partial<User>){

        const user = await this.userModel.findById(id);

        if (!user) {
        throw new NotFoundException('user not found in updateUserById in user.service.ts');
        }

        Object.assign(user, attrs);
        return user.save();

    }

    async findOneUserByIdAndDelete(id: string){

        const user = await this.userModel.findById(id);

        if (!user) {
        throw new NotFoundException('user not found in updateUserById in user.service.ts');
        }

        return this.userModel.findByIdAndDelete(id);

    }
}
