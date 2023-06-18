import MatchModel from '../models/matches.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMetchModel';
import { IMatch, IMatchFinish, IMatchInProgress } from '../Interfaces/matches/IMetch';

export default class MatchesService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(inProgress: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: string): Promise<ServiceResponse<IMatchFinish>> {
    const match = await this.matchModel.finishMatch(id);
    if (match == null) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async inProgressMatch(
    inProgress: IMatchInProgress,
  ): Promise<ServiceResponse<IMatchFinish>> {
    const { homeTeamGoals, awayTeamGoals } = inProgress;
    const match = await this.matchModel.inProgressMatch(inProgress);
    if (match == null) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };

    return { status: 'SUCCESSFUL',
      data: { message: `Home team goals: ${homeTeamGoals}, Away team Goals: ${awayTeamGoals}` } };
  }
  // public async getTeamsById(id: number): Promise<ServiceResponse<ITeam>> {
  //   const team = await this.teamModel.findById(id);
  //   if (team == null) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
  //   return { status: 'SUCCESSFUL', data: team };
  // }
}
