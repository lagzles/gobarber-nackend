
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let showProfileService: ShowProfileService;
let fakeHashProvider: FakeHashProvider;


describe('Show User Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    showProfileService = new ShowProfileService(
      fakeUsersRepository,
    );

  });

  it('should be able to show users profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'jose',
      email: 'j@j.com',
      password: '123456'
    })


    const showdUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showdUser?.name).toBe('jose');
    expect(showdUser?.email).toBe('j@j.com');

  });

  it('should not be able to show users profile from a non-existing-id', async () => {

    await expect(
      showProfileService.execute({
        user_id: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(AppError);

  });

});
