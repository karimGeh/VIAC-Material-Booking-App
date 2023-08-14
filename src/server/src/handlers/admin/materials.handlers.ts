import { RequestHandler } from "express";
import { Material } from "../../models";

export const getMaterials: RequestHandler = async (req, res) => {
  const materials = await Material.find({}).populate([
    "compatibleWith",
    "type",
  ]);
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
  material.compatibleWith = [type];

  await material.save();

  res.send({
    success: true,
    material,
  });
};

export const updateMaterial: RequestHandler = async (req, res) => {
  const material = req.q_material;
  const { ref, type, state, barcode, compatibleWith } = req.body;
  material.type = type;
  material.ref = ref;
  material.state = state;
  material.barcode = barcode;
  material.compatibleWith = compatibleWith;
  await material.save();
  res.send({
    success: true,
    material,
  });
};

// export const deleteMaterial: RequestHandler = async (req, res) => {
//   const material = req.q_material;

//   await Material.findByIdAndDelete(material.id);
//   res.send({
//     success: true,
//     material,
//   });
// };

export const makeMaterialCompatibleWithCategory: RequestHandler = async (
  req,
  res
) => {
  const material = req.q_material;
  const category = req.q_materialCategory;

  await Material.findByIdAndUpdate(material._id, {
    $addToSet: { compatibleWith: category._id },
  }).exec();

  res.send({
    success: true,
  });
};
