import mongoose, { ObjectId } from "mongoose";
import { MaterialState } from "../enums/MaterialState";
import { MaterialCategoryDoc } from "./MaterialCategory";
import { ModelsNames } from "./_modelsNames";
import { Reservation } from "./Reservation";
import { ReservationStatus } from "../enums/ReservationStatus";
export interface MaterialAttrs {
  type: MaterialCategoryDoc;
  ref: string;
  state: MaterialState;
  barcode: string;
}

export interface MaterialDoc extends mongoose.Document, MaterialAttrs {
  compatibleWith: MaterialCategoryDoc[] | ObjectId[];
  // refCompatibleWithMe: MaterialDoc[] | ObjectId[] | string[];
  // refIamCompatibleWith: MaterialDoc[] | ObjectId[] | string[];

  createdAt: Date;
  updatedAt: Date;

  isAvailable(startDate: Date, endDate: Date): Promise<boolean>;
}

export const MaterialSchema = new mongoose.Schema<MaterialDoc>(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelsNames.MaterialCategory,
      required: true,
    },
    ref: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
      enum: MaterialState,
    },
    barcode: {
      type: String,
      required: true,
      unique: true,
    },
    // macAddress: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    compatibleWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelsNames.MaterialCategory,
      },
    ],
    // refCompatibleWithMe: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: ModelsNames.Material,
    //   },
    // ],
    // refIamCompatibleWith: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: ModelsNames.Material,
    //   },
    // ],
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
export interface MaterialModel extends mongoose.Model<MaterialDoc> {
  build(attrs: MaterialAttrs): MaterialDoc;
}

MaterialSchema.statics.build = (attrs: MaterialAttrs) => {
  return new Material(attrs);
};

MaterialSchema.methods.isAvailable = async function (
  startDate: Date,
  endDate: Date
) {
  const material = this as MaterialDoc;

  const reservation = await Reservation.findOne({
    material: material._id,
    $or: [
      { startDate: { $gte: startDate, $lte: endDate } },
      { endDate: { $gte: startDate, $lte: endDate } },
    ],
    status: { $in: [ReservationStatus.pending, ReservationStatus.active] },
  });
  console.log({ material, reservation });
  return !reservation;
};

export const Material = mongoose.model<MaterialDoc, MaterialModel>(
  ModelsNames.Material,
  MaterialSchema
);
