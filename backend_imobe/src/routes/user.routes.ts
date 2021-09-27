import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import { CreateUserAuthenticateController } from "@cases/CreateUserAuthenticated/CreateUserAuthenticateController";
import { CreateUserController } from "@cases/CreateUserUseCase/CreateUserController";
import { validationUser } from "@cases/CreateUserUseCase/validationUser";
import { RefreshTokenController } from "@cases/RefreshTokenUserUseCase/RefreshTokenController";
import { ReturnUserAuthenticatedController } from "@cases/ReturnUserAuthenticatedUseCase/ReturnUserAuthenticatedController";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";
import { ForgotPasswordController } from "@cases/ForgotPasswordUseCase/ForgotPasswordController";
import { ResetPasswordController } from "@cases/ResetPasswordUseCase/ResetPasswordController";
import { ListAllUserController } from "@cases/ListAllUserUseCase/ListAllUserController";
import { ensureAdmin } from "@middle/ensureAdmin";

const user = Router();

const uploadImage = multer(uploadImageConfig);

const createUserAuthenticateController = new CreateUserAuthenticateController();
const createUserController = new CreateUserController();
const refreshTokenController = new RefreshTokenController();
const returnUserAuthenticatedController =
  new ReturnUserAuthenticatedController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const listAllUserController = new ListAllUserController();

user.post("/", uploadImage.single("avatar"), createUserController.handle);
user.post("/login", createUserAuthenticateController.handle);

user.post("/auth/forgot_password", forgotPasswordController.handle);

user.post("/auth/reset_password", resetPasswordController.handle);

user.get(
  "/verify/user",
  ensureAuthenticated,
  returnUserAuthenticatedController.handle
);

user.post("/refresh_token", refreshTokenController.handle);

user.get("/", ensureAuthenticated, ensureAdmin, listAllUserController.handle);

export { user };
