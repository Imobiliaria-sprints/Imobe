import { Router } from "express";
import { user } from "./routes/user.routes";
import { announcement } from "./routes/announcement.routes";
import { dashboard } from "./routes/dashboard.routes";

const router = Router();

router.use("/users", user);
router.use("/announcements", announcement);
router.use("/dashboard", dashboard);

export { router };
