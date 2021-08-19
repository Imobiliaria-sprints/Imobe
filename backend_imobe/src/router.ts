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
import RefreshTokenController from "./useCases/RefreshTokenUserUseCase/RefreshTokenController";
import { userRoutes } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";

const router = Router();

router.use(userRoutes);

router.use(postRouter);

router.get("/dashboard", ensureAuthenticated, ListAdsController.handle);

export { router };
