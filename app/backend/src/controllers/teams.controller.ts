import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

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
    const response = await this.teamService.getTeamsById(Number(id));
    res.status(200).json(response.data);
  }
}
