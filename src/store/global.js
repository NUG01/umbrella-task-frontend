import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastPage: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setLastPage(state, action) {
      state.lastPage = action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
