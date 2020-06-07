import { sign } from 'jsonwebtoken';
// import User from '@modules/users/infra/typeorm/entities/User';//'../models/User';
// import authConfig from '@config/auth';

import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
// import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

// interface IResponse {
//   user: User;
//   token: string;
// }

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    // @inject('HashProvider')
    // private hashProvider: IHashProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

  ) { }

  public async execute({ token, password }: IRequest): Promise<void> {


  }
}

export default ResetPasswordService;
