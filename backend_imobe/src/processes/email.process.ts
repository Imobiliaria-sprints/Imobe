import { Job, DoneCallback } from "bull";
import { SendMailProvider } from "../provider/SendMailProvider";

const emailProcess = async (job: Job, done: DoneCallback) => {
  const sendMailProvider = new SendMailProvider();
  try {
    const email = await sendMailProvider.execute({
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
