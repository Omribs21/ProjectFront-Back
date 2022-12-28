import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetProdFromWishlist } from "../API/GetProdWishlist";
const initialState = {
    products: [],
};

//  get 1 product of the wishlist
export const GetProdFromWishlistAsync = createAsyncThunk(
    "Getprodfromwishlist/GetProdFromWishlist",
    async (data) => {
      const response = await GetProdFromWishlist(data);
      return response.data;
    }
);
  
  export const GetProdFromWishlistSlice = createSlice({
    name: "Getprodfromwishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(GetProdFromWishlistAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.products= action.payload
      });
    },
  });
  
export const selectallprods = (state) =>state.Getprodfromwishlist.products;
export default GetProdFromWishlistSlice.reducer;