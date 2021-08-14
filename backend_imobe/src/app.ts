import "reflect-metadata";
import "express-async-errors";
import connection from "./database";
import express from "express";
import { router } from "./router";
import { errorResponse } from "./errors/errorResponse";
import { createClient } from "redis";
import cors from "cors";

connection();

// createClient(process.env.REDIS_HOSTS).on("message", () =>
//   console.log("connected")
// );

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(errorResponse);

export { app };
