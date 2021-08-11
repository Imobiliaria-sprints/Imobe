import { Router } from "express";
import CreateUserController from "./useCases/CreateUserUseCase/CreateUserController";
import CreateUserAuthenticateController from "./useCases/CreateUserAuthenticated/CreateUserAuthenticateController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import CreateAdsController from "./useCases/CreateAdsUseCase/CreateAdsController";
import ListAdsController from "./useCases/ListAdsUserUseCase/ListAdsController";
import { validationUser } from "./useCases/CreateUserUseCase/validationUser";
import { validationAds } from "./useCases/CreateAdsUseCase/validationAds";
import CreateAddressController from "./useCases/CreateAddressUseCase/CreateAddressController";

const router = Router();

router.post("/users", validationUser, CreateUserController.handle);
router.post("/login", CreateUserAuthenticateController.handle);
router.post(
  "/ads",
  ensureAuthenticated,
  validationAds,
  CreateAdsController.handle
);
router.post("/address/:ads_id", CreateAddressController.handle);
router.get("/dashboard", ensureAuthenticated, ListAdsController.handle);

export { router };
