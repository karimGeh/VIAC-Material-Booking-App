import mongoose from "mongoose";
import { ModelsNames } from "./_modelsNames";
import { MaterialDoc } from "./Material";

export interface TagAttrs {
  macAddress: string;
  material: MaterialDoc | mongoose.Types.ObjectId;
}

export interface TagDoc extends mongoose.Document, TagAttrs {
  createdAt: Date;
  updatedAt: Date;

  isAvailable(startDate: Date, endDate: Date): Promise<boolean>;
}

export const TagSchema = new mongoose.Schema<TagDoc>(
  {
    macAddress: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelsNames.Material,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        // delete ret._id;
        delete ret.__v;
      },
    },
  }
);
export interface TagModel extends mongoose.Model<TagDoc> {
  build(attrs: TagAttrs): TagDoc;
}

TagSchema.statics.build = (attrs: TagAttrs) => {
  return new Tag(attrs);
};

export const Tag = mongoose.model<TagDoc, TagModel>(ModelsNames.Tag, TagSchema);
