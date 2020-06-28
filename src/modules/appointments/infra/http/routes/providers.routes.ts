import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();

const providersController = new ProvidersController();
const monthAvailability = new ProviderMonthAvailabilityController();
const dayAvailability = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuth);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', monthAvailability.index);
providersRouter.get('/:provider_id/day-availability', dayAvailability.index);


export default providersRouter;
