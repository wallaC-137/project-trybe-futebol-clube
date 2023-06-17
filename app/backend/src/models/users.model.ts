// import { NewEntity } from '../Interfaces';
import * as bcrypt from 'bcryptjs';
import { Role } from '../Interfaces/users/Role';
import { ILogin } from '../Interfaces/users/IUser';
import { Token } from '../Interfaces/users/Token';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import jwtUtils from '../utils/jwt.utils';
// import { Token } from '../Interfaces/users/Token';

export default class UsersModel implements IUserModel {
  private model = SequelizeUsers;

  // async create(data: NewEntity<ITeam>): Promise<ITeam> {
  //   const dbData = await this.model.create(data);

  //   const { id, teamName }: ITeam = dbData;
  //   return { id, teamName };
  // }

  // public async findAll(user): Promise<Token> {
  //   const dbData = await this.model.findOne({where:});
  //   return dbData.map(({ id, teamName }) => (
  //     { id, teamName }
  //   ))
  // }

  private static validateEmailAndPass(email: string, password: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(email);
    const isPassword = password.length > 5;
    return isEmail && isPassword;
  }

  public async login(user: ILogin): Promise<Token | null> {
    if (!UsersModel.validateEmailAndPass(user.email, user.password)) return null;

    const dbData = await this.model.findOne({ where: { email: user.email } });
    if (!dbData || !bcrypt.compareSync(user.password, dbData.dataValues.password)) return null;

    const { username, id } = dbData.dataValues; // pode ser que eu tenha que alterar user name para email
    const token: Token = jwtUtils.sign({ id, username });

    return token;
  }

  public async getRole(user: Token): Promise<Role | null> {
    const payload = jwtUtils.verify(user);
    if (!payload) return null;

    const dbData = await this.model.findOne({ where: { id: payload.id } });
    if (!dbData) return null;

    const { role } = dbData.dataValues;
    return role as Role;
  }

  // public async findById(id: ITeam['id']): Promise<ITeam | null> {
  //   const dbData = await this.model.findByPk(id);
  //   if (dbData == null) return null;

  //   return dbData;
  // }
}

// const teamsModel = new TeamsModel();
// (async () => console.log(await teamsModel))();
