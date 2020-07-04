import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

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
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar ? `${process.env.APP_API_URL}/files/${this.avatar}` : null
  }

  // Ao usar uma entidade do TYPEORM, ela ja cria um constructor, por Padrão
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.provider = provider;
  //   this.date = date;
  //   this.id = uuid();
  // }
}

export default User;
