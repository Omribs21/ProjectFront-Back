import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendOrders } from "../API/OrderAPI";

// State - data (init)
const initialState = {
  myOrders: [],
};

export const sendOrderAsync = createAsyncThunk(
  "order/sendOrders",
  async (obj) => {
    const response = await sendOrders(obj.myCart, obj.token);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state);
      console.log(action.payload);
    },
    setFullScreen: (state, action) => {
      console.log(action.payload);
      state.fullScreen = action.payload;
    },
  },
 
});

// export sync method
export const { addToCart, setFullScreen } = orderSlice.actions;

// export any part of the state
export const selectLogged = (state) => state.order.logged;
export const selectFullScreen = (state) => state.order.fullScreen;
export const selectEmail = (state) => state.order.email;
export const selectUserName = (state) => state.order.userName;
export const selectToken = (state) => state.order.token;
// export the reducer to the applicaion
export default orderSlice.reducer;