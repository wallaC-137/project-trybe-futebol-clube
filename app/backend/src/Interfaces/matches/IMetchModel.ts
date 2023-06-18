import { IMatchInProgress, IMatchTeams } from './IMetch';

export interface IMatchModel {
  // create(data: Partial<IMatch>): Promise<IMatch>,
  findAll(inProgress: string | undefined): Promise<IMatchTeams[]>,
  findAllInProgress(inProgress: string): Promise<IMatchTeams[]>,
  finishMatch(id: string): Promise<number | null>,
  inProgressMatch(inProgress: IMatchInProgress): Promise<true | null>,

  // findById(id: IMatch['id']): Promise<IMatch | null>
}
