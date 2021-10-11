
export interface IAuthUserDTO {
  email: string,
  password: string
}

export interface ICreateUserAuthenticateUseCase {
  execute(
    email: string,
    password: string
  ): Promise<{ token: string; authuser: Record<string, any> }>;
}
