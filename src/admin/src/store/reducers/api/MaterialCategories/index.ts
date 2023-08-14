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
  CreateMaterialCategoryResponse,
  DeleteMaterialCategoryResponse,
  GetAllMaterialCategoriesResponse,
  GetMaterialCategoryByIdResponse,
  UpdateMaterialCategoryResponse,
} from "api/MaterialsCategories/response";
import {
  CreateMaterialCategoryRequest,
  DeleteMaterialCategoryRequest,
  GetMaterialCategoryByIdRequest,
  UpdateMaterialCategoryRequest,
} from "api/MaterialsCategories/request";

export type MaterialCategoriesStateType = {
  allMaterialCategories: SagaRequestState<GetAllMaterialCategoriesResponse>;
  materialCategoryById: SagaRequestState<
    GetMaterialCategoryByIdResponse,
    GetMaterialCategoryByIdRequest
  >;
  createMaterialCategory: SagaRequestState<
    CreateMaterialCategoryResponse,
    CreateMaterialCategoryRequest
  >;
  updateMaterialCategory: SagaRequestState<
    UpdateMaterialCategoryResponse,
    UpdateMaterialCategoryRequest
  >;
  deleteMaterialCategory: SagaRequestState<
    DeleteMaterialCategoryResponse,
    DeleteMaterialCategoryRequest
  >;
};

const initialState: MaterialCategoriesStateType = {
  allMaterialCategories: defaultSagaRequestState,
  materialCategoryById: defaultSagaRequestState,
  createMaterialCategory: defaultSagaRequestState,
  updateMaterialCategory: defaultSagaRequestState,
  deleteMaterialCategory: defaultSagaRequestState,
};

const action_start = action_start_builder<MaterialCategoriesStateType>();
const action_finish = action_finish_builder<MaterialCategoriesStateType>();
const action_reset = action_reset_builder<MaterialCategoriesStateType>();

export const MaterialCategoriesSlice = createSlice({
  name: APIRoutes.MaterialCategories,
  initialState,
  reducers: {
    allMaterialCategories_start: action_start("allMaterialCategories"),
    allMaterialCategories_finish: action_finish("allMaterialCategories"),
    allMaterialCategories_reset: action_reset("allMaterialCategories"),

    materialCategoryById_start: action_start("materialCategoryById"),
    materialCategoryById_finish: action_finish("materialCategoryById"),
    materialCategoryById_reset: action_reset("materialCategoryById"),

    createMaterialCategory_start: action_start("createMaterialCategory"),
    createMaterialCategory_finish: action_finish("createMaterialCategory"),
    createMaterialCategory_reset: action_reset("createMaterialCategory"),

    updateMaterialCategory_start: action_start("updateMaterialCategory"),
    updateMaterialCategory_finish: action_finish("updateMaterialCategory"),
    updateMaterialCategory_reset: action_reset("updateMaterialCategory"),

    deleteMaterialCategory_start: action_start("deleteMaterialCategory"),
    deleteMaterialCategory_finish: action_finish("deleteMaterialCategory"),
    deleteMaterialCategory_reset: action_reset("deleteMaterialCategory"),
  },
});

const MaterialCategoriesReducer = MaterialCategoriesSlice.reducer;

export const {
  allMaterialCategories_start,
  allMaterialCategories_finish,
  allMaterialCategories_reset,
  materialCategoryById_start,
  materialCategoryById_finish,
  materialCategoryById_reset,
  createMaterialCategory_start,
  createMaterialCategory_finish,
  createMaterialCategory_reset,
  updateMaterialCategory_start,
  updateMaterialCategory_finish,
  updateMaterialCategory_reset,
  deleteMaterialCategory_start,
  deleteMaterialCategory_finish,
  deleteMaterialCategory_reset,
} = MaterialCategoriesSlice.actions;

export type MaterialCategoriesAction =
  | ReturnType<typeof allMaterialCategories_start>
  | ReturnType<typeof allMaterialCategories_finish>
  | ReturnType<typeof allMaterialCategories_reset>
  | ReturnType<typeof materialCategoryById_start>
  | ReturnType<typeof materialCategoryById_finish>
  | ReturnType<typeof materialCategoryById_reset>
  | ReturnType<typeof createMaterialCategory_start>
  | ReturnType<typeof createMaterialCategory_finish>
  | ReturnType<typeof createMaterialCategory_reset>
  | ReturnType<typeof updateMaterialCategory_start>
  | ReturnType<typeof updateMaterialCategory_finish>
  | ReturnType<typeof updateMaterialCategory_reset>
  | ReturnType<typeof deleteMaterialCategory_start>
  | ReturnType<typeof deleteMaterialCategory_finish>
  | ReturnType<typeof deleteMaterialCategory_reset>;

export default MaterialCategoriesReducer;
