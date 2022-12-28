import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

//  SLICE FOR THE OfficialProducts!! 
//  Returnes values as: amount,quantity and the products.
const Myitems = localStorage.getItem('ProductItems') != null ?
    JSON.parse(localStorage.getItem('ProductItems')) : []

const MytotalAmount = localStorage.getItem('MytotalAmount') != null ?
    JSON.parse(localStorage.getItem('MytotalAmount')) : 0

const MytotalQuantity = localStorage.getItem('MytotalQuantity') != null ?
    JSON.parse(localStorage.getItem('MytotalQuantity')) : 0

const MysetItemFunc = (item, totalAmount, totalQuantity) => {
    localStorage.setItem('MycartItems', JSON.stringify(item))
    localStorage.setItem('MytotalAmount', JSON.stringify(totalAmount));
    localStorage.setItem('MytotalQuantity', JSON.stringify(totalQuantity));
}
const initialState = {
    ProductItems: Myitems,
    ProductQuantity: MytotalQuantity,
    ProductAmount: MytotalAmount,
};

export const MycartSlice = createSlice({
    name: "mycart",
    initialState,
    reducers: {
        addItemMyCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.ProductItems.find(
                (item) => item.id === newItem.id
            );
            state.ProductQuantity += newItem.quantity;

            if (!existingItem) {
                state.ProductItems.push({
                    id: newItem.id,
                    desc: newItem.desc,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    size : newItem.size,
                    total: newItem.total,
                    prod_id: newItem.prod_id
                });
               
            }
            else {
                existingItem.quantity += newItem.quantity;
            }
            state.ProductAmount = state.ProductItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0

            );

            MysetItemFunc(state.ProductItems.map((item) => item), state.ProductAmount, state.ProductQuantity);
            
        },

        removeItemMyCart(state, action) {
            const id = action.payload;
            
            const existingItem = state.ProductItems.find((item) => item.id == id);
            state.ProductQuantity--;

            if (existingItem.quantity == 1) {
                state.ProductItems = state.ProductItems.filter((item) => item.id !== id)
            }
            else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) - Number(existingItem.price);
            }

            state.ProductAmount = state.ProductItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            MysetItemFunc(state.ProductItems.map((item) => item), state.ProductAmount, state.ProductQuantity);
            console.table(Myitems)
        },

        deleteItemMyCart(state, action) {
            const id = action.payload;
            const existingItem = state.ProductItems.find((item) => item.id === id)

            if (existingItem) {
                state.ProductItems = state.ProductItems.filter((item) => item.id !== id);
                state.ProductQuantity = state.ProductQuantity - existingItem.quantity;
            }
            state.ProductAmount = state.ProductItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0
            );
            MysetItemFunc(state.ProductItems.map((item) => item), state.ProductAmount, state.ProductQuantity);
            console.table(Myitems)
        },
        cleanMyCart(state){
            MysetItemFunc(state.ProductItems = [],state.ProductAmount = 0,state.ProductQuantity= 0)
        }

    }

});

export const { addItemMyCart,removeItemMyCart,deleteItemMyCart,cleanMyCart } = MycartSlice.actions;

export const selectProductItems = (state) => state.mycart.ProductItems;
export const selectProductQuantity = (state) => state.mycart.ProductQuantity
export const selectProductAmount = (state) => state.mycart.ProductAmount
export const selectMyItems = (state) => state.mycart.Myitems;
export default MycartSlice.reducer;
