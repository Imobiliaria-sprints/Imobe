export interface ICreateUserUseCase {
  execute(
    name: string,
    phone: string,
    email: string,
    password: string,
    avatar?: string,
    password_reset_token?: string
  ): Promise<Record<string, any>>;
}
