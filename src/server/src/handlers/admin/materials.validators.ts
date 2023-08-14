import { body } from "express-validator";
import { Material, MaterialCategory } from "../../models";
import { MaterialState } from "../../enums/MaterialState";

export const createMaterialValidator = [
  body("type")
    .exists()
    .withMessage("Type is required")
    .custom(async (value) => {
      try {
        const materialCategory = await MaterialCategory.findById(value);
        if (!materialCategory) {
          throw new Error("Material type not valid");
        }
        return true;
      } catch (error) {
        throw new Error("Material type not valid");
      }
    }),
  body("ref")
    .exists()
    .withMessage("Ref is required")
    .custom(async (value) => {
      const material = await Material.findOne({ ref: value });
      if (material) {
        throw new Error("Ref already exists");
      }
      return true;
    }),
  body("state")
    .exists()
    .withMessage("State is required")
    .custom(async (value) => {
      if (!Object.values(MaterialState).includes(value)) {
        throw new Error("State not valid");
      }
      return true;
    }),
  body("barcode")
    .exists()
    .isString()
    .withMessage("Barcode is required")
    .custom(async (value) => {
      const material = await Material.findOne({ barcode: value });
      if (material) {
        throw new Error("barcode already exists");
      }
      return true;
    }),
];

export const updateMaterialValidator = [
  body("type")
    .exists()
    .withMessage("Type is required")
    .custom(async (value) => {
      try {
        const materialCategory = await MaterialCategory.findById(value);
        if (!materialCategory) {
          throw new Error("Material type not valid");
        }
        return true;
      } catch (error) {
        throw new Error("Material type not valid");
      }
    }),
  body("ref").custom(async (value, { req }) => {
    const material = await Material.findOne({
      ref: value,
      _id: { $ne: req.q_material._id },
    });
    if (material) {
      throw new Error("Ref already exists");
    }
    return true;
  }),
  body("state")
    .exists()
    .withMessage("State is required")
    .custom(async (value) => {
      if (!Object.values(MaterialState).includes(value)) {
        throw new Error("State not valid");
      }
      return true;
    }),
  body("barcode")
    .exists()
    .isString()
    .withMessage("Barcode is required")
    .custom(async (value, { req }) => {
      const material = await Material.findOne({
        barcode: value,
        _id: { $ne: req.q_material._id },
      });
      if (material) {
        throw new Error("barcode already exists");
      }
      return true;
    }),
];
