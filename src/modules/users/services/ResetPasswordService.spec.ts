// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;


describe('Reset Password ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokensRepository,
    );

  })

  it('should be able to reset password ', async () => {

    const user = await fakeUsersRepository.create({
      name: 'jose',
      email: 'j@j.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      token,
      password: '123123',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');

  });

  it('should not be able to reset password with non wxistent token', async () => {

    await expect(
      resetPasswordService.execute({
        token: 'token-nao-existente',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset password with non existent user', async () => {

    const { token } = await fakeUserTokensRepository.generate('non-existing-user-id');

    await expect(
      resetPasswordService.execute({
        token,
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with a 2h old token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jose',
      email: 'j@j.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);

  });
});
