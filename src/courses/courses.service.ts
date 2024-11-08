import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Bootcamp } from '../bootcamps/entities/bootcamp.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Bootcamp) private bootcampRepository: Repository<Bootcamp>,
  ) {}

  async create(payload: CreateCourseDto) {
    const bootcamp = await this.bootcampRepository.findOneBy({ id: payload.bootcampId });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp with ID ${payload.bootcampId} not found`);
    }
    const newCourse = this.courseRepository.create({ ...payload, bootcamp });
    return this.courseRepository.save(newCourse);
  }

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, payload: UpdateCourseDto) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    this.courseRepository.merge(course, payload);
    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const result = await this.courseRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return { message: 'Course deleted successfully' };
  }
}