import Model from "../../../database/models/SequelizeUsers";

const emailValid = 'admin@admin.com';
const emailInvalid = 'adminadmin.com';
const passwordValid = 'secret_admin';
const passwordEncrypted = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
const token = { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTY4NzEzMTk1NX0.omNoUDu-6wjZfs1aWq1USbIiFt1s4Must2o3NPjKYCE' }

const loginValid = {
  email: emailValid,
  password: passwordValid,
}

const loginInvalid = {
  email: emailInvalid,
  password: passwordValid,
}

const loginEncrypted = {
  email: emailValid,
  password: passwordEncrypted,
}

const userValidResponse = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: passwordEncrypted,
};

const userInvalidResponse = {
  message: 'Invalid email or password',
};

const jwtVerifyReturn = {
  id: 1,
  username: 'Admin',
};

const roleValid = {
  role: 'admin',
}

export default {
  loginValid,
  loginEncrypted,
  userValidResponse,
  token,
  emailValid,
  roleValid,
  jwtVerifyReturn,
  loginInvalid,
  userInvalidResponse,
};