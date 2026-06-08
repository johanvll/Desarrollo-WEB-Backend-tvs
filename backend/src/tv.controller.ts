import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TvService } from './tv.service';

@Controller('tvs')
export class TvController {
  constructor(private tvService: TvService) {}

  @Post()
  create(@Body() body: any) {
    return this.tvService.create(body);
  }

  @Get()
  findAll() {
    return this.tvService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.tvService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tvService.deleteLogic(id);
  }
}