import { Reducer } from "redux";
import { ReduxReducers } from "store/types";
import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  isLeftDrawerOpen: boolean;
  isRightDrawerOpen: boolean;
  isAdvancedSearchOpen: boolean;
  isAddNewModalOpen?: boolean;
  isEditModalOpen?: boolean;
  // stateTabsActiveKey: string;
}

const initialState: GlobalState = {
  isLeftDrawerOpen: false,
  isRightDrawerOpen: false,
  isAdvancedSearchOpen: false,
  isAddNewModalOpen: false,
  // stateTabsActiveKey: "1",
};

export const userSlice = createSlice({
  name: ReduxReducers.GLOBAL,
  initialState,
  reducers: {
    // setGlobal: (state, action: PayloadAction<GlobalState>) => {
    //   state = action.payload;
    // },
    toggleLeftDrawer: (state) => {
      state.isLeftDrawerOpen = !state.isLeftDrawerOpen;
    },
    toggleRightDrawer: (state) => {
      state.isRightDrawerOpen = !state.isRightDrawerOpen;
    },
    toggleAdvancedSearch: (state) => {
      state.isAdvancedSearchOpen = !state.isAdvancedSearchOpen;
    },
    toggleAddNewModal: (state) => {
      state.isAddNewModalOpen = !state.isAddNewModalOpen;
    },
    toggleEditModal: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
  },
});

export const {
  // setGlobal,
  toggleLeftDrawer,
  toggleRightDrawer,
  toggleAddNewModal,
  toggleAdvancedSearch,
  toggleEditModal,
} = userSlice.actions;

const reducer: Reducer<GlobalState> = userSlice.reducer;

export type GlobalAction =
  // | ReturnType<typeof setGlobal>
  | ReturnType<typeof toggleLeftDrawer>
  | ReturnType<typeof toggleRightDrawer>
  | ReturnType<typeof toggleAddNewModal>
  | ReturnType<typeof toggleAdvancedSearch>
  | ReturnType<typeof toggleEditModal>;

export default reducer;
