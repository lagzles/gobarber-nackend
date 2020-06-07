import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();


    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

  })

  it('should be able to send email to recover user lost password ', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'jose',
      email: 'joao@ninguem.com',
      password: '123456',
    })

    await sendForgotPasswordEmailService.execute({
      email: 'joao@ninguem.com',
    });

    expect(sendMail).toHaveBeenCalled();

  });

  it('should not be able to recover a password from a non valid email', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'joao@ninguem.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot passowrd token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'jose',
      email: 'joao@ninguem.com',
      password: '123456',
    })

    await sendForgotPasswordEmailService.execute({
      email: 'joao@ninguem.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);

  })


});
