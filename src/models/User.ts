// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

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

export default User;
