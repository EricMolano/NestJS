import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bootcamp } from './entities/bootcamp.entity';

@Injectable()
export class BootcampsService {

  // Inyectar: obtener una instancia del repositorio
  // comp atributo de la clase bootcampsservice

  constructor(
    @InjectRepository(Bootcamp) private bootcampRepository: Repository <Bootcamp>,
  ) {}
  create(createBootcampDto: CreateBootcampDto) {
    return 'This action adds a new bootcamp';
  }

  findAll() {
    return this.bootcampRepository.find();;
  }

  findOne(id: number) {
    return this.bootcampRepository.findOneBy({id});
  }

  update(id: number, updateBootcampDto: UpdateBootcampDto) {
    return `This action updates a #${id} bootcamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} bootcamp`;
  }
}
