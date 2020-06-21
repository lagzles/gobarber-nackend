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
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { };

  public async execute({ user_id, name, email, old_password, password }: Request): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    };

    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (userWithEmail?.id !== user.id && userWithEmail) {
      throw new AppError('Email already in use');
    };

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('You need to inform the old password')
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Should inform the correct Old Password')
      }
    }

    if (password) {
      // user.password = password;
      user.password = await this.hashProvider.generateHash(password)
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
