import mongoose, { ObjectId } from "mongoose";
import { ModelsNames } from "./_modelsNames";
import { PinTypes } from "../enums/PinTypes";
import jwt from "jsonwebtoken";
import { UserDoc } from "./User";

export interface PinAttrs {
  code: string;
  type: PinTypes;
  access: UserDoc[] | ObjectId[];
  expiresAt: Date;
}
export interface PinDoc extends mongoose.Document, PinAttrs {
  createdAt: Date;
  updatedAt: Date;

  generatePinToken(): string;
}

export const PinSchema = new mongoose.Schema<PinDoc>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: PinTypes,
    },
    access: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelsNames.User,
      },
    ],
    expiresAt: {
      type: Date,
      index: true,
      unique: 1,
      expires: 0,
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

export interface PinModel extends mongoose.Model<PinDoc> {
  generateNewCode(length: number): Promise<string>;
  verifyPinToken(token: string): Promise<PinDoc | null>;
  build(attrs: PinAttrs): PinDoc;
}

PinSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

PinSchema.statics.build = (attrs: PinAttrs) => {
  return new Pin(attrs);
};

PinSchema.statics.generateNewCode = async function (
  length: number
): Promise<string> {
  let pin = Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, "0")
    .slice(0, length);
  let doesExist = await this.findOne({ code: pin });
  while (doesExist) {
    pin = Math.floor(Math.random() * 10 ** length)
      .toString()
      .padStart(length, "0")
      .slice(0, length);

    doesExist = await this.findOne({ code: pin });
  }
  return pin;
};

PinSchema.statics.verifyPinToken = async function (
  token: string
): Promise<PinDoc | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PIN_SECRET!);
    if (!decoded) {
      return null;
    }
    return decoded as PinDoc;
  } catch (error) {
    return null;
  }
};

PinSchema.methods.generatePinToken = function () {
  const token = jwt.sign(this.toJSON(), process.env.JWT_PIN_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};

export const Pin = mongoose.model<PinDoc, PinModel>(ModelsNames.Pin, PinSchema);
