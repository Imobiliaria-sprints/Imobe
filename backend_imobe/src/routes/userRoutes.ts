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

const userRoutes = Router();

const uploadImage = multer(uploadImageConfig);

const createUserAuthenticateController = new CreateUserAuthenticateController();
const createUserController = new CreateUserController();
const refreshTokenController = new RefreshTokenController();
const returnUserAuthenticatedController =
  new ReturnUserAuthenticatedController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

userRoutes.post(
  "/users",
  uploadImage.single("avatar"),
  createUserController.handle
);
userRoutes.post("/login", createUserAuthenticateController.handle);

userRoutes.post("/auth/forgot_password", forgotPasswordController.handle);

userRoutes.post("/auth/reset_password", resetPasswordController.handle);

userRoutes.get(
  "/verify/user",
  ensureAuthenticated,
  returnUserAuthenticatedController.handle
);

userRoutes.post("/refresh_token", refreshTokenController.handle);

export { userRoutes };
