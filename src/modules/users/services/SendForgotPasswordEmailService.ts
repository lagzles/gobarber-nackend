// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import { injectable, inject } from 'tsyringe';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository

  ) { }

  public async execute(data: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError('Email não valido');
    }

    const { token } = await this.userTokensRepository.generate(user.id);



    await this.mailProvider.sendMail(
      {
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[GoBarber] recuperaccion de secreto.',
        templateData: {
          template: 'Oila, {{name}}: {{token}}',
          variables: {
            name: user.name,
            token,
          },
        },
      }
    )

  }
}

export default SendForgotPasswordEmailService;
