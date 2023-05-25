import { RequestHandler } from "express";
import { Reservation } from "../../models";
import { ReservationStatus } from "../../enums/ReservationStatus";

export const createReservation: RequestHandler = async (req, res) => {
  const { startDate, endDate } = req.body;

  // check if material exists
  const material = req.q_material;
  const user = req.q_authUser;

  const reservation = Reservation.build({
    material: material._id,
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

export const returnMaterial: RequestHandler = async (req, res) => {
  const reservation = req.q_reservation;
  reservation.status = ReservationStatus.returned;
  reservation.returnedAt = new Date();
  await reservation.save();
  res.send({
    success: true,
    reservation,
  });
};
