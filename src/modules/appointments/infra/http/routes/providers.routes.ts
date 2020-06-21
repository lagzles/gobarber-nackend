import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuth);

providersRouter.get('/', providersController.index);


export default providersRouter;
