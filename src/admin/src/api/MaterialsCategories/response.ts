import { MaterialCategory } from "api/types";

export interface GetAllMaterialCategoriesResponse {
  success: boolean;
  materialCategories: MaterialCategory[];
}

export interface GetMaterialCategoryByIdResponse {
  success: boolean;
  materialCategory: MaterialCategory;
}

export interface CreateMaterialCategoryResponse {
  success: boolean;
  materialCategory: MaterialCategory;
}

export interface UpdateMaterialCategoryResponse {
  success: boolean;
  materialCategory: MaterialCategory;
}

export interface DeleteMaterialCategoryResponse {
  success: boolean;
  materialCategory: MaterialCategory;
}
