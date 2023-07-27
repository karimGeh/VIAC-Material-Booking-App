import { RequestHandler } from "express";
import { Reservation, UserDoc } from "../../models";
import { ReservationStatus } from "../../enums/ReservationStatus";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { MaterialState } from "../../enums/MaterialState";
import { BadRequestError } from "../../errors/bad-request-error";

export const createReservation: RequestHandler = async (req, res) => {
  const { startDate, endDate } = req.body;

  // check if material exists
  const material = req.q_material;
  const user = req.q_authUser;

  const reservation = Reservation.build({
    material: material,
    owner: user._id,
    startDate,
    endDate,
    author: user._id,
    status: ReservationStatus.pending,
  });

  await reservation.save();

  res.status(201).send({
    success: true,
    reservation,
  });
};

export const getReservation: RequestHandler = async (req, res) => {
  const reservation = req.q_reservation;
  res.send({
    success: true,
    reservation,
  });
};

export const getReservationsByUser: RequestHandler = async (req, res) => {
  const authUser = req.q_authUser;

  const reservations = await Reservation.find({
    $or: [{ owner: authUser._id }, { author: authUser._id }],
    status: { $in: [ReservationStatus.pending, ReservationStatus.active] },
  }).populate([
    "material",
    "author",
    "owner",
    { path: "material", populate: "type" },
  ]);

  res.send({
    success: true,
    reservations,
  });
};

export const cancelReservation: RequestHandler = async (req, res) => {
  const reservation = req.q_reservation;
  reservation.status = ReservationStatus.cancelled;
  reservation.cancelledAt = new Date();
  await reservation.save();
  res.send({
    success: true,
    reservation,
  });
};

export const pickupMaterial: RequestHandler = async (req, res) => {
  const auth_user = req.q_authUser;
  const reservation = req.q_reservation;

  const material = req.q_material;

  if (
    (reservation.author as UserDoc)._id.toString() !== auth_user._id.toString()
  ) {
    throw new NotAuthorizedError(
      "You are not authorized to pickup this material"
    );
  }

  if (reservation.status !== ReservationStatus.pending) {
    throw new BadRequestError("Material is not ready for pickup");
  }

  if (material.state !== MaterialState.available) {
    throw new BadRequestError("Material is not available");
  }

  if (
    reservation.startDate.getTime() - Date.now() > 10 * 60 * 1000 ||
    reservation.endDate.getTime() - Date.now() < 10 * 60 * 1000
  ) {
    throw new BadRequestError("Material is not available for pickup");
  }

  reservation.status = ReservationStatus.active;
  material.state = MaterialState.inUse;

  await reservation.save();
  await material.save();

  return res.send({
    success: true,
    reservation,
  });
};

export const returnMaterial: RequestHandler = async (req, res) => {
  const reservation = req.q_reservation;
  reservation.status = ReservationStatus.returned;
  reservation.returnedAt = new Date();

  const material = req.q_material;
  material.state = MaterialState.available;

  // Todo: integrate localization system

  await material.save();
  await reservation.save();

  res.send({
    success: true,
    reservation,
  });
};

export const getReservationsByMaterial: RequestHandler = async (req, res) => {
  const material = req.q_material;
  const reservations = await Reservation.find({
    material: material._id,
    status: {
      $in: [
        ReservationStatus.pending,
        ReservationStatus.active,
        ReservationStatus.returned,
      ],
    },
  }).populate([
    "material",
    "author",
    "owner",
    { path: "material", populate: "type" },
  ]);

  res.send({
    success: true,
    reservations,
  });
};
