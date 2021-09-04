import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import ListAnnouncementController from "@cases/ListAnnouncementUserUseCase/ListAnnouncementController";
import { userRoutes } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";

const router = Router();

router.use(userRoutes);

router.use(postRouter);

router.get(
  "/dashboard",
  ensureAuthenticated,
  ListAnnouncementController.handle
);

export { router };
