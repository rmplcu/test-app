import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relation, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PasswordDto } from './dto/psw.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    findAll(name? : string) : Promise<User[]> {
        if (name) {
            return this.userRepo.find({
                where: {
                    name
                }
            });
        }
        
        return this.userRepo.find();
    }

    async setPassword(pswDto: PasswordDto): Promise<User> {
        try {
            const user = await this.userRepo.findOneByOrFail({id : pswDto.user});
            user.password = await bcrypt.hash(pswDto.password, await bcrypt.genSalt());

            return this.userRepo.save(user);
        } catch (err) {
            throw new NotFoundException();
        }
    }

    async comparePsw(pswDto : PasswordDto) : Promise<boolean> {
        try {
            const user = await this.userRepo.findOneByOrFail({id : pswDto.user});
            return await bcrypt.compare(pswDto.password, user.password);
        } catch (err) { //user not found
            return false;
        }
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepo.findOneBy({id});
        console.log(user);
        return user;
    }

    async createUser(createUserDto : CreateUserDTO) : Promise<any> {
        let id : number;
        const lastUser = await this.userRepo.createQueryBuilder('lastuser').select('MAX(user.id)').from(User, 'user').execute()
        .then(res => id = res.id)
        .catch(_ => id = 0);
        
        const newUser = this.userRepo.create({id:0, ...createUserDto});

        return this.userRepo.save(newUser);
    }

    async updateUser(id:number, newName:string, newAge?:number) : Promise<User> {
        const user = await this.findOneById(id);
        user.name = newName
        if (newAge) user.age = newAge;

        return this.userRepo.save(user);
    }
}
