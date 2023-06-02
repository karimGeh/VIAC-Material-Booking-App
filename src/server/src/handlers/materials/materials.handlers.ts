import { RequestHandler } from "express";
import { Material } from "../../models";

export const getMaterials: RequestHandler = async (req, res) => {
  const materials = await Material.find().populate(["type"]);
  res.send({
    success: true,
    materials,
  });
};

export const getMaterial: RequestHandler = async (req, res) => {
  const material = req.q_material;
  res.send({
    success: true,
    material,
  });
};
