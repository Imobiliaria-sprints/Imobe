import { ListAnnouncementController } from "@cases/ListAnnouncementUserUseCase/ListAnnouncementController";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { Router } from "express";

const dashboard = Router();

const listAnnouncementController = new ListAnnouncementController();

dashboard.get("/", ensureAuthenticated, listAnnouncementController.handle);

export { dashboard };
