import { Router } from "express";
import CreateUserController from "./useCases/CreateUserUseCase/CreateUserController";
import CreateUserAuthenticateController from "./useCases/CreateUserAuthenticated/CreateUserAuthenticateController";
const router = Router();

router.post("/users", CreateUserController.create);
router.post("/login", CreateUserAuthenticateController.handle);

export { router };
