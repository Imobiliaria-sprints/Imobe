export interface ICreateUserAuthenticateUseCase {
  execute(
    email: string,
    password: string
  ): Promise<{ token: string; user: Record<string, any> }>;
}
