import { Router, Response, Request } from 'express';
import MatchController from '../controllers/matches.controller';
import TokenValidation from '../middlewares/token.validation';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.post(
  '/',
  TokenValidation.tokenValidations,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

router.patch(
  '/:id/finish',
  TokenValidation.tokenValidations,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
router.patch(
  '/:id',
  TokenValidation.tokenValidations,
  (req: Request, res: Response) => matchController.inProgressMatch(req, res),
);

export default router;
