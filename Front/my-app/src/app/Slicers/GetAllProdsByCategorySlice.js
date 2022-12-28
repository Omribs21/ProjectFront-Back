import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProdsByCategory } from "../API/GetProdsByCategoryAPI";

const initialState = {
    AllProducts: [],
};

//  get selected prods by their category
export const GetAllProdsByCategoryAsync = createAsyncThunk(
    "getallprodsbycategory/GetAllProdsByCategory",
    async (data) => {
      const response = await GetAllProdsByCategory(data);
      return response.data;
    }
);
  
  export const GetAllProdsByCategorySlice = createSlice({
    name: "getallprodsbycategory",
    initialState,
    reducers: {
      setEmpty: (state,action)=> {
          state.AllProducts = []
      }
    },
    extraReducers: (builder) => {
      builder.addCase(GetAllProdsByCategoryAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.AllProducts = action.payload
      });
    },
  });
  
export const {setEmpty} = GetAllProdsByCategorySlice.actions;
export const selectAllprodsByCategory = (state) => state.getallprodsbycategory.AllProducts;
export default GetAllProdsByCategorySlice.reducer;