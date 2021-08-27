import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import ListAdsController from "@cases/ListAdsUserUseCase/ListAdsController";
import { userRoutes } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";

const router = Router();

router.use(userRoutes);

router.use(postRouter);

router.get("/dashboard", ensureAuthenticated, ListAdsController.handle);

export { router };
