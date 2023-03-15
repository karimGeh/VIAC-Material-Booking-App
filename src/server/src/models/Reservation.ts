import mongoose, { ObjectId } from "mongoose";
import { ModelsNames } from "./_modelsNames";
import { MaterialDoc } from "./Material";
import { UserDoc } from "./User";
import { ReservationStatus } from "../enums/ReservationStatus";
export interface ReservationAttrs {
  author: ObjectId | UserDoc;

  material: ObjectId | MaterialDoc;
  owner: ObjectId | UserDoc;

  status: ReservationStatus;
  // dates
  startDate: Date;
  endDate: Date;

  returnedAt?: Date;
  cancelledAt?: Date;
  expiredAt?: Date;
}

export interface ReservationDoc extends mongoose.Document, ReservationAttrs {
  createdAt: Date;
  updatedAt: Date;
}

export const ReservationSchema = new mongoose.Schema<ReservationDoc>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelsNames.User,
      required: true,
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelsNames.Material,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelsNames.User,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ReservationStatus,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    returnedAt: {
      type: Date,
      required: true,
    },
    cancelledAt: {
      type: Date,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
export interface ReservationModel extends mongoose.Model<ReservationDoc> {
  build(attrs: ReservationAttrs): ReservationDoc;
}

ReservationSchema.statics.build = (attrs: ReservationAttrs) => {
  return new Reservation(attrs);
};
export const Reservation = mongoose.model<ReservationDoc, ReservationModel>(
  ModelsNames.Reservation,
  ReservationSchema
);
