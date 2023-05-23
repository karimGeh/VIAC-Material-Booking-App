import { Router } from "express";
import { createMaterialValidator } from "../../handlers/admin/materials.validators";
import { validateRequest } from "../../middlewares/validate-request";
import { createMaterial } from "../../handlers/admin/materials.handlers";

const router = Router();

router.post("/", createMaterialValidator, validateRequest, createMaterial);

export { router as adminMaterialsRouter };
