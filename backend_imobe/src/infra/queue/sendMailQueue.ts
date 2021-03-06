import Queue from "bull";
import emailProcess from "../../processes/email.process";
import { SendMailProvider } from "../provider/SendMailProvider";
import { ISendMailDTO } from "./ISendMailProvider";

const sendMailProvider = new SendMailProvider();

const sendMailQueue = new Queue(sendMailProvider.key, {
  redis: process.env.REDIS_HOSTS,
});

sendMailQueue.process(emailProcess);

const sendNewEmail = async (data: ISendMailDTO) => {
  await sendMailQueue.add(data, {
    attempts: 2,
    priority: 4,
  });
};

export { sendNewEmail };
