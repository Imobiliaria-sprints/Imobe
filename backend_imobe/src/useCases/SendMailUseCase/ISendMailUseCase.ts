export interface ISendMailUseCase {
  execute(
    to: string,
    subject: string,
    variables: object,
    path: string
  ): Promise<void>;
}
