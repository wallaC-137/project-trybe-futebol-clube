import { Router, Response, Request } from 'express';
import UserController from '../controllers/users.controller';
import UserValidation from '../middlewares/user.validation';
import TokenValidation from '../middlewares/token.validation';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  UserValidation.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);
router.get(
  '/role',
  TokenValidation.tokenValidations,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
