import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    message: {
      type: "",
      content: "",
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
  },
});

export const { setMessage, clearMessage } = uiSlice.actions;

export default uiSlice.reducer;
