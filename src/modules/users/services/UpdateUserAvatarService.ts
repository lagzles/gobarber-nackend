import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFilename: string;
};

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { };

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Apenas usuarios autenticados podem atualizar seu avatar',
      );
    }
    if (user.avatar) {
      // Deletar avatar anterior
      await this.storageProvider.deleteFile(user.avatar);
    }
    // pega da pasta tmp e salva em uploads - no caso de storage local
    const newAvatarFilename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = newAvatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
