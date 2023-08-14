import api, { ApiGenerator } from "api/apiGenerator";
import {
  CreateMaterialCategoryResponse,
  DeleteMaterialCategoryResponse,
  GetAllMaterialCategoriesResponse,
  GetMaterialCategoryByIdResponse,
  UpdateMaterialCategoryResponse,
} from "./response";
import {
  CreateMaterialCategoryRequest,
  DeleteMaterialCategoryRequest,
  GetMaterialCategoryByIdRequest,
  UpdateMaterialCategoryRequest,
} from "./request";

const getAllMaterialCategories = ApiGenerator<
  null,
  GetAllMaterialCategoriesResponse
>(async () => {
  const response = await api.get("/admin/material-categories/");
  return response.data;
});

const getMaterialCategoryById = ApiGenerator<
  GetMaterialCategoryByIdRequest,
  GetMaterialCategoryByIdResponse
>(async (request) => {
  const response = await api.get(`/admin/material-categories/${request.id}`);
  return response.data;
});

const createMaterialCategory = ApiGenerator<
  CreateMaterialCategoryRequest,
  CreateMaterialCategoryResponse
>(async (request) => {
  const response = await api.post("/admin/material-categories/", request);
  return response.data;
});

const updateMaterialCategory = ApiGenerator<
  UpdateMaterialCategoryRequest,
  UpdateMaterialCategoryResponse
>(async (request) => {
  const response = await api.put(
    `/admin/material-categories/${request._id}`,
    request
  );
  return response.data;
});

const deleteMaterialCategory = ApiGenerator<
  DeleteMaterialCategoryRequest,
  DeleteMaterialCategoryResponse
>(async (request) => {
  const response = await api.delete(
    `/admin/material-categories/${request._id}`
  );
  return response.data;
});

const MaterialsCategoriesAPIClient = {
  getAllMaterialCategories,
  getMaterialCategoryById,
  createMaterialCategory,
  updateMaterialCategory,
  deleteMaterialCategory,
};

export default MaterialsCategoriesAPIClient;
