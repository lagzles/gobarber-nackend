import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

// middleware de upload de avatar para usuarios
profileRouter.use(ensureAuthentication);

profileRouter.put('/', profileController.update);

profileRouter.get('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_passowrd: Joi.string(),
      password: Joi.string(),
      passowrd_confirmation: Joi.string().valid(Joi.ref('password')),
    }
  }), profileController.show);

export default profileRouter;
