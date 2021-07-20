import Queue from "bull";
import emailProcess from "../processes/email.process";
import { SendMailUseCase } from "../useCases/SendMailUseCase/SendMailUseCase";
import { BullAdapter } from "bull-board/bullAdapter";
import { createBullBoard } from "bull-board";

interface SendMailData {
  to: string;
  subject: string;
  variables: object;
  path: string;
}

const sendMailUseCase = new SendMailUseCase();

const sendMailQueue = new Queue(sendMailUseCase.key, {
  redis: process.env.REDIS_HOSTS,
});

createBullBoard([]).setQueues([new BullAdapter(sendMailQueue)]);

sendMailQueue.process(emailProcess);

const sendNewEmail = async (data: SendMailData) => {
  await sendMailQueue.add(data, {
    attempts: 5,
    priority: 4,
  });
};

export { sendNewEmail };
