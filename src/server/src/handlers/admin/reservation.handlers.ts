import { RequestHandler } from "express";
import { Reservation } from "../../models";
import { ReservationStatus } from "../../enums/ReservationStatus";

export const getNoneReturnedMaterial: RequestHandler = async (req, res) => {
  const reservations = await Reservation.find({
    status: ReservationStatus.active,
  }).populate(["author", "material", "owner"]);
  res.send({
    success: true,
    reservations,
  });
};

export const getNoneReturnedMaterialByUser: RequestHandler = async (
  req,
  res
) => {
  const authUser = req.q_authUser;
  const reservations = await Reservation.find({
    $or: [{ owner: authUser._id }, { author: authUser._id }],
    status: ReservationStatus.active,
  }).populate(["material", "user", "owner"]);
  res.send({
    success: true,
    reservations,
  });
};

export const getAllReservations: RequestHandler = async (req, res) => {
  const { pageSize = 10, pageNumber = 1 } = req.query;

  const numberOfReservations = await Reservation.countDocuments({});

  const reservations = await Reservation.find({})
    // sort by newest to oldest
    .sort({
      createdAt: -1,
    })
    .populate([
      "author",
      "owner",
      {
        path: "material",
        populate: ["type", "compatibleWith"],
      },
    ])
    .limit(Number(pageSize))
    .skip(Number(pageSize) * (Number(pageNumber) - 1));

  res.send({
    success: true,
    reservations,
    numberOfReservations,
  });
};

export const getReservation: RequestHandler = async (req, res) => {
  const reservation = req.q_reservation;
  res.send({
    success: true,
    reservation,
  });
};

export const deleteReservation: RequestHandler = async (req, res) => {
  const reservation = req.q_reservation;
  await Reservation.deleteOne({ _id: reservation._id });
  res.send({
    success: true,
    reservation,
  });
};

export const updateReservation: RequestHandler = async (req, res) => {
  const reservation = req.q_reservation;
  const {
    startDate,
    endDate,
    author,
    material,
    owner,
    status,
    cancelledAt,
    returnedAt,
  } = req.body;

  reservation.startDate = startDate;
  reservation.endDate = endDate;
  reservation.author = author;
  reservation.material = material;
  reservation.owner = owner;
  reservation.status = status;
  reservation.cancelledAt = cancelledAt;
  reservation.returnedAt = returnedAt;

  await reservation.save();
  res.send({
    success: true,
    reservation,
  });
};
