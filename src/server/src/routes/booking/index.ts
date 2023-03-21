import { Router } from "express";
import {
  getMaterialById,
  getReservationById,
  getUserById,
} from "../../middlewares/find-by-id";

const router = Router();

router.param("reservationId", getReservationById);
router.param("userId", getUserById);
router.param("materialId", getMaterialById);

router.get("/reservation-by-id/:reservationId");
router.get("/reservation-by-user-id/:userId");
router.get("/reservation-by-material-id/:materialId");

router.post("/create-reservation");
router.post("/cancel-reservation");
router.post("/update-reservation");

export { router as bookingRouter };
