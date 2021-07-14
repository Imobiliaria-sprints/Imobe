import "reflect-metadata";
import connection from "./database";
import express from "express";
import { router } from "./router/router";

connection.create();

const app = express();

app.use(express.json());

app.use(router);

export { app };
