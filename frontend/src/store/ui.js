import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    message: {
      type: "",
      content: "",
    },
    loader: {
      loading: false,
    },
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = {
        type: "",
        content: "",
      };
    },
    showLoading: (state) => {
      state.loader.loading = true;
    },
    hideLoading: (state) => {
      state.loader.loading = false;
    },
  },
});

export const { setMessage, clearMessage, showLoading, hideLoading } =
  uiSlice.actions;

export default uiSlice.reducer;
