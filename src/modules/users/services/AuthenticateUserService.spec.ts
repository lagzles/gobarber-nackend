import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;


describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able authenticate a user', async () => {
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

    await expect(
      authenticateUserService.execute({
        email: 'jao@ninguem.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);

  });


  it('should not be able authenticate a non valid password user', async () => {

    const user = await createUserService.execute({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'jao@ninguem.com',
        password: 'senha-errada',
      })
    ).rejects.toBeInstanceOf(AppError);

  });



});
