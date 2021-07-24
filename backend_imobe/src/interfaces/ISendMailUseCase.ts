import { ISendMailDTO } from "../useCases/SendMailUseCase/ISendMailDTO";

export interface ISendMailUseCase {
  execute({ to, subject, variables, path }: ISendMailDTO): Promise<void>;
}
