import { Injectable } from '@nestjs/common';
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

  create(payload : any) {
    //Crear una instancia con el entity bootcamp y retornar
    const newCourse = this.courseRepository.create(payload)
    //Grabarlo
    return this.courseRepository.save(newCourse) ;
  }

  findAll() {
    return this.courseRepository.find();;;
  }

  findOne(id: number) {
    return this.courseRepository.findOneBy({id});;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return this.courseRepository.delete({id});
  }
}
