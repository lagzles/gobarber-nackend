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
    const checkIfUserExists = await this.usersRepository.findByEmail(data.email);

    console.log('checkuser', checkIfUserExists)

    if (!checkIfUserExists) {
      throw new AppError('Email não valido');
    }

    await this.userTokensRepository.generate(checkIfUserExists.id);

    this.mailProvider.sendMail(data.email, 'Pedido de recuperação de senha recebido!')

  }
}

export default SendForgotPasswordEmailService;
