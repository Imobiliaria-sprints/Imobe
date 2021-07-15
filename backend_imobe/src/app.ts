import "reflect-metadata";
import "express-async-errors";
import connection from "./database";
import express from "express";
import { router } from "./router";
import { errorResponse } from "./errors/errorResponse";

connection();

const app = express();

app.use(express.json());

app.use(router);

app.use(errorResponse);

export { app };
