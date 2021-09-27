export interface ISendMailDTO {
  to: string;
  subject: string;
  variables: object;
  path: string;
}

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
