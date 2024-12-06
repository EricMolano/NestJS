import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bootcamp } from './entities/bootcamp.entity';
import { User } from '../users/entities/user.entity';
import { Course, minimumSkill } from '../courses/entities/course.entity';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(Bootcamp) private bootcampRepository: Repository<Bootcamp>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async create(payload: CreateBootcampDto) {
    const newBootcamp = this.bootcampRepository.create(payload);
    return this.bootcampRepository.save(newBootcamp);
  }

  async findAll() {
    return this.bootcampRepository.find();
  }

  async findOne(id: number) {
    const bootcamp = await this.bootcampRepository.findOne({ where: { id }, relations: ['users', 'courses'] });
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

  async findCoursesByBootcamp(id: number) {
    const courses = await this.courseRepository.createQueryBuilder('course')
      .innerJoin('course.bootcamp', 'bootcamp')
      .where('bootcamp.id = :id', { id })
      .andWhere('course.minimum = :minimumSkill', { minimumSkill: minimumSkill.Advance })
      .getMany();

    if (courses.length === 0) {
      throw new NotFoundException(`No courses found for Bootcamp with ID ${id} and minimum skill Advance`);
    }

    return courses;
  }
}