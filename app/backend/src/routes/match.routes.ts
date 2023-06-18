import { Router, Response, Request } from 'express';
import MatchController from '../controllers/matches.controller';
import TokenValidation from '../middlewares/token.validation';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  TokenValidation.tokenValidations,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
// router.get('/:id', (req: Request, res: Response) => MatchController.getTeamsById(req, res));

export default router;
