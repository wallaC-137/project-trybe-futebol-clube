import { IMatchTeams } from './IMetch';

export interface IMatchModel {
  // create(data: Partial<IMatch>): Promise<IMatch>,
  findAll(): Promise<IMatchTeams[]>,
  // findById(id: IMatch['id']): Promise<IMatch | null>
}
