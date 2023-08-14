import { Material } from "api/types";

export interface GetAllMaterialsResponse {
  success: boolean;
  materials: Material[];
}

export interface GetMaterialByIdResponse {
  success: boolean;
  material: Material;
}

export interface CreateMaterialResponse {
  success: boolean;
  material: Material;
}

export interface UpdateMaterialResponse {
  success: boolean;
  material: Material;
}

export interface DeleteMaterialResponse {
  success: boolean;
  material: Material;
}
