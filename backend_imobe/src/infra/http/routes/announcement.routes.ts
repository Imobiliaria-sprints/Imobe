import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { CreateAnnouncementController } from "@modules/imobeAnnouncement/useCases/CreateAnnouncementUseCase/CreateAnnouncementController";
import { ListAllAnnouncementController } from "@modules/imobeAnnouncement/useCases/ListAllAnnouncementUseCase/ListAllAnnouncementController";
import { SearchAnnouncementController } from "@modules/imobeAnnouncement/useCases/SearchAnnouncementUseCase/SearchAnnouncementController";
import { DeleteAnnouncementController } from "@modules/imobeAnnouncement/useCases/DeleteAnnouncementUseCase/DeleteAnnouncementController";
import {createAddressController} from "@modules/imobeAddress/useCases/CreateAddressUseCase";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";

const upload = multer(uploadImageConfig);

const announcement = Router();

const createAnnouncementController = new CreateAnnouncementController();
const listAllAnnouncementController = new ListAllAnnouncementController();
const searchAnnouncementController = new SearchAnnouncementController();
const deleteAnnouncementController = new DeleteAnnouncementController();

announcement.post(
  "/:address_id",
  ensureAuthenticated,
  // validationAnnouncement,
  upload.array("images", 5),
  createAnnouncementController.handle
);

announcement.post(
  "/address",
  ensureAuthenticated,
  createAddressController.handle
);

announcement.get("/:page", listAllAnnouncementController.handle);

announcement.post("/search", searchAnnouncementController.handle);

announcement.delete(
  "/:announcement_id",
  ensureAuthenticated,
  deleteAnnouncementController.handle
);

export { announcement };
