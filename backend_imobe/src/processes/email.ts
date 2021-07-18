import { Job, DoneCallback } from "bull";
import SendMailUseCase from "../useCases/SendMailUseCase/SendMailUseCase";

const emailProcess = async (job: Job, done: DoneCallback) => {
  await SendMailUseCase.execute({
    to: job.data.to,
    subject: job.data.subject,
    variables: job.data.variables,
    path: job.data.path,
  });

  throw new Error("Something bad happened");
};

export default emailProcess;
