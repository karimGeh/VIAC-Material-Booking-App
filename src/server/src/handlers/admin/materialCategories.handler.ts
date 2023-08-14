import { RequestHandler } from "express";
import { Material, MaterialCategory } from "../../models";
import { BadRequestError } from "../../errors/bad-request-error";

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

export const getAllMaterialCategories: RequestHandler = async (req, res) => {
  const materialCategories = await MaterialCategory.find({});

  res.status(200).send({
    success: true,
    materialCategories,
  });
};

export const getMaterialCategory: RequestHandler = async (req, res) => {
  const materialCategory = req.q_materialCategory;

  res.status(200).send({
    success: true,
    materialCategory,
  });
};

export const updateMaterialCategory: RequestHandler = async (req, res) => {
  const materialCategory = req.q_materialCategory;

  materialCategory.name = req.body.name;
  await materialCategory.save();

  res.status(200).send({
    success: true,
    materialCategory,
  });
};

export const deleteMaterialCategory: RequestHandler = async (req, res) => {
  const materialCategory = req.q_materialCategory;

  const materialsWithCategory = await Material.findOne({
    type: materialCategory._id,
  });

  if (materialsWithCategory) {
    throw new BadRequestError(
      "Can't delete this category, there are materials with this category"
    );
  }

  await MaterialCategory.findByIdAndDelete(materialCategory._id);

  res.status(200).send({
    success: true,
    materialCategory,
  });
};
