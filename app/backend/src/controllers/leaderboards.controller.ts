import { Request, Response } from 'express';
// import { Token } from '../Interfaces/users/Token';
import LeaderboardService from '../services/leaderboards.service';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) { }

  public async getAllHostInfos(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllHostInfos();
    res.status(200).json(data);
    // res.status(200).json({ message: 'ok' });
  }

  // public async finishMatch(req: Request, res: Response) {
  //   const { id } = req.params;

  //   const { status, data } = await this.matchService.finishMatch(id);

  //   if (status !== 'SUCCESSFUL') {
  //     return res.status(mapStatusHTTP(status)).json(data);
  //   }

  //   res.status(200).json(data);
  // }

  // public async inProgressMatch(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { homeTeamGoals, awayTeamGoals } = req.body;

  //   const { status, data } = await this.matchService
  //     .inProgressMatch({ id, homeTeamGoals, awayTeamGoals });

  //   if (status !== 'SUCCESSFUL') {
  //     return res.status(mapStatusHTTP(status)).json(data);
  //   }

  //   res.status(200).json(data);
  // }

  // public async createMatch(req: Request, res: Response) {
  //   // const { homeTeam, awayTeam, matchDate } = req.body;

  //   const { status, data } = await this.matchService.createMatch(req.body);
  //   if (status !== 'SUCCESSFUL') {
  //     return res.status(mapStatusHTTP(status)).json(data);
  //   }

  //   if (status !== 'SUCCESSFUL') {
  //     return res.status(mapStatusHTTP(status)).json(data);
  //   }

  //   res.status(201).json(data);
  // }
  // public async getRole(req: Request, res: Response) {
  //   const { authorization } = req.headers;
  //   const { status, data } = await this.userService.getRole(authorization as Token);

  //   if (status !== 'SUCCESSFUL') {
  //     return res.status(mapStatusHTTP(status)).json(data);
  //   }

  //   res.status(200).json(data);
  // }
}
