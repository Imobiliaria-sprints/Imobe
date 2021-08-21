export interface ICreateUserUseCase {
  execute(
    name: string,
    phone: string,
    email: string,
    password: string,
    avatar?: string
  ): Promise<Record<string, any>>;
}
