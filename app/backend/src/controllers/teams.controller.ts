import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamService: TeamService = new TeamService(),
  ) { }

  public async getAllTeams(req: Request, res: Response) {
    // const data = { status: 'SUCCESSFUL', data: [{ id: 1, teamName: 'Team 1' }] };
    const response = await this.teamService.getAllTeams();
    res.status(200).json(response.data);
  }

  public async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamsById(Number(id));

    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    res.status(200).json(data);
  }
}
