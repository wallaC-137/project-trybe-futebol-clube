import { ILogin } from '../Interfaces/users/IUser';
import UserModel from '../models/users.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { TokenResponse } from '../Interfaces/users/Token';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(user: ILogin): Promise<ServiceResponse<TokenResponse>> {
    const isOk = await this.userModel.login(user);
    if (!isOk) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    return { status: 'SUCCESSFUL', data: { token: isOk } };
  }

  // public async getTeamsById(id: number): Promise<ServiceResponse<ITeam>> {
  //   const team = await this.teamModel.findById(id);
  //   if (team == null) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
  //   return { status: 'SUCCESSFUL', data: team };
  // }
}
