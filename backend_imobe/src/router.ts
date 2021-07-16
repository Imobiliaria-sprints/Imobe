import { Router } from "express";
import CreateUserController from "./useCases/CreateUserUseCase/CreateUserController";
import CreateUserAuthenticateController from "./useCases/CreateUserAuthenticated/CreateUserAuthenticateController";
import { ensureAuthentited } from "./middlewares/ensureAuthenticad";
const router = Router();

router.post("/users", CreateUserController.handle);
router.post("/login", CreateUserAuthenticateController.handle);
router.get("/dashboard", ensureAuthentited, (request, response) => {
  return response.json({ hello: "world" });
});
export { router };
