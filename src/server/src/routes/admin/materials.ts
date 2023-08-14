import { Router } from "express";
import {
  createMaterialValidator,
  updateMaterialValidator,
} from "../../handlers/admin/materials.validators";
import { validateRequest } from "../../middlewares/validate-request";
import {
  createMaterial,
  // deleteMaterial,
  getMaterial,
  getMaterials,
  updateMaterial,
} from "../../handlers/admin/materials.handlers";
import { getMaterialById } from "../../middlewares/find-by-id";

const router = Router();

router.param("materialId", getMaterialById);

router.get("/", getMaterials);

router.get("/:materialId", getMaterial);

router.post("/", createMaterialValidator, validateRequest, createMaterial);

router.put(
  "/:materialId",
  updateMaterialValidator,
  validateRequest,
  updateMaterial
);

// router.delete("/:materialId", deleteMaterial);

export { router as adminMaterialsRouter };
