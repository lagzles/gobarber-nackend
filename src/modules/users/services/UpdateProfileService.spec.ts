
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let updateProfileService: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;


describe('Update User Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

  });

  it('should be able to update users profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'jose',
      email: 'j@j.com',
      password: '123456'
    })

    // const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'doisze',
      email: 'doisze@dois.com',
    });

    expect(updatedUser?.name).toBe('doisze');
    expect(updatedUser?.email).toBe('doisze@dois.com');

  });

  it('should not be able to update user email to a existing one', async () => {

    const user = await fakeUsersRepository.create({
      name: 'jose',
      email: 'j@j.com',
      password: '123456'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'jose2',
      email: 'j2@j.com',
      password: '1223456'
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'doisze',
        email: 'j2@j.com',
      })
    ).rejects.toBeInstanceOf(AppError);

  });

});
