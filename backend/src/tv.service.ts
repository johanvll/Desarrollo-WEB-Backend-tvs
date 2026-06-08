import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Tv } from './tv.entity';

@Injectable()
export class TvService {
  constructor(@InjectRepository(Tv) private tvRepo: Repository<Tv>) {}

  create(data: Partial<Tv>) {
    const tv = this.tvRepo.create(data);
    return this.tvRepo.save(tv);
  }

  findAll() {
    return this.tvRepo.find({ where: { deletedAt: IsNull() } });
  }

  update(id: number, data: Partial<Tv>) {
    return this.tvRepo.update(id, data);
  }

  async deleteLogic(id: number) {
    await this.tvRepo.update(id, { deletedAt: new Date() });
    return { message: 'TV eliminado lógicamente' };
  }
}