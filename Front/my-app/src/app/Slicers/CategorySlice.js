import { createSlice } from "@reduxjs/toolkit";

// change category to choose wich prods to render on the main page
const initialState ={
    CategoryId:{
        "shirt":1,
        "undershirt":2,
        "pants":3

    }
}

export const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {}
})


export const selectCategory = (state) => state.category.CategoryId;
export default CategorySlice.reducer