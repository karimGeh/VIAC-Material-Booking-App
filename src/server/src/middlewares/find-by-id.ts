import { RequestParamHandler } from "express";
import { NotFoundError } from "../errors/not-found-error";
import {
  Material,
  MaterialCategory,
  MaterialDoc,
  Reservation,
  User,
} from "../models";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../errors/bad-request-error";

export const getMaterialById: RequestParamHandler = async (
  req,
  __,
  next,
  id: string
) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const material = await Material.findById(id).populate([
    "type",
    "compatibleWith",
  ]);
  req.q_material = material;
  return material ? next() : next(new NotFoundError());
};

export const getMaterialCategoryById: RequestParamHandler = async (
  req,
  __,
  next,
  id: string
) => {
  // validate id
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const materialCategory = await MaterialCategory.findById(id);
  req.q_materialCategory = materialCategory;
  return materialCategory ? next() : next(new NotFoundError());
};

export const getReservationById: RequestParamHandler = async (
  req,
  __,
  next,
  id: string
) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const reservation = await Reservation.findById(id).populate([
    "author",
    "owner",
    {
      path: "material",
      populate: ["type", "compatibleWith"],
    },
  ]);
  req.q_reservation = reservation;
  req.q_material = reservation.material as MaterialDoc;
  return reservation ? next() : next(new NotFoundError());
};

export const getUserById: RequestParamHandler = async (
  req,
  __,
  next,
  id: string
) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const user = await User.findById(id);
  req.q_user = user;
  return user ? next() : next(new NotFoundError());
};
