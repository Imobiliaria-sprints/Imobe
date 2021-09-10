import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { ListAnnouncementController } from "@cases/ListAnnouncementUserUseCase/ListAnnouncementController";
import { userRoutes } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";

const router = Router();

router.use(userRoutes);

router.use(postRouter);

const listAnnouncementController = new ListAnnouncementController();

router.get(
  "/dashboard",
  ensureAuthenticated,
  listAnnouncementController.handle
);

export { router };
