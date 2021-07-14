import { Router } from "express";
import CreateUserController from "../useCases/CreateUserUseCase/CreateUserController";

const router = Router();

router.post("/users", CreateUserController.create);

export { router };
