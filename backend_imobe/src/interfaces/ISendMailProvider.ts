import { ISendMailDTO } from "../dtos/ISendMailDTO";

export interface ISendMailProvider {
  execute({ to, subject, variables, path }: ISendMailDTO): Promise<void>;
}
