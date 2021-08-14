import { Router } from "express";
import CreateUserController from "./useCases/CreateUserUseCase/CreateUserController";
import CreateUserAuthenticateController from "./useCases/CreateUserAuthenticated/CreateUserAuthenticateController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import CreateAdsController from "./useCases/CreateAdsUseCase/CreateAdsController";
import ListAdsController from "./useCases/ListAdsUserUseCase/ListAdsController";
import { validationUser } from "./useCases/CreateUserUseCase/validationUser";
import { validationAds } from "./useCases/CreateAdsUseCase/validationAds";
import CreateAddressController from "./useCases/CreateAddressUseCase/CreateAddressController";
import { validationAddress } from "./useCases/CreateAddressUseCase/validationAddress";
import ReturnUserAuthenticatedController from "./useCases/ReturnUserAuthenticatedUseCase/ReturnUserAuthenticatedController";

const router = Router();

router.post("/users", validationUser, CreateUserController.handle);
router.post("/login", CreateUserAuthenticateController.handle);
router.post(
  "/ads",
  ensureAuthenticated,
  validationAds,
  CreateAdsController.handle
);
router.post(
  "/ads/address/:ads_id",
  validationAddress,
  CreateAddressController.handle
);

router.get(
  "/verify/user",
  ensureAuthenticated,
  ReturnUserAuthenticatedController.handle
);

router.get("/dashboard", ensureAuthenticated, ListAdsController.handle);

export { router };
