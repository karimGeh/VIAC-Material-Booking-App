import { Router } from "express";
import {
  acceptUser,
  getAllUsers,
  getUser,
  resetPassword,
  updateUser,
} from "../../handlers/admin/users.handlers";
import paramHandlers from "../../paramHandlers";

const router = Router();

router.param("userId", paramHandlers.getUser);

router.get("/get-all", getAllUsers);
router.get("/get-by-id/:userId", getUser);

router.post("/accept-user/:userId", acceptUser);
router.post("/reset-password/:userId", resetPassword);

router.put("/:userId", updateUser);

export { router as adminUsersRouter };
