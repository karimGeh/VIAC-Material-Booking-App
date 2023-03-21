import { Router } from "express";

const router = Router();

router.get("/types");
router.get("/material-by-id/:id");
router.get("/material-by-type-id/:materialTypeId");

export { router as materialRouter };
