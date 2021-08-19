import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateAddressController from "../useCases/CreateAddressUseCase/CreateAddressController";
import { validationAddress } from "../useCases/CreateAddressUseCase/validationAddress";
import CreateAdsController from "../useCases/CreateAdsUseCase/CreateAdsController";
import { validationAds } from "../useCases/CreateAdsUseCase/validationAds";

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
