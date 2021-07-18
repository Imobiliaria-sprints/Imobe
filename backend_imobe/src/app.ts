import "reflect-metadata";
import "express-async-errors";
import connection from "./database";
import express from "express";
import { router } from "./router";
import { errorResponse } from "./errors/errorResponse";
import cors from "cors";
import { createBullBoard } from "bull-board";

cors();

connection();

const app = express();

app.use(express.json());

app.use(router);

app.use("/admin/queues", createBullBoard([]).router);

app.use(errorResponse);

export { app };
