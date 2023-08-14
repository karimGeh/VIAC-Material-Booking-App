import { createSlice } from "@reduxjs/toolkit";
import { APIRoutes } from "api/types";
import {
  SagaRequestState,
  action_finish_builder,
  action_reset_builder,
  action_start_builder,
  defaultSagaRequestState,
} from "../types";
import {
  CreateMaterialResponse,
  // DeleteMaterialResponse,
  GetAllMaterialsResponse,
  GetMaterialByIdResponse,
  UpdateMaterialResponse,
} from "api/Materials/response";
import {
  CreateMaterialRequest,
  // DeleteMaterialRequest,
  GetMaterialByIdRequest,
  UpdateMaterialRequest,
} from "api/Materials/request";

export type MaterialsStateType = {
  allMaterials: SagaRequestState<GetAllMaterialsResponse>;
  materialById: SagaRequestState<
    GetMaterialByIdResponse,
    GetMaterialByIdRequest
  >;
  createMaterial: SagaRequestState<
    CreateMaterialResponse,
    CreateMaterialRequest
  >;
  updateMaterial: SagaRequestState<
    UpdateMaterialResponse,
    UpdateMaterialRequest
  >;
  // deleteMaterial: SagaRequestState<
  //   DeleteMaterialResponse,
  //   DeleteMaterialRequest
  // >;
};

const initialState: MaterialsStateType = {
  allMaterials: defaultSagaRequestState,
  materialById: defaultSagaRequestState,
  createMaterial: defaultSagaRequestState,
  updateMaterial: defaultSagaRequestState,
  // deleteMaterial: defaultSagaRequestState,
};

const action_start = action_start_builder<MaterialsStateType>();
const action_finish = action_finish_builder<MaterialsStateType>();
const action_reset = action_reset_builder<MaterialsStateType>();

export const MaterialSlice = createSlice({
  name: APIRoutes.Materials,
  initialState,
  reducers: {
    allMaterials_start: action_start("allMaterials"),
    allMaterials_finish: action_finish("allMaterials"),
    allMaterials_reset: action_reset("allMaterials"),

    materialById_start: action_start("materialById"),
    materialById_finish: action_finish("materialById"),
    materialById_reset: action_reset("materialById"),

    createMaterial_start: action_start("createMaterial"),
    createMaterial_finish: action_finish("createMaterial"),
    createMaterial_reset: action_reset("createMaterial"),

    updateMaterial_start: action_start("updateMaterial"),
    updateMaterial_finish: action_finish("updateMaterial"),
    updateMaterial_reset: action_reset("updateMaterial"),

    // deleteMaterial_start: action_start("deleteMaterial"),
    // deleteMaterial_finish: action_finish("deleteMaterial"),
    // deleteMaterial_reset: action_reset("deleteMaterial"),
  },
});

const MaterialReducer = MaterialSlice.reducer;

export const {
  allMaterials_start,
  allMaterials_finish,
  allMaterials_reset,
  materialById_start,
  materialById_finish,
  materialById_reset,
  createMaterial_start,
  createMaterial_finish,
  createMaterial_reset,
  updateMaterial_start,
  updateMaterial_finish,
  updateMaterial_reset,
  // deleteMaterial_start,
  // deleteMaterial_finish,
  // deleteMaterial_reset,
} = MaterialSlice.actions;

export type MaterialsAction =
  | ReturnType<typeof allMaterials_start>
  | ReturnType<typeof allMaterials_finish>
  | ReturnType<typeof allMaterials_reset>
  | ReturnType<typeof materialById_start>
  | ReturnType<typeof materialById_finish>
  | ReturnType<typeof materialById_reset>
  | ReturnType<typeof createMaterial_start>
  | ReturnType<typeof createMaterial_finish>
  | ReturnType<typeof createMaterial_reset>
  | ReturnType<typeof updateMaterial_start>
  | ReturnType<typeof updateMaterial_finish>
  | ReturnType<typeof updateMaterial_reset>;
// | ReturnType<typeof deleteMaterial_start>
// | ReturnType<typeof deleteMaterial_finish>
// | ReturnType<typeof deleteMaterial_reset>;

export default MaterialReducer;
