export interface ICreateUserAuthenticateUseCase {
  execute(email: string, password: string): Promise<string>;
}
