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
    // return dbData;
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  // findById(id: number): Promise<ITeam | null> {
  //   const dbData = this.model.findByPk(id);
  //   return dbData;
  // }
}

// const teamsModel = new TeamsModel();
// (async () => console.log(await teamsModel))();
