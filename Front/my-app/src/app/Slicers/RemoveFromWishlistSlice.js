import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RemoveItemFromWishlist } from "../API/RemoveFromWishlistAPI";
const initialState = {

};

// remove 1 item from the wishlist
export const RemoveFromWishlistAsync = createAsyncThunk(
    "Removefromwishlist/RemoveItemFromWishlist",

    async (payload) => {
        console.log(payload)
        const response = await RemoveItemFromWishlist(payload);
        return response.data;
    }
);



export const RemoveFromWishlistSlice = createSlice({
    name: "Removefromwishlist",
    initialState,
});
export default RemoveFromWishlistSlice.reducer;