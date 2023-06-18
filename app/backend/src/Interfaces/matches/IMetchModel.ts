import { IMatchTeams } from './IMetch';

export interface IMatchModel {
  // create(data: Partial<IMatch>): Promise<IMatch>,
  findAll(inProgress: string | undefined): Promise<IMatchTeams[]>,
  findAllInProgress(inProgress: string): Promise<IMatchTeams[]>,
  // findById(id: IMatch['id']): Promise<IMatch | null>
}
