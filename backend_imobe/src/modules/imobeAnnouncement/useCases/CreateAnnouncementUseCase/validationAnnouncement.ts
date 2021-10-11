import { NextFunction, Request, Response } from "express";
import yup from "@config/yup";

export const validationAnnouncement = async (
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  await yup
    .object()
    .shape({
      title: yup.string().required().min(20),
      price: yup.number().required().min(1000),
      rooms: yup.number().required().min(1),
      square_meters: yup.number().required().min(15),
    })
    .validate(request.body, { abortEarly: false });

  return next();
};
