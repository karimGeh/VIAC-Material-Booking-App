import { RequestHandler } from "express";
import { Material, Reservation } from "../../models";
import { NotFoundError } from "../../errors/not-found-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { ReservationStatus } from "../../enums/ReservationStatus";

export const createReservation: RequestHandler = async (req, res) => {
  const { materialId, userId, startDate, endDate } = req.body;

  // check if material exists
  const material = await Material.findById(materialId);
  if (!material) {
    throw new NotFoundError("Material not found");
  }

  // check if material is available
  const isAvailable = await material.isAvailable(
    new Date(startDate),
    new Date(endDate)
  );
  if (!isAvailable) {
    throw new BadRequestError("Material is not available");
  }
  // check if user is allowed to book

  const reservation = Reservation.build({
    material: materialId,
    owner: userId,
    startDate,
    endDate,
    author: userId,
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
  }).populate(["material", "user", "owner"]);
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
