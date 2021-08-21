import { NextFunction, Request, Response } from "express";

/**
 * Middleware for verify if exceptions is instance of Error Interface.
 * @param {Error} err
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {Response} Response
 */

export function errorResponse(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
