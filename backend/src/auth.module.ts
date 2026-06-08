import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AccessLog } from './access-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AccessLog]),
    JwtModule.register({ secret: 'greenhome_secret', signOptions: { expiresIn: '8h' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}