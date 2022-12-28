import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './FooterComponents/Footer';
import Testmodal from './PersonalModals/PersonalModal';
import Productmodal from './PersonalModals/ProductModal';

// MAIN PAGE TO DISPLAY ALL PRODUCTS -->
// The first modal is for the OfficialProducts and below PersonalProducts.

const ProductsCards = () => {
    return (
        <div class="header" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }} >
            <br></br><br></br>
            <div style={{ zIndex: 10, marginBottom: "0%" }} className="container">
                <div className="row">
                    <hr></hr>
                    <h2 style={{ textAlign: "left" }}>Official Products:</h2>
                    <hr></hr>
                    <Productmodal />
                </div>
                <br />
                <div className="container">
                    <div className="row">
                        <hr></hr>
                        <h2 style={{ textAlign: "left" }}>Personal Customization Products:</h2>
                        <hr></hr>
                        <Testmodal />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default ProductsCards