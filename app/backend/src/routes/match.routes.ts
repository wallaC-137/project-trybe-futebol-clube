import { Router, Response, Request } from 'express';
import MatchController from '../controllers/matches.controller';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
// router.get('/:id', (req: Request, res: Response) => MatchController.getTeamsById(req, res));

export default router;
