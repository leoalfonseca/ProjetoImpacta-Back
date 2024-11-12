import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int')
  stock: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
