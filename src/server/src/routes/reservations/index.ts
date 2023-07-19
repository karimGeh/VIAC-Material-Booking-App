import { Router } from "express";
import {
  getMaterialById,
  getReservationById,
  getUserById,
} from "../../middlewares/find-by-id";
import {
  createReservation,
  getReservationsByMaterial,
  getReservationsByUser,
} from "../../handlers/reservations/reservations.handlers";
import { createReservationValidator } from "../../handlers/reservations/reservations.validators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.param("reservationId", getReservationById);
router.param("userId", getUserById);
router.param("materialId", getMaterialById);

router.get("/", getReservationsByUser);
router.get("/reservation-by-id/:reservationId");
router.get("/materials/:materialId", getReservationsByMaterial);

router.post(
  "/create-reservation/:materialId",
  createReservationValidator,
  validateRequest,
  createReservation
);
router.post("/cancel-reservation");
router.post("/update-reservation");

export { router as reservationsRouter };
