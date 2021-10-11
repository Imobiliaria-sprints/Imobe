import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { CreateUserController } from "@modules/imobeUsers/useCases/CreateUserUseCase/CreateUserController";
import { ReturnUserAuthenticatedController } from "@modules/imobeAuth/useCases/ReturnUserAuthenticatedUseCase/ReturnUserAuthenticatedController";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";
import { ListAllUserController } from "@modules/imobeUsers/useCases/ListAllUserUseCase/ListAllUserController";
import { ensureAdmin } from "@middle/ensureAdmin";

const user = Router();

const uploadImage = multer(uploadImageConfig);

const createUserController = new CreateUserController();
const returnUserAuthenticatedController =
  new ReturnUserAuthenticatedController();
const listAllUserController = new ListAllUserController();

user.post("/", uploadImage.single("avatar"), createUserController.handle);

user.get(
  "/verify/user",
  ensureAuthenticated,
  returnUserAuthenticatedController.handle
);

user.get("/", ensureAuthenticated, ensureAdmin, listAllUserController.handle);

export { user };
