import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });


  it('should not be able to create user with a repeated email', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'joão ninguem 2',
        email: 'joao@ninguem.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });




});
