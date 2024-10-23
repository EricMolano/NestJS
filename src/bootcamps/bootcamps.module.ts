import { Module } from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { BootcampsController } from './bootcamps.controller';

@Module({
  controllers: [BootcampsController],
  providers: [BootcampsService],
})
export class BootcampsModule {}
