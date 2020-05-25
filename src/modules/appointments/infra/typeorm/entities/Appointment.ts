// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // many appointments para 1 provider
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Ao usar uma entidade do TYPEORM, ela ja cria um constructor, por Padrão
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.provider = provider;
  //   this.date = date;
  //   this.id = uuid();
  // }
}

export default Appointment;
