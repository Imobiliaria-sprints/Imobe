import { NextFunction, Request, Response } from "express";
import yup from "../../config/yup";

export const validationUser = async (
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  await yup
    .object()
    .shape({
      name: yup.string().required().min(3),
      phone: yup.string().required().min(7),
      email: yup.string().email().required(),
      password: yup.string().min(8).max(125).required(),
    })
    .validate(request.body, { abortEarly: false });

  return next();
};
