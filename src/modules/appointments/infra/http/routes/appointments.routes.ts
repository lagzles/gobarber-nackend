import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();


appointmentsRouter.use(ensureAuth);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/euzinho', providerAppointmentsController.index);


export default appointmentsRouter;
