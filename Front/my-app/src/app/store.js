import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import addNewProdReducer from './Slicers/addNewProdSlice';
import AddToWishlistReducer from './Slicers/AddToWishlistSlice';
import cartReducer from './Slicers/CartSlice';
import CategoryReducer from './Slicers/CategorySlice';
import CleanWishlistReducer from './Slicers/CleanWishlistSlice';
import AddOrderReducer from './Slicers/FinalBuySlice';
import GetOrdersReducer from './Slicers/GetAllOrdersSlice';
import GetAllPersonalProductsReducer from './Slicers/GetAllPersonalProductsSlice';
import GetAllProdsByCategoryReducer from './Slicers/GetAllProdsByCategorySlice';
import GetAllProductsReducer from './Slicers/GetAllProductsSlice';
import GetProdByIdReducer from './Slicers/GetProdByIdSlice';
import GetProdFromWishlistReducer from './Slicers/GetProdFromWishlistSlice';
import getWishlistReducer from './Slicers/getWishlistSlice';
import ImagesReducer from './Slicers/ImagesSlice';
import loginReducer from './Slicers/loginSlice';
import logoutReducer from './Slicers/logoutSlice';
import MycartReducer from './Slicers/MycartSlice';
import orderReducer from './Slicers/orderSlice';
import registerReducer from './Slicers/registerSlice';
import RemoveFromWishlistReducer from './Slicers/RemoveFromWishlistSlice';
// all of the slice connention, A long list...
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    login: loginReducer,
    order: orderReducer,
    logout: logoutReducer,
    addTowishlist: AddToWishlistReducer,
    getwishlist: getWishlistReducer,
    addnewprod: addNewProdReducer,
    Getprodfromwishlist: GetProdFromWishlistReducer,
    getprodbyid: GetProdByIdReducer,
    getallprods: GetAllProductsReducer,
    Removefromwishlist: RemoveFromWishlistReducer,
    cleanwishlist: CleanWishlistReducer,
    cart: cartReducer,
    addorder: AddOrderReducer,
    getallpersonalprods: GetAllPersonalProductsReducer,
    image: ImagesReducer,
    mycart: MycartReducer,
    getorders: GetOrdersReducer,
    getallprodsbycategory: GetAllProdsByCategoryReducer,
    category: CategoryReducer
  },
});
