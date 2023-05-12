import { Router } from "express";
import { acceptUser } from "../../handlers/admin/users.handlers";
import paramHandlers from "../../paramHandlers";

const router = Router();

router.param("userId", paramHandlers.getUser);

router.post("/accept-user/:userId", acceptUser);

export { router as adminUsersRouter };
