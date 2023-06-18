import { Request, Response } from 'express';
// import { Token } from '../Interfaces/users/Token';
import MatchService from '../services/matches.service';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const { data } = await this.matchService.getAllMatches(inProgress as string | undefined);
    res.status(200).json(data);
  }

  // public async getRole(req: Request, res: Response) {
  //   const { authorization } = req.headers;
  //   const { status, data } = await this.userService.getRole(authorization as Token);

  //   if (status !== 'SUCCESSFUL') {
  //     return res.status(mapStatusHTTP(status)).json(data);
  //   }

  //   res.status(200).json(data);
  // }
}
