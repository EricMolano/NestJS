import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course) private courseRepository: Repository <Course>,
  ) {}

   async create(payload : CreateCourseDto) {
    const newCourse = this.courseRepository.create(payload)
    return this.courseRepository.save(newCourse) ;
  }

  async findAll() {
    return this.courseRepository.find();;;
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, payload: UpdateCourseDto) {
    const updCourse = await this.courseRepository.findOneBy({ id });
    if (!updCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    this.courseRepository.merge(updCourse, payload);
    return this.courseRepository.save(updCourse);
  }


  async remove(id: number) {
    const resultCourse = await this.courseRepository.delete({ id });
    if (resultCourse.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return { message: 'Curso borrado exitosamente' };
  }
}
