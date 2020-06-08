import { uuid } from 'uuidv4';

import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];


  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = new UserToken();

    const user = this.userTokens.find(userToken => userToken.token === token)

    if (!user) {
      throw new AppError('Token is not valid')
    }

    return user;

  }

}

export default FakeUserTokensRepository;
