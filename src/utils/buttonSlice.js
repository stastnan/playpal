// buttonSlice.js
import { createSlice } from "@reduxjs/toolkit";

const buttonSlice = createSlice({
  name: "button",
  initialState: {
    isClicked: false,
  },
  reducers: {
    setClicked: (state, action) => {
      state.isClicked = action.payload;
    },
  },
});

export const { setClicked } = buttonSlice.actions;
export const selectIsClicked = (state) => state.button.isClicked;

export default buttonSlice.reducer;
