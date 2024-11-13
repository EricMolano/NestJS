// src/bootcamps/bootcamps.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bootcamp } from './entities/bootcamp.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(Bootcamp) private bootcampRepository: Repository<Bootcamp>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(payload: CreateBootcampDto) {
    const newBootcamp = this.bootcampRepository.create(payload);
    return this.bootcampRepository.save(newBootcamp);
  }

  async findAll() {
    return this.bootcampRepository.find();
  }

  async findOne(id: number) {
    const bootcamp = await this.bootcampRepository.findOne({ where: { id }, relations: ['users'] });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp with ID ${id} not found`);
    }
    return bootcamp;
  }

  async update(id: number, payload: UpdateBootcampDto) {
    const updBootcamp = await this.bootcampRepository.findOneBy({ id });
    if (!updBootcamp) {
      throw new NotFoundException(`Bootcamp with ID ${id} not found`);
    }
    this.bootcampRepository.merge(updBootcamp, payload);
    return this.bootcampRepository.save(updBootcamp);
  }

  async remove(id: number) {
    const result = await this.bootcampRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Bootcamp with ID ${id} not found`);
    }
    return { message: 'Bootcamp borrado exitosamente' };
  }

  async findUsersByBootcamp(id: number) {
    const bootcamp = await this.bootcampRepository.findOne({ where: { id }, relations: ['users'] });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp with ID ${id} not found`);
    }
    return bootcamp.users;
  }
}