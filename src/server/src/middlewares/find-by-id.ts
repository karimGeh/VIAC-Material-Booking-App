import { RequestParamHandler } from "express";
import { NotFoundError } from "../errors/not-found-error";
import { Material, MaterialCategory, Reservation, User } from "../models";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../errors/bad-request-error";

export const getMaterialById: RequestParamHandler = async (
  _,
  __,
  next,
  id: string
) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const material = await Material.findById(id).populate("category");
  return material ? next() : next(new NotFoundError());
};

export const getMaterialCategoryById: RequestParamHandler = async (
  _,
  __,
  next,
  id: string
) => {
  // validate id
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const materialCategory = await MaterialCategory.findById(id);
  return materialCategory ? next() : next(new NotFoundError());
};

export const getReservationById: RequestParamHandler = async (
  _,
  __,
  next,
  id: string
) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const reservation = await Reservation.findById(id).populate([
    "material",
    "user",
    "owner",
  ]);
  return reservation ? next() : next(new NotFoundError());
};

export const getUserById: RequestParamHandler = async (
  _,
  __,
  next,
  id: string
) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id");
  }
  const user = await User.findById(id);
  return user ? next() : next(new NotFoundError());
};
