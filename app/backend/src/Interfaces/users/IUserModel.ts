import { ILogin } from './IUser';
import { Token } from './Token';

export interface IUserModel {
  // create(data: Partial<IUser>): Promise<IUser>,
  // findAll(): Promise<IUser[]>,
  // findById(id: IUser['id']): Promise<IUser | null>
  login(user: ILogin): Promise<Token | null>
}
