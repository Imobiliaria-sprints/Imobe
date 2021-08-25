import { ISendMailDTO } from "../dtos/ISendMailDTO";

export interface ISendMailProvider {
  /**
   * @Lucas-Duarte-dev
   *
   * @param {object} ISendMailDTO
   * @param {string} to email
   * @param {string} subject
   * @param {object} variables
   * @param {string} path Path to email template
   */
  execute({ to, subject, variables, path }: ISendMailDTO): Promise<void>;
}
