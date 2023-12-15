import { createSlice } from "@reduxjs/toolkit";

const selectedGameSlice = createSlice({
  name: "selectedGame",
  initialState: {
    gameId: null,
  },
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
  },
});

export const { setGameId } = selectedGameSlice.actions;
export const selectGameId = (state) => state.selectedGame.gameId;

export default selectedGameSlice.reducer;
