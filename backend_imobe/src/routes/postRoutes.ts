import { Router } from "express";
import { ensureAuthenticated } from "@middle/ensureAuthenticated";
import CreateAddressController from "@cases/CreateAddressUseCase/CreateAddressController";
import { validationAddress } from "@cases/CreateAddressUseCase/validationAddress";
import CreateAdsController from "@cases/CreateAdsUseCase/CreateAdsController";
import { validationAds } from "@cases/CreateAdsUseCase/validationAds";

const postRouter = Router();

postRouter.post(
  "/ads",
  ensureAuthenticated,
  validationAds,
  CreateAdsController.handle
);
postRouter.post(
  "/ads/address/:ads_id",
  validationAddress,
  CreateAddressController.handle
);

export { postRouter };
