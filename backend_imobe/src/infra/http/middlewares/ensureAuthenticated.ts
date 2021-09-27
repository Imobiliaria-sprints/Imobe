import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.headers.authorization) {
    return response.status(401).end();
  }

  const [, token] = request.headers.authorization?.split(" ");

  if (!token) {
    return response.status(401).end();
  }

  try {
    const { sub } = verify(token, process.env.SECRET_KEY) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
