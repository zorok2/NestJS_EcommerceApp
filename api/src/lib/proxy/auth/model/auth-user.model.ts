/* eslint-disable prettier/prettier */
export class AuthUser {
  id: string;
  fullname: string;
  email: string;
  username: string;
  password: string;
  credential: string;
  constructor(args?: any) {
    Object.assign(this, args);
  }

  getCreateUserRequest() {
    return {
      fullname: this.fullname,
      email: this.email,
      credential: this.credential,
    };
  }
  getUsernamePassword() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
