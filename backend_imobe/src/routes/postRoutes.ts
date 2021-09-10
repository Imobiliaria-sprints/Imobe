import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { CreateAddressController } from "@cases/CreateAddressUseCase/CreateAddressController";
import { validationAddress } from "@cases/CreateAddressUseCase/validationAddress";
import { CreateAnnouncementController } from "@cases/CreateAnnouncementUseCase/CreateAnnouncementController";
import { validationAnnouncement } from "@cases/CreateAnnouncementUseCase/validationAnnouncement";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";
import { ListAllAnnouncementController } from "@cases/ListAllAnnouncementUseCase/ListAllAnnouncementController";

const upload = multer(uploadImageConfig);

const postRouter = Router();

const createAddressController = new CreateAddressController();
const createAnnouncementController = new CreateAnnouncementController();
const listAllAnnouncementController = new ListAllAnnouncementController();

postRouter.post(
  "/announcement",
  ensureAuthenticated,
  // validationAnnouncement,
  upload.array("images", 5),
  createAnnouncementController.handle
);

postRouter.post(
  "/announcement/address/:announcement_id",
  validationAddress,
  createAddressController.handle
);

postRouter.get("/announcement/:page", listAllAnnouncementController.handle);

export { postRouter };
