import { body } from "express-validator";
import { MaterialCategory } from "../../models";

export const createMaterialCategoryValidator = [
  body("name")
    .exists()
    .isString()
    .withMessage("Name of material category must be provided")
    .custom(async (name) => {
      // case insensitive
      const materialCategory = await MaterialCategory.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
      });
      if (materialCategory) {
        throw new Error("Material category with this name already exists");
      }
      return true;
    }),
];

export const updateMaterialCategoryValidator = [
  body("name")
    .exists()
    .isString()
    .withMessage("Name of material category must be provided"),
  body("name").custom(async (name, { req }) => {
    const materialCategory = await MaterialCategory.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      _id: { $ne: req.q_materialCategory._id },
    });
    if (materialCategory) {
      throw new Error("Material category with this name already exists");
    }
    return true;
  }),
];
