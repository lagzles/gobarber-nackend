import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<void> {
    // exibir dados do usuario
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id; // do context
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    delete user?.password;

    return response.json(user);
  };

}
