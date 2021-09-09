export interface ICreateUserDTO {
  avatar?: string;

  name: string;

  phone: string;

  email: string;

  password: string;

  admin?: boolean;

  password_reset_token?: string;
}
