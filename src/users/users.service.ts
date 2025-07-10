import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) { }


    async createUser(name: string, email: string, password: string) {
        return this.userModel.create({ name, email, password });
    }

    async findById(userId: string) {
        const user = this.userModel.findOne({ _id: userId });

        if (!user) {
            throw new NotFoundException(`User with userId ${userId} not found`);
        }

        return user;
    }

    async findAll() {
        const users = this.userModel.find({});
        return users;
    }
}
