import { RequestHandler } from "express";
import { MaterialCategory } from "../../models";

export const createMaterialCategory: RequestHandler = async (req, res) => {
  const { name } = req.body;

  const newMaterialCategory = MaterialCategory.build({
    name,
  });
  await newMaterialCategory.save();

  res.status(201).send({
    success: true,
    materialCategory: newMaterialCategory,
  });
};
