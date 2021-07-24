import { Router } from "express";
import CreateUserController from "./useCases/CreateUserUseCase/CreateUserController";
import CreateUserAuthenticateController from "./useCases/CreateUserAuthenticated/CreateUserAuthenticateController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import CreateAdsController from "./useCases/CreateAdsUseCase/CreateAdsController";

const router = Router();

router.post("/users", CreateUserController.handle);
router.post("/login", CreateUserAuthenticateController.handle);
router.post("/ads", ensureAuthenticated, CreateAdsController.handle);
router.get("/dashboard", ensureAuthenticated, (request, response) => {
  return response.json({ hello: "world" });
});

export { router };
