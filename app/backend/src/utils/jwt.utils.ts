import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

const sign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verify = (token: string): TokenPayload | undefined => {
  try {
    const data = jwt.verify(token, secret) as TokenPayload;
    return data;
  } catch (err) {
    console.log('token invalido');
  }
};

export default {
  sign,
  verify,
};
