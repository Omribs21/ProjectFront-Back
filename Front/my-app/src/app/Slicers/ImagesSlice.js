import { createSlice } from "@reduxjs/toolkit";
import chelseaShirtFront from "../images/ChelseaShirtFront.jpeg"
import chelseaShirtBack from "../images/ChelseaShirtBack.jpeg"
import juventusShirtFront from "../images/juventusShirtFront.jpeg"
import juventusShirtBack from "../images/juventusShirtBack.jpeg"
import psgShirtFront from "../images/PSGshirtFront.jpeg"
import psgShirtBack from "../images/PSGshirtBack.jpeg"
import ArgentinaShirt from '../images/ArgentinaShirt.jpeg'
import ArgentinaShirtBack from '../images/ArgentinaShritBack.jpeg'
import LiverpoolShirtBack from '../images/LiverpoolShirtBack.jpeg'
import LiverpoolShirtFront from '../images/LiverpoolShirtFront.jpeg'
import TottenhamShirtBack from '../images/TottenhamShirtBack.jpeg'
import TottenhamShirtFront from '../images/TottenhamShirtFront.jpeg'
import ManchesterUnitedShirtFront from '../images/ManchesterUnitedShirtFront.jpeg'
import ManchesterUnitedShirtBack from '../images/ManchesterUnitedShirtBack.jpeg'
import ManchesterCityShirtFront from '../images/ManchesterCityShirtFront.jpeg'
import ManchesterCityShirtBack from '../images/ManchesterCityShirtBack.jpeg'
import GiroudMilanShirtFront from '../images/GiroudMilanShirtFront.jpeg'
import GiroudMilanShirtBack from '../images/GiroudMilanShirtBack.jpeg'
import RealMadridPantsBack from '../images/RealMadridPantsBack.jpeg'
import RealMadridPantsFront from '../images/RealMadridPantsFront.jpeg'
import psgPantsFront from "../images/PSGPantsFront.jpeg"
import MbappeShirtFront from "../images/MbappeShirtFront.jpeg"
import MbappeShirtBack from "../images/MbappeShirtBack.jpeg"

// slice to store all of the images for ALL of the products in sorted way 
// and accessible to diffrent files. 
const initialState = {
    PersonalImages: [
        { front: ArgentinaShirt, back: ArgentinaShirtBack },
        { front: juventusShirtFront, back: juventusShirtBack },
        { front: psgShirtFront, back: psgShirtBack },
        { front: chelseaShirtFront, back: chelseaShirtBack },
        { front: LiverpoolShirtFront, back: LiverpoolShirtBack },
        { front: TottenhamShirtFront, back: TottenhamShirtBack },
        { front: ManchesterUnitedShirtFront, back: ManchesterUnitedShirtBack },
        { front: ManchesterCityShirtFront, back: ManchesterCityShirtBack },
    ],

    ProductImages: [
        { front: GiroudMilanShirtFront, back: GiroudMilanShirtBack },
        { front: RealMadridPantsFront, back: RealMadridPantsBack },
        { front: psgPantsFront, back: psgPantsFront },
        { front: MbappeShirtFront, back: MbappeShirtBack }

    ]
};

export const ImagesSlice = createSlice({
    name: "image",
    initialState,
    reducers: {}
})

export const selectImages = (state) => state.image.PersonalImages;
export const selectProductImages = (state) => state.image.ProductImages;
export default ImagesSlice.reducer;