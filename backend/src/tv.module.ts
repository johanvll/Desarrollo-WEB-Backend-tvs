import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tv } from './tv.entity';
import { TvService } from './tv.service';
import { TvController } from './tv.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tv])],
  controllers: [TvController],
  providers: [TvService],
})
export class TvModule {}