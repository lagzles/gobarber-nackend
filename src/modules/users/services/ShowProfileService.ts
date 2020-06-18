import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
};

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { };

  public async execute({ user_id }: Request): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    };

    delete user.password;

    return user;
  }
}

export default ShowProfileService;
