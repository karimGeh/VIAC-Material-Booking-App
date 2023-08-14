import { MaterialCategory } from "api/types";

export interface CreateMaterialCategoryRequest {
  name: string;
}
export interface GetMaterialCategoryByIdRequest {
  id: string;
}

export type UpdateMaterialCategoryRequest = MaterialCategory;

export type DeleteMaterialCategoryRequest = MaterialCategory;
