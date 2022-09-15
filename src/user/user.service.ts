import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel : Model<User>) {}

    async createUser(createUserdto: CreateUserDto) : Promise<UserDocument> {
        createUserdto.password = await bcrypt.hash(createUserdto.password, 10);
        const newUser = new this.userModel(createUserdto);
        return newUser.save();
    }

    findOneByName(name: string): Promise<User> {
        return this.userModel.findOne({name}).exec();
    }

    async findAll() : Promise<User[]> {
        return this.userModel.find().exec();
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true}).exec();
    }
}
