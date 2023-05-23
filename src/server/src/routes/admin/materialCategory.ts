import { Router } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { createMaterialCategoryValidator } from "../../handlers/admin/materialCategories.validators";
import { createMaterialCategory } from "../../handlers/admin/materialCategories.handler";

const router = Router();

router.post(
  "/",
  createMaterialCategoryValidator,
  validateRequest,
  createMaterialCategory
);

export { router as adminMaterialCategoriesRouter };
