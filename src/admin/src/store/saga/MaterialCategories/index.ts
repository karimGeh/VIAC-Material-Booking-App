import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";

import MaterialsCategoriesAPIClient from "api/MaterialsCategories";
import {
  CreateMaterialCategoryRequest,
  DeleteMaterialCategoryRequest,
  GetMaterialCategoryByIdRequest,
  UpdateMaterialCategoryRequest,
} from "api/MaterialsCategories/request";
import {
  MaterialCategoriesAction,
  allMaterialCategories_finish,
  createMaterialCategory_finish,
  deleteMaterialCategory_finish,
  materialCategoryById_finish,
  updateMaterialCategory_finish,
} from "store/reducers/api/MaterialCategories";

const allMaterialCategories = function* () {
  const response = (yield call(
    MaterialsCategoriesAPIClient.getAllMaterialCategories,
    null
  )) as Awaited<
    ReturnType<typeof MaterialsCategoriesAPIClient.getAllMaterialCategories>
  >;
  yield put(allMaterialCategories_finish(response));
};

const materialCategoryById = function* (
  action: PayloadAction<GetMaterialCategoryByIdRequest>
) {
  const response = (yield call(
    MaterialsCategoriesAPIClient.getMaterialCategoryById,
    action.payload
  )) as Awaited<
    ReturnType<typeof MaterialsCategoriesAPIClient.getMaterialCategoryById>
  >;
  yield put(materialCategoryById_finish(response));
};

const createMaterialCategory = function* (
  action: PayloadAction<CreateMaterialCategoryRequest>
) {
  const response = (yield call(
    MaterialsCategoriesAPIClient.createMaterialCategory,
    action.payload
  )) as Awaited<
    ReturnType<typeof MaterialsCategoriesAPIClient.createMaterialCategory>
  >;
  yield put(createMaterialCategory_finish(response));
};

const updateMaterialCategory = function* (
  action: PayloadAction<UpdateMaterialCategoryRequest>
) {
  const response = (yield call(
    MaterialsCategoriesAPIClient.updateMaterialCategory,
    action.payload
  )) as Awaited<
    ReturnType<typeof MaterialsCategoriesAPIClient.updateMaterialCategory>
  >;
  yield put(updateMaterialCategory_finish(response));
};

const deleteMaterialCategory = function* (
  action: PayloadAction<DeleteMaterialCategoryRequest>
) {
  const response = (yield call(
    MaterialsCategoriesAPIClient.deleteMaterialCategory,
    action.payload
  )) as Awaited<
    ReturnType<typeof MaterialsCategoriesAPIClient.deleteMaterialCategory>
  >;
  yield put(deleteMaterialCategory_finish(response));
};

function* saga() {
  yield takeEvery<
    MaterialCategoriesAction["type"],
    typeof allMaterialCategories
  >("material-categories/allMaterialCategories_start", allMaterialCategories);

  yield takeEvery<
    MaterialCategoriesAction["type"],
    typeof materialCategoryById
  >("material-categories/materialCategoryById_start", materialCategoryById);

  yield takeEvery<
    MaterialCategoriesAction["type"],
    typeof createMaterialCategory
  >("material-categories/createMaterialCategory_start", createMaterialCategory);

  yield takeEvery<
    MaterialCategoriesAction["type"],
    typeof updateMaterialCategory
  >("material-categories/updateMaterialCategory_start", updateMaterialCategory);

  yield takeEvery<
    MaterialCategoriesAction["type"],
    typeof deleteMaterialCategory
  >("material-categories/deleteMaterialCategory_start", deleteMaterialCategory);
}

export default saga;
