import { Router } from "express";
import { adminUsersRouter } from "./users";
import { adminMaterialsRouter } from "./materials";
import { adminMaterialCategoriesRouter } from "./materialCategory";

const router = Router();

router.use("/users", adminUsersRouter);
router.use("/materials", adminMaterialsRouter);
router.use("/material-categories", adminMaterialCategoriesRouter);

export { router as adminRouter };
