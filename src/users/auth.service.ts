/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    
    constructor (private usersService: UsersService) {}
    
    async addUser(email: string, password: string) {
    
        // See if email is in use
        const users = await this.usersService.findByEmail(email);
        
        if (users. length) {
            throw new BadRequestException('email in use');
        }

        // Generate a salt
        const salt = randomBytes(8).toString('hex');    //hex = salt will be in num, alphabet

        // Hash the salt and the password together
        const hash = (await scrypt (password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it
        const user = await this.usersService.createUser(email, result);

        return user;
    }

    async login(email: string, password: string) {
        
    const [user] = await this.usersService.findByEmail(email);    // because be are promise to return User[] for findByEmail() method.[in users.service.ts]   
        
        if (!user) {
            throw new NotFoundException('user not found');
        }
        
        // const data = user.password.split('.');
        // const salt = data[0]
        // const storedHash = data[1];
    // or
        const [salt, storedHash] = user.password.split('.');        // which came from findByEmail
        
        const hash = (await scrypt(password, salt, 32)) as Buffer;  // which user has specified in body
        
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Incorrect Email, Password');
        }
        
        return user;
    }
    
}