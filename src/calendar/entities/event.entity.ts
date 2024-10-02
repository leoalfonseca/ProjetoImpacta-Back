import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  allDay: boolean;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ default: 'default' })
  color: string;
}
