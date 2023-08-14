import { Router } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import {
  createMaterialCategoryValidator,
  updateMaterialCategoryValidator,
} from "../../handlers/admin/materialCategories.validators";
import {
  createMaterialCategory,
  deleteMaterialCategory,
  getAllMaterialCategories,
  getMaterialCategory,
  updateMaterialCategory,
} from "../../handlers/admin/materialCategories.handler";
import { getMaterialCategoryById } from "../../middlewares/find-by-id";

const router = Router();

router.param("materialCategoryId", getMaterialCategoryById);

router.get("/", getAllMaterialCategories);
router.get("/:materialCategoryId", getMaterialCategory);

router.put(
  "/:materialCategoryId",
  updateMaterialCategoryValidator,
  validateRequest,
  updateMaterialCategory
);

router.post(
  "/",
  createMaterialCategoryValidator,
  validateRequest,
  createMaterialCategory
);

router.delete("/:materialCategoryId", deleteMaterialCategory);

export { router as adminMaterialCategoriesRouter };
