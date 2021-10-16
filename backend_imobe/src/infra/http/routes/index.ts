import { Router } from "express";
import { user } from "./user.routes";
import { announcement } from "./announcement.routes";
import { dashboard } from "./dashboard.routes";
import { authenticated } from "./authenticated.routes";

const router = Router();

router.use("/users", user);
router.use("/announcement", announcement);
router.use("/dashboard", dashboard);
router.use("/auth", authenticated);

export { router };
