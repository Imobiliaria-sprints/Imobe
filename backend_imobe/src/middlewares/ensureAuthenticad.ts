import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthentited(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const [, token] = request.headers.authorization?.split(" ");

  if (!token) {
    return response.status(401).end();
  }

  try {
    const { sub } = verify(token, process.env.SECRET_KEY) as IPayload;

    request.user_id = sub;
    console.log(sub);

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
