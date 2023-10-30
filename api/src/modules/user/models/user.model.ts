import { User } from 'src/entities/user/user.entity';

export class UserModel {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  permission: string;
  constructor(user: User) {
    this.id = user.id;
    this.fullname = user.fullname;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.phone = user.phone;
    this.permission = user.permission.name;
  }

  getUserModelToForward = () => {
    return {
      userId: this.id,
      fullname: this.fullname,
      email: this.email,
      username: this.username,
      password: this.password,
      phone: this.phone,
      permission: this.permission,
    };
  };
}
