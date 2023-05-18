import { RequestHandler } from "express";
import { Material } from "../../models";

export const getMaterials: RequestHandler = async (req, res) => {
  const materials = await Material.find();
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

export const createMaterial: RequestHandler = async (req, res) => {
  const { type, ref, state, barcode } = req.body;
  const material = Material.build({
    type,
    ref,
    state,
    barcode,
  });
  await material.save();
  res.send({
    success: true,
    material,
  });
};

export const updateMaterial: RequestHandler = async (req, res) => {
  const material = req.q_material;
  const { type, state, barcode } = req.body;
  material.type = type;
  material.state = state;
  material.barcode = barcode;
  await material.save();
  res.send({
    success: true,
    material,
  });
};

export const deleteMaterial: RequestHandler = async (req, res) => {
  const material = req.q_material;
  await Material.findByIdAndDelete(material.id);
  res.send({
    success: true,
    material,
  });
};
