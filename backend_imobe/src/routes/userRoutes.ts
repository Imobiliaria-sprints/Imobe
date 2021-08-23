import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateUserAuthenticateController from "../useCases/CreateUserAuthenticated/CreateUserAuthenticateController";
import CreateUserController from "../useCases/CreateUserUseCase/CreateUserController";
import { validationUser } from "../useCases/CreateUserUseCase/validationUser";
import RefreshTokenController from "../useCases/RefreshTokenUserUseCase/RefreshTokenController";
import ReturnUserAuthenticatedController from "../useCases/ReturnUserAuthenticatedUseCase/ReturnUserAuthenticatedController";
import uploadImageConfig from "../config/uploadImageConfig";
import multer from "multer";

const userRoutes = Router();

const uploadImage = multer(uploadImageConfig);

userRoutes.post(
  "/users",
  uploadImage.single("avatar"),
  CreateUserController.handle
);
userRoutes.post("/login", CreateUserAuthenticateController.handle);

userRoutes.get(
  "/verify/user",
  ensureAuthenticated,
  ReturnUserAuthenticatedController.handle
);

userRoutes.post("/refresh_token", RefreshTokenController.handle);

export { userRoutes };
