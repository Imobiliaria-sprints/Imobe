import { Router } from "express";
import { CreateUserAuthenticateController } from "@cases/CreateUserAuthenticated/CreateUserAuthenticateController";
import { ForgotPasswordController } from "@cases/ForgotPasswordUseCase/ForgotPasswordController";
import { RefreshTokenController } from "@cases/RefreshTokenUserUseCase/RefreshTokenController";
import { ResetPasswordController } from "@cases/ResetPasswordUseCase/ResetPasswordController";

const createUserAuthenticateController = new CreateUserAuthenticateController();
const refreshTokenController = new RefreshTokenController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const authenticated = Router();

authenticated.post("/session", createUserAuthenticateController.handle);
authenticated.post("/refresh_token", refreshTokenController.handle);
authenticated.post("/forgot_password", forgotPasswordController.handle);
authenticated.post("/reset_password", resetPasswordController.handle);

export { authenticated };
