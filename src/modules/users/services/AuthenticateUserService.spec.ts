import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('CreateUser', () => {
  it('should be able authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'joao@ninguem.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able authenticate with a non existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(
      authenticateUserService.execute({
        email: 'jao@ninguem.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);

  });


  it('should not be able authenticate a non valid password user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'jao@ninguem.com',
        password: 'senha-errada',
      })
    ).rejects.toBeInstanceOf(AppError);

  });



});
