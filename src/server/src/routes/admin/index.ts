import { Router } from "express";
import { adminUsersRouter } from "./users";
import { adminMaterialsRouter } from "./materials";
import { adminMaterialCategoriesRouter } from "./materialCategory";
import { adminReservationsRouter } from "./reservations";

const router = Router();

router.use("/users", adminUsersRouter);
router.use("/materials", adminMaterialsRouter);
router.use("/material-categories", adminMaterialCategoriesRouter);
router.use("/reservations", adminReservationsRouter);

export { router as adminRouter };
