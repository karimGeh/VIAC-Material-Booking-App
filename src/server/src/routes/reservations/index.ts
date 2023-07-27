import { Router } from "express";
import {
  getMaterialById,
  getReservationById,
  getUserById,
} from "../../middlewares/find-by-id";
import {
  cancelReservation,
  createReservation,
  getReservationsByMaterial,
  getReservationsByUser,
  pickupMaterial,
  returnMaterial,
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
router.post("/pickup-material/:reservationId", pickupMaterial);
router.post("/return-material/:reservationId", returnMaterial);
router.post("/cancel-reservation/:reservationId", cancelReservation);
router.post("/update-reservation/:reservationId");

export { router as reservationsRouter };
