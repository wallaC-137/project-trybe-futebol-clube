import { Request, Response } from 'express';
import UserService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { status, data } = await this.userService.login(req.body);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    res.status(200).json(data);
  }
}
