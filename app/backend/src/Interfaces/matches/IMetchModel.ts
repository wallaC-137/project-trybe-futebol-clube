import { IMatch } from './IMetch';

export interface IMatchModel  {
  create(data: Partial<IMatch>): Promise<IMatch>,
  findAll(): Promise<IMatch[]>,
  findById(id: IMatch['id']): Promise<IMatch | null>
}