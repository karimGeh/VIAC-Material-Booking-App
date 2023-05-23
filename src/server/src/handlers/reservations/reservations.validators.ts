import { body } from "express-validator";
import { MaterialState } from "../../enums/MaterialState";
import { MaterialDoc, Reservation } from "../../models";
import { ReservationStatus } from "../../enums/ReservationStatus";

export const createReservationValidator = [
  body("endDate").custom(async (endDate, { req }) => {
    const startDate = req.body.startDate;
    const material = req.q_material as MaterialDoc;

    // check if start date is provided and is a number
    if (!startDate || typeof startDate !== "number") {
      throw new Error("Start date must be provided");
    }

    // check if end date is provided and is a number
    if (!endDate || typeof endDate !== "number") {
      throw new Error("End date must be provided");
    }

    // check if both are in the future
    if (endDate - Date.now() < 0 || startDate - Date.now() < 0) {
      throw new Error("Start date and end date must be in the future");
    }

    // check if both are in the future but not more than 1 month
    if (endDate - Date.now() > 30 * 24 * 60 * 60 * 1000) {
      throw new Error("Cannot book more than 1 month in advance");
    }

    // check that start date is before end date
    if (endDate - startDate < 0) {
      throw new Error("End date must be after start date");
    }

    //  minimum reservation time is 30 minutes
    if (endDate - startDate < 30 * 60 * 1000) {
      throw new Error("End date must be after start date");
    }

    // maximum reservation time is 1 week
    if (endDate - startDate > 7 * 24 * 60 * 60 * 1000) {
      throw new Error("Cannot book more than 1 week at a time");
    }

    // check if user has already booked this material in the allowed time period (1 month from now)
    const hasBooked = await Reservation.findOne({
      author: req.q_authUser._id,
      material: material._id,
      endDate: { $gte: Date.now() },
      status: { $in: [ReservationStatus.active, ReservationStatus.pending] },
    });

    if (hasBooked) {
      throw new Error(
        "You already have a reservation in place for this material"
      );
    }

    // check if material is in good condition
    if (
      [
        MaterialState.broken,
        MaterialState.disabled,
        MaterialState.lost,
      ].includes(material.state)
    ) {
      throw new Error("Material is not in good condition");
    }

    // check if material is available
    const isAvailable = await material.isAvailable(
      new Date(startDate),
      new Date(endDate)
    );

    if (!isAvailable) {
      throw new Error("Material is not available for this time period");
    }

    return true;
  }),
];
