import { Router } from "express";
import { CreateUserAuthenticateController } from "@modules/imobeAuth/useCases/CreateUserAuthenticated/CreateUserAuthenticateController";
import { ForgotPasswordController } from "@modules/imobeAuth/useCases/ForgotPasswordUseCase/ForgotPasswordController";
import { RefreshTokenController } from "@modules/imobeAuth/useCases/RefreshTokenUserUseCase/RefreshTokenController";
import { ResetPasswordController } from "@modules/imobeAuth/useCases/ResetPasswordUseCase/ResetPasswordController";

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
