import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Tv } from './tv.entity';
import { AccessLog } from './access-log.entity';
import { AuthModule } from './auth.module';
import { TvModule } from './tv.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'greenhome',
      entities: [User, Tv, AccessLog],
      synchronize: true,
    }),
    AuthModule,
    TvModule,
  ],
})
export class AppModule {}