import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";

import MaterialsAPIClient from "api/Materials";
import {
  CreateMaterialRequest,
  // DeleteMaterialRequest,
  GetMaterialByIdRequest,
  UpdateMaterialRequest,
} from "api/Materials/request";
import {
  MaterialsAction,
  allMaterials_finish,
  createMaterial_finish,
  // deleteMaterial_finish,
  materialById_finish,
  updateMaterial_finish,
} from "store/reducers/api/Materials";

const allMaterials = function* () {
  const response = (yield call(
    MaterialsAPIClient.getAllMaterials,
    null
  )) as Awaited<ReturnType<typeof MaterialsAPIClient.getAllMaterials>>;
  yield put(allMaterials_finish(response));
};

const materialById = function* (action: PayloadAction<GetMaterialByIdRequest>) {
  const response = (yield call(
    MaterialsAPIClient.getMaterialById,
    action.payload
  )) as Awaited<ReturnType<typeof MaterialsAPIClient.getMaterialById>>;
  yield put(materialById_finish(response));
};

const createMaterial = function* (
  action: PayloadAction<CreateMaterialRequest>
) {
  const response = (yield call(
    MaterialsAPIClient.createMaterial,
    action.payload
  )) as Awaited<ReturnType<typeof MaterialsAPIClient.createMaterial>>;
  yield put(createMaterial_finish(response));
};

const updateMaterial = function* (
  action: PayloadAction<UpdateMaterialRequest>
) {
  const response = (yield call(
    MaterialsAPIClient.updateMaterial,
    action.payload
  )) as Awaited<ReturnType<typeof MaterialsAPIClient.updateMaterial>>;
  yield put(updateMaterial_finish(response));
};

// const deleteMaterial = function* (
//   action: PayloadAction<DeleteMaterialRequest>
// ) {
//   const response = (yield call(
//     MaterialsAPIClient.deleteMaterial,
//     action.payload
//   )) as Awaited<ReturnType<typeof MaterialsAPIClient.deleteMaterial>>;
//   yield put(deleteMaterial_finish(response));
// };

function* saga() {
  yield takeEvery<MaterialsAction["type"], typeof allMaterials>(
    "materials/allMaterials_start",
    allMaterials
  );

  yield takeEvery<MaterialsAction["type"], typeof materialById>(
    "materials/materialById_start",
    materialById
  );

  yield takeEvery<MaterialsAction["type"], typeof createMaterial>(
    "materials/createMaterial_start",
    createMaterial
  );

  yield takeEvery<MaterialsAction["type"], typeof updateMaterial>(
    "materials/updateMaterial_start",
    updateMaterial
  );

  // yield takeEvery<MaterialsAction["type"], typeof deleteMaterial>(
  //   "materials/deleteMaterial_start",
  //   deleteMaterial
  // );
}

export default saga;
