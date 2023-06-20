import { Router, Response, Request } from 'express';
import LeaderboardController from '../controllers/leaderboards.controller';
// import TokenValidation from '../middlewares/token.validation';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllHostInfos(req, res),
);

// router.post(
//   '/',
//   TokenValidation.tokenValidations,
//   (req: Request, res: Response) => matchController.createMatch(req, res),
// );

// router.patch(
//   '/:id/finish',
//   TokenValidation.tokenValidations,
//   (req: Request, res: Response) => matchController.finishMatch(req, res),
// );
// router.patch(
//   '/:id',
//   TokenValidation.tokenValidations,
//   (req: Request, res: Response) => matchController.inProgressMatch(req, res),
// );

export default router;
