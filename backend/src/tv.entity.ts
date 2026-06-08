import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tv {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  marca!: string;

  @Column()
  modelo!: string;

  @Column()
  pulgadas!: number;

  @Column()
  precio!: number;

  @Column({ nullable: true })
  imagen_url!: string;

  @Column({ nullable: true })
  deletedAt!: Date;
}