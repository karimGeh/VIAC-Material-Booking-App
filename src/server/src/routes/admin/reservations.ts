import { Router } from "express";
import {
  deleteReservation,
  getAllReservations,
  getReservation,
  updateReservation,
} from "../../handlers/admin/reservation.handlers";
import { getReservationById } from "../../middlewares/find-by-id";

const router = Router();

router.param("reservationId", getReservationById);

router.get("/", getAllReservations);
router.get("/:reservationId", getReservation);

router.put("/:reservationId", updateReservation);

router.delete("/:reservationId", deleteReservation);

export { router as adminReservationsRouter };
