import { body } from "express-validator";
import { MaterialCategory } from "../../models";

export const createMaterialCategoryValidator = [
  body("name")
    .exists()
    .isString()
    .withMessage("Name of material category must be provided")
    .custom(async (name) => {
      const materialCategory = await MaterialCategory.findOne({ name });
      if (materialCategory) {
        throw new Error("Material category with this name already exists");
      }
      return true;
    }),
];
