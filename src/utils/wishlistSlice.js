import { createSlice } from "@reduxjs/toolkit";

const storedWishlist = localStorage.getItem("wishlist");
const initialState = storedWishlist ? JSON.parse(storedWishlist) : [];
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
    deleteFromWishlist: (state, action) => {
      const idToDelete = action.payload;
      const updatedWishlist = state.filter((item) => item.id !== idToDelete);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    },
  },
});

export const { addToWishlist, deleteFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
