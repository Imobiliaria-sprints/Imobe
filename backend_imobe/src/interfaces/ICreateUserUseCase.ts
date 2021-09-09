export interface ICreateUserUseCase {
  execute(
    name: string,
    phone: string,
    email: string,
    password: string,
    admin?: boolean,
    avatar?: string,
    password_reset_token?: string
  ): Promise<Record<string, any>>;
}
