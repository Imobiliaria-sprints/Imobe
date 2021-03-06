import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { CreateAnnouncementController } from "@modules/imobeAnnouncement/useCases/CreateAnnouncementUseCase/CreateAnnouncementController";
import { ListAllAnnouncementController } from "@modules/imobeAnnouncement/useCases/ListAllAnnouncementUseCase/ListAllAnnouncementController";
import { SearchAnnouncementController } from "@modules/imobeAnnouncement/useCases/SearchAnnouncementUseCase/SearchAnnouncementController";
import { DeleteAnnouncementController } from "@modules/imobeAnnouncement/useCases/DeleteAnnouncementUseCase/DeleteAnnouncementController";
import { CreateAddressController } from "@modules/imobeAddress/useCases/CreateAddressUseCase/CreateAddressController";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";

const upload = multer(uploadImageConfig);

const announcement = Router();

const createAddressController = new CreateAddressController();
const createAnnouncementController = new CreateAnnouncementController();
const listAllAnnouncementController = new ListAllAnnouncementController();
const searchAnnouncementController = new SearchAnnouncementController();
const deleteAnnouncementController = new DeleteAnnouncementController();

announcement.post(
  "/address",
  ensureAuthenticated,
  createAddressController.handle
);

announcement.post(
  "/:address_id",
  ensureAuthenticated,
  upload.array("images", 5),
  createAnnouncementController.handle
);

announcement.get("/:page", listAllAnnouncementController.handle);

announcement.post("/search", searchAnnouncementController.handle);

announcement.delete(
  "/:announcement_id",
  ensureAuthenticated,
  deleteAnnouncementController.handle
);

export { announcement };
