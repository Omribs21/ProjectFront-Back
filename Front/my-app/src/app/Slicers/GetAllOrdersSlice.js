import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetOrders } from "../API/GetOrdersAPI";
const initialState = {
    orders: [],
};
// Returnes all of the orders
export const GetOrdersAsync = createAsyncThunk(
    "getorders/GetOrders",
    async (payload) => {
      const response = await GetOrders(payload);
      console.log(response.data)
      return response.data;
    }
);
  
  export const GetOrdersSlice = createSlice({
    name: "getorders",
    initialState,
    reducers: {
    extraReducers: (builder) => {
      builder.addCase(GetOrdersAsync.fulfilled, (state, action) => {
        console.log("first")
        console.log(action.payload)
        state.orders = action.payload
      });
    }}
  });
  
export const selectAllOrders = (state) => state.getorders.orders;
export default GetOrdersSlice.reducer;