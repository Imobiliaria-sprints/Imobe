import { NextFunction, Request, Response } from "express";
import yup from "@config/yup";

export const validationAddress = async (
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  await yup
    .object()
    .shape({
      ads_id: yup.string(),
      street: yup.string().required(),
      city: yup.string().required().min(3),
      number: yup.string().required().min(0),
      block: yup.string(),
      complement: yup.string(),
      state: yup.string().required().min(2),
      zip_code: yup.string().required().min(5),
    })
    .validate(request.body, { abortEarly: false });

  return next();
};
