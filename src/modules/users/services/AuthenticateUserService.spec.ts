import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('CreateUser', () => {
  it('should be able authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'joão ninguem',
      email: 'joao@ninguem.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'joao@ninguem.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });


});
