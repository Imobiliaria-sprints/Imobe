export interface ICreateUserUseCase {
  execute(
    name: string,
    phone: string,
    email: string,
    password: string
  ): Promise<Record<string, any>>;
}
