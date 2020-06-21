
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;


describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
    );

  });

  it('should be able to show all providers', async () => {

    const user1 = await fakeUsersRepository.create({
      name: 'jose',
      email: 'j1@j1.com',
      password: '123456'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'josue',
      email: 'j2@j2.com',
      password: '123456'
    })

    const loggeduser = await fakeUsersRepository.create({
      name: 'joseph',
      email: 'logged@logged.com',
      password: '123456'
    })


    const providers = await listProvidersService.execute({
      user_id: loggeduser.id,
    });

    expect(providers).toEqual([
      user1, user2
    ]);

  });

});
