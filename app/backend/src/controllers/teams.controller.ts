import { Request, Response } from 'express';
import BookService from '../services/teams.service';

export default class TeamsController {
  constructor(
    private teamService: BookService = new BookService(),
  ) { }

  public async getAllTeams(req: Request, res: Response) {
    const { data } = await this.teamService.getAllTeams();
    res.status(200).json(data);
  }
}
