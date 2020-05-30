import { Router } from 'express';
// import { getCustomRepository } from 'typeorm';

import AppointmentsController from '../controllers/AppointmentsController';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', appointmentsController.create);

appointmentsRouter.post('/', async (request, response) => {

});

export default appointmentsRouter;
