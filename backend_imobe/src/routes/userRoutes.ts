import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import CreateUserAuthenticateController from "@cases/CreateUserAuthenticated/CreateUserAuthenticateController";
import CreateUserController from "@cases/CreateUserUseCase/CreateUserController";
import { validationUser } from "@cases/CreateUserUseCase/validationUser";
import RefreshTokenController from "@cases/RefreshTokenUserUseCase/RefreshTokenController";
import ReturnUserAuthenticatedController from "@cases/ReturnUserAuthenticatedUseCase/ReturnUserAuthenticatedController";
import uploadImageConfig from "@config/uploadImageConfig";
import multer from "multer";
import ForgotPasswordController from "@cases/ForgotPasswordUseCase/ForgotPasswordController";
import ResetPasswordController from "@cases/ResetPasswordUseCase/ResetPasswordController";

const userRoutes = Router();

const uploadImage = multer(uploadImageConfig);

userRoutes.post(
  "/users",
  uploadImage.single("avatar"),
  CreateUserController.handle
);
userRoutes.post("/login", CreateUserAuthenticateController.handle);

userRoutes.post("/auth/forgot_password", ForgotPasswordController.handle);

userRoutes.post("/auth/reset_password", ResetPasswordController.handle);

userRoutes.get(
  "/verify/user",
  ensureAuthenticated,
  ReturnUserAuthenticatedController.handle
);

userRoutes.post("/refresh_token", RefreshTokenController.handle);

export { userRoutes };
