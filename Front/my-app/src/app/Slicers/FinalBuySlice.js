import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddOrder } from "../API/FinalBuyAPI";
const initialState = {

};
// final buy slice.
export const addOrderAsync = createAsyncThunk(
    "addorder/AddNewProduct",

    async (payload) => {
        console.log(payload)
        const response = await AddOrder(payload);
        return response.data;
    }
);



export const AddOrderSlice = createSlice({
    name: "addorder",
    initialState,
    reducers: { }
    
});
export default AddOrderSlice.reducer;