import { Router } from "express";
import {
  getMaterial,
  getMaterials,
} from "../../handlers/materials/materials.handlers";
import { getMaterialById } from "../../middlewares/find-by-id";

const router = Router();

router.param("materialId", getMaterialById);

router.get("/", getMaterials);
router.get("/:materialId", getMaterial);

export { router as materialRouter };
