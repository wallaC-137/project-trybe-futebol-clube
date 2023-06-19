import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwtUtils from '../utils/jwt.utils';

export default class TokenValidation {
  public static tokenValidations = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token not found' });
    }

    const token = jwtUtils.verify(authorization);
    if (!token) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
