// import { NewEntity } from '../Interfaces';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { IMatchModel } from '../Interfaces/matches/IMetchModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchTeams } from '../Interfaces/matches/IMetch';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatches;

  // async create(data: NewEntity<ITeam>): Promise<ITeam> {
  //   const dbData = await this.model.create(data);

  //   const { id, teamName }: ITeam = dbData;
  //   return { id, teamName };
  // }

  public async findAll(): Promise<IMatchTeams[]> {
    const dbData = await this.model.findAll({
      include: [{
        model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'],
      }, {
        model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'],
      }],
    });

    return dbData as unknown as IMatchTeams[];
    // const ww = dbData.map(({ id, teamName }) => (
    //   { id, teamName }
    // ));
  }

  // public async findById(id: ITeam['id']): Promise<ITeam | null> {
  //   const dbData = await this.model.findByPk(id);
  //   if (dbData == null) return null;

  //   return dbData;
  // }
}

// const teamsModel = new TeamsModel();
// (async () => console.log(await teamsModel))();
