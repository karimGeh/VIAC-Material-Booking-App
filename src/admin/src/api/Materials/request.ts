import { Material, MaterialState } from "api/types";

export interface CreateMaterialRequest {
  type: string;
  ref: string;
  state: MaterialState;
  barcode: string;
  compatibleWith: string[];
}
export interface GetMaterialByIdRequest {
  id: string;
}

export interface UpdateMaterialRequest {
  _id: string;
  type: string;
  ref: string;
  state: MaterialState;
  barcode: string;
  compatibleWith: string[];
}

export type DeleteMaterialRequest = Material;
