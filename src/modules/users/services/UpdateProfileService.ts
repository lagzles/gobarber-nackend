import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
};

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { };

  public async execute({ user_id, name, email }: Request): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    };

    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (!userWithEmail) {
      throw new AppError('Email already in use');
    };

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfile;
