import { Router } from "express";
import { user } from "./routes/user.routes";
import { announcement } from "./routes/announcement.routes";
import { dashboard } from "./routes/dashboard.routes";
import { authenticated } from "./routes/authenticated.routes";

const router = Router();

router.use("/users", user);
router.use("/announcement", announcement);
router.use("/dashboard", dashboard);
router.use("/auth", authenticated);

export { router };
