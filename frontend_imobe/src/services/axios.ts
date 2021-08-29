import axios from "axios";
import { Request } from "express";
import { NextApiRequest, NextPageContext } from "next";
import { parseCookies } from "nookies";

export function getApiClient(
  ctx?:
    | Pick<NextPageContext, "req">
    | {
        req: NextApiRequest;
      }
    | {
        req: Request;
      }
    | null
    | undefined
) {
  const { "imobeflex.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333/",
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
