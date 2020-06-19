import { Router } from 'express';


import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';
import UserAvatarController from '../controllers/UserAvatarController';

const profileRouter = Router();
const profileController = new ProfileController();

// middleware de upload de avatar para usuarios
profileRouter.use(ensureAuthentication);

profileRouter.put('/', profileController.update);
profileRouter.get('/show', profileController.show);


export default profileRouter;
