import { Router } from 'express';
import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const resetPassword = new ResetPasswordController();
const forgotPassword = new ForgotPasswordController();

passwordRouter.post('/forgot', forgotPassword.create);
passwordRouter.post('/reset', resetPassword.create);

export default passwordRouter;
