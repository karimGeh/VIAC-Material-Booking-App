import mongoose from "mongoose";
import { ModelsNames } from "./_modelsNames";
export interface MaterialCategoryAttrs {
  name: string;
}
export interface MaterialCategoryDoc
  extends mongoose.Document,
    MaterialCategoryAttrs {
  createdAt: Date;
  updatedAt: Date;
}

export const MaterialCategorySchema = new mongoose.Schema<MaterialCategoryDoc>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
export interface MaterialCategoryModel
  extends mongoose.Model<MaterialCategoryDoc> {
  build(attrs: MaterialCategoryAttrs): MaterialCategoryDoc;
}

MaterialCategorySchema.statics.build = (attrs: MaterialCategoryAttrs) => {
  return new MaterialCategory(attrs);
};
export const MaterialCategory = mongoose.model<
  MaterialCategoryDoc,
  MaterialCategoryModel
>(ModelsNames.MaterialCategory, MaterialCategorySchema);
