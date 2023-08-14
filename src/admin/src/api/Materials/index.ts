import api, { ApiGenerator } from "api/apiGenerator";
import {
  GetAllMaterialsResponse,
  CreateMaterialResponse,
  // DeleteMaterialResponse,
  GetMaterialByIdResponse,
  UpdateMaterialResponse,
} from "./response";
import {
  CreateMaterialRequest,
  // DeleteMaterialRequest,
  GetMaterialByIdRequest,
  UpdateMaterialRequest,
} from "./request";

const getAllMaterials = ApiGenerator<null, GetAllMaterialsResponse>(
  async () => {
    const response = await api.get("/admin/materials");
    return response.data;
  }
);

const getMaterialById = ApiGenerator<
  GetMaterialByIdRequest,
  GetMaterialByIdResponse
>(async (request) => {
  const response = await api.get(`/admin/materials/${request.id}`);
  return response.data;
});

const createMaterial = ApiGenerator<
  CreateMaterialRequest,
  CreateMaterialResponse
>(async (request) => {
  const response = await api.post("/admin/materials/", request);
  return response.data;
});

const updateMaterial = ApiGenerator<
  UpdateMaterialRequest,
  UpdateMaterialResponse
>(async (request) => {
  const response = await api.put(`/admin/materials/${request._id}`, request);
  return response.data;
});

// const deleteMaterial = ApiGenerator<
//   DeleteMaterialRequest,
//   DeleteMaterialResponse
// >(async (request) => {
//   const response = await api.delete(`/admin/materials/${request._id}`);
//   return response.data;
// });

const MaterialsAPIClient = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  // deleteMaterial,
};

export default MaterialsAPIClient;
