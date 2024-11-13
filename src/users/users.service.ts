// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Bootcamp } from '../bootcamps/entities/bootcamp.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Bootcamp) private bootcampRepository: Repository<Bootcamp>,
  ) {}

  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);

    if (payload.bootcampId) {
      const bootcamp = await this.bootcampRepository.findOne({ where: { id: payload.bootcampId } });
      if (!bootcamp) {
        throw new NotFoundException(`Bootcamp with ID ${payload.bootcampId} not found`);
      }
      newUser.bootcamps = [bootcamp];
    }

    return this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find({ relations: ['bootcamps'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['bootcamps'] });
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

  async addUserToBootcamp(userId: number, bootcampId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['bootcamps'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const bootcamp = await this.bootcampRepository.findOne({ where: { id: bootcampId } });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp with ID ${bootcampId} not found`);
    }

    user.bootcamps.push(bootcamp);
    return this.userRepository.save(user);
  }
}