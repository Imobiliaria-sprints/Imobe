import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import CreateAddressController from "@cases/CreateAddressUseCase/CreateAddressController";
import { validationAddress } from "@cases/CreateAddressUseCase/validationAddress";
import CreateAnnouncementController from "@cases/CreateAnnouncementUseCase/CreateAnnouncementController";
import { validationAnnouncement } from "@cases/CreateAnnouncementUseCase/validationAnnouncement";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";

const upload = multer(uploadImageConfig);

const postRouter = Router();

postRouter.post(
  "/announcement",
  ensureAuthenticated,
  // validationAnnouncement,
  upload.array("images", 5),
  CreateAnnouncementController.handle
);
postRouter.post(
  "/announcement/address/:announcement_id",
  validationAddress,
  CreateAddressController.handle
);

export { postRouter };
