import { Job, DoneCallback } from "bull";
import { SendMailUseCase } from "../useCases/SendMailUseCase/SendMailUseCase";

const emailProcess = async (job: Job, done: DoneCallback) => {
  const sendMailUseCase = new SendMailUseCase();
  try {
    const email = await sendMailUseCase.execute({
      to: job.data.to,
      subject: job.data.subject,
      path: job.data.path,
      variables: job.data.variables,
    });

    return email;
  } catch (error) {
    throw new Error(error);
  }
};

export default emailProcess;
