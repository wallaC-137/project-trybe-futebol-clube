// import { NewEntity } from '../Interfaces';
import SequelizeTeams from '../database/models/SequelizeTeams';
import TeamsModel from './teams.model';
import { IMatchModel } from '../Interfaces/matches/IMetchModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch, IMatchCreate, IMatchInProgress, IMatchTeams } from '../Interfaces/matches/IMetch';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatches;
  private static modelTeams = new TeamsModel();

  private static async teamsExist(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const time = await MatchesModel.modelTeams.findById(homeTeamId);
    const time2 = await MatchesModel.modelTeams.findById(awayTeamId);
    return time === null || time2 === null;
  }

  async createMatch(data: IMatchCreate): Promise<IMatch | null> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = data;

    const algo = await MatchesModel.teamsExist(+homeTeamId, +awayTeamId);
    if (algo) return null;
    console.log(algo);
    // const algo = await this.modelTeams.findById(+homeTeamId);
    const result = await this.model
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });

    return result as unknown as IMatch;
    // const dbData = await this.model.create(data);

    // const { id, teamName }: ITeam = dbData;
    // return { id, teamName };
  }

  public async findAllInProgress(inProgress: string): Promise<IMatchTeams[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [{
        model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'],
      }, {
        model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'],
      }],
    });

    return dbData as unknown as IMatchTeams[];
  }

  public async findAll(inProgress: string | undefined): Promise<IMatchTeams[]> {
    if (inProgress === undefined) {
      const dbData = await this.model.findAll({
        // raw: true,
        include: [{
          model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'],
        }, {
          model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'],
        }],
      });

      return dbData as unknown as IMatchTeams[];
    }

    const dbData = await this.findAllInProgress(inProgress);
    return dbData;
  }

  public async finishMatch(id: string): Promise<number | null> {
    const [stateChanged] = await this.model.update({ inProgress: false }, { where: { id } });
    if (stateChanged === 0) return null;
    return stateChanged;
  }

  public async inProgressMatch(inProgress: IMatchInProgress): Promise<true | null> {
    const { id, homeTeamGoals, awayTeamGoals } = inProgress;
    // const [stateChanged] = await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    const [stateChanged] = await this.model
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    // as home_Team_goals
    if (stateChanged === 0) return null;
    return true;
  }
  // public async findById(id: ITeam['id']): Promise<ITeam | null> {
  //   const dbData = await this.model.findByPk(id);
  //   if (dbData == null) return null;

  //   return dbData;
  // }
}
