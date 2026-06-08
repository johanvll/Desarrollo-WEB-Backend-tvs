import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuario!: string;

  @Column()
  ip!: string;

  @Column()
  evento!: string;

  @Column()
  browser!: string;

  @Column()
  fecha!: string;
}