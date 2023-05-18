import { body } from "express-validator";
import { Material, MaterialCategory } from "../../models";
import { MaterialState } from "../../enums/MaterialState";

export const createMaterialValidator = [
  body("type")
    .exists()
    .withMessage("type is required")
    .custom(async (value) => {
      const materialCategory = await MaterialCategory.findById(value);
      if (!materialCategory) {
        throw new Error("material type not valid");
      }
      return true;
    }),
  body("ref")
    .exists()
    .withMessage("ref is required")
    .custom(async (value) => {
      const material = await Material.findOne({ ref: value });
      if (material) {
        throw new Error("ref already exists");
      }
      return true;
    }),
  body("state")
    .exists()
    .withMessage("state is required")
    .custom(async (value) => {
      if (!Object.values(MaterialState).includes(value)) {
        throw new Error("state not valid");
      }
      return true;
    }),
  body("barcode")
    .exists()
    .isString()
    .withMessage("barcode is required")
    .custom(async (value) => {
      const material = await Material.findOne({ barcode: value });
      if (material) {
        throw new Error("barcode already exists");
      }
      return true;
    }),
];
