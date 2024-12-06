import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';

@Controller('bootcamps')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class BootcampsController {
  constructor(private readonly bootcampsService: BootcampsService) {}

  @Post()
  create(@Body() payload: CreateBootcampDto) {
    return this.bootcampsService.create(payload);
  }

  @Get()
  findAll() {
    return this.bootcampsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bootcampsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBootcampDto) {
    return this.bootcampsService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bootcampsService.remove(+id);
  }

  @Get(':id/users')
  findUsersByBootcamp(@Param('id') id: string) {
    return this.bootcampsService.findUsersByBootcamp(+id);
  }

  @Get(':id/courses')
  findCoursesByBootcamp(@Param('id') id: string) {
    return this.bootcampsService.findCoursesByBootcamp(+id);
  }
}