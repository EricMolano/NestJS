import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository <User>,
  ) {}


  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, payload: UpdateUserDto) {
    const updUser = await this.userRepository.findOneBy({ id });
    if (!updUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.userRepository.merge(updUser, payload);
    return this.userRepository.save(updUser);
  }

  async remove(id: number) {
    const resultUser = await this.userRepository.delete({ id });
    if (resultUser.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'Usuario borrado exitosamente' };
  }
}
