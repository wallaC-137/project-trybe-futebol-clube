// import { NewEntity } from '../Interfaces';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamsModel implements ITeamModel {
  private model = SequelizeTeams;

  // async create(data: NewEntity<ITeam>): Promise<ITeam> {
  //   const dbData = await this.model.create(data);

  //   const { id, teamName }: ITeam = dbData;
  //   return { id, teamName };
  // }

  public async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();

    // const ww = dbData.map(({ id, teamName }) => (
    //   { id, teamName }
    // ));
    return dbData;
  }

  public async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    // console.log(dbData);

    if (dbData == null) return null;

    return dbData;
  }
}

// const teamsModel = new TeamsModel();
// (async () => console.log(await teamsModel))();
