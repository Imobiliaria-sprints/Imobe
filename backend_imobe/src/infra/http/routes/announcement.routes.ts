import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { CreateAddressController } from "@cases/CreateAddressUseCase/CreateAddressController";
import { validationAddress } from "@cases/CreateAddressUseCase/validationAddress";
import { CreateAnnouncementController } from "@cases/CreateAnnouncementUseCase/CreateAnnouncementController";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";
import { ListAllAnnouncementController } from "@cases/ListAllAnnouncementUseCase/ListAllAnnouncementController";
import { SearchAnnouncementController } from "@cases/SearchAnnouncementUseCase/SearchAnnouncementController";

const upload = multer(uploadImageConfig);

const announcement = Router();

const createAddressController = new CreateAddressController();
const createAnnouncementController = new CreateAnnouncementController();
const listAllAnnouncementController = new ListAllAnnouncementController();
const searchAnnouncementController = new SearchAnnouncementController();

announcement.post(
  "/",
  ensureAuthenticated,
  // validationAnnouncement,
  upload.array("images", 5),
  createAnnouncementController.handle
);

announcement.post(
  "/address/:announcement_id",
  validationAddress,
  createAddressController.handle
);

announcement.get("/:page", listAllAnnouncementController.handle);

announcement.get("/search/:slug_title", searchAnnouncementController.handle);

export { announcement };
