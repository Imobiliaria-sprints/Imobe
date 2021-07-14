import "reflect-metadata";
import connection from "./database";
import express from "express";
import { router } from "./router/router";
import { errorResponse } from "./errors/errorResponse";

connection.create();

const app = express();

app.use(express.json());

app.use(router);

app.use(errorResponse);

export { app };
