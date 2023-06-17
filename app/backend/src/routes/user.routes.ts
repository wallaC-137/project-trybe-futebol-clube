import { Router, Response, Request } from 'express';
import UserController from '../controllers/users.controller';
import UserValidation from '../middlewares/user.validation';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  UserValidation.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);
// router.get('/:id', (req: Request, res: Response) => loginController.getTeamsById(req, res));

export default router;
