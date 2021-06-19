export interface IUser {
  findByEmail(email: string): Promise<void>;
  save(user: string): Promise<void>;
}
