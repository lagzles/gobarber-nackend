
import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('Update Avatar', () => {
  it('should be able update user avagtar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    const avatar = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });


  it('should not be able update non-existing user avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    expect(
      updateUserAvatarService.execute({
        user_id: 'nao-existente',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });



  it('should be able to delete previous user avatar when the user select a new avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'novo-avatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('novo-avatar.jpg');
  });


});
