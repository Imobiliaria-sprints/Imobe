import { ISendMailDTO } from "./ISendMailDTO";

export interface ISendMailUseCase {
  execute({ to, subject, variables, path }: ISendMailDTO): Promise<void>;
}
