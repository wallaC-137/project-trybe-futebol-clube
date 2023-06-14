import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamController = new TeamsController();

const router = Router();

router.get('/', teamController.getAllTeams);

export default router;
