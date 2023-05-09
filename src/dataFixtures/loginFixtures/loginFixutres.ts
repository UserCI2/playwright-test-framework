import user from './user.json';
import * as _ from 'lodash';

export type UserData = { email: string; password: string };
export type WhichInvalid =
  | 'invalidPass'
  | 'invalidEmail'
  | 'invalidPassAndEmail';

interface IUser {
  validLoginData: () => UserData;
  invalidData: (whichData: WhichInvalid) => UserData;
}

export class UserDataFixture implements IUser {
  validLoginData(): UserData {
    const index = _.random(0, user.validUsers.length - 1);
    return {
      email: user.validUsers[index].email,
      password: user.validUsers[index].password
    };
  }

  invalidData(whichData: WhichInvalid): UserData {
    switch (whichData) {
      case 'invalidEmail':
        return {
          email: user.invalidUser.invalidEmail.email,
          password: user.invalidUser.invalidEmail.password
        };
      case 'invalidPass':
        return {
          email: user.invalidUser.invalidPassword.email,
          password: user.invalidUser.invalidPassword.password
        };
      case 'invalidPassAndEmail':
        return {
          email: user.invalidUser.invalidEmailAndPassword.email,
          password: user.invalidUser.invalidEmailAndPassword.password
        };
    }
  }
}
