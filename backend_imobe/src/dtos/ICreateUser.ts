export interface ICreateUserDTO {
  avatar?: string;

  name: string;

  phone: string;

  email: string;

  password: string;

  password_reset_token?: string;
}
