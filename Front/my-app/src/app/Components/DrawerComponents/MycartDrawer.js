import React from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../Slicers/loginSlice'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteItem, selectCartItems, selecttotalQuantity, selecttotalAmount, cleanCart, addItem } from '../../Slicers/CartSlice';
import { selectImages, selectProductImages } from '../../Slicers/ImagesSlice';
import { selectProductItems, deleteItemMyCart, selectProductAmount, cleanMyCart } from '../../Slicers/MycartSlice';

export default function MyCartDrawer() {
    const [state, setState] = React.useState({
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const totalQuantity = useSelector(selecttotalQuantity)
    const totalAmount = useSelector(selecttotalAmount)
    // Personal products data:
    const PersonalProductsItems = useSelector(selectCartItems)
    const PersonalProducsImages = useSelector(selectImages)

    // Official products data:
    const OfficialProductItems = useSelector(selectProductItems)
    const OfficialProductsImages = useSelector(selectProductImages)

    const totalProductAmount = useSelector(selectProductAmount)

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ backgroundColor: "#DDDDDD" }}
        >
        </Box>
    );

    const notify = () => {
        toast.info('Log in first', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    }
    const NotifyRemove = () => {
        toast.info('Item Removed.', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            toastId: 'success1',
        });
    }

    const RemoveItem = (id) => {
        dispatch(deleteItem(id));
        NotifyRemove();
    }

    const RemoveItemMyCart = (id) => {
        dispatch(deleteItemMyCart(id))
        NotifyRemove();
    }

    const cleanCartItems = () => {
        dispatch(cleanCart());
        toast.info('Cart Cleaned!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            toastId: 'success1',
        });
    }

    const cleanMyCartItems = () => {
        dispatch(cleanMyCart());
        toast.info('Cart Cleaned!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            toastId: 'success1',
        });
    }
    return (
        <div>

            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button style={{ color: "white" }} onClick={toggleDrawer(anchor, true)}>
                        <lord-icon
                            src="https://cdn.lordicon.com/medpcfcy.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                        <div class="animate__animated animate__backInDown">
                            <h1 style={{ textAlign: "center" }}>My Cart</h1>
                            <hr style={{
                                borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20
                            }}></hr>
                        </div>

                        <div>
                            {/* PERSONAL CUSTOM ITEMS RENDERING */}
                            {PersonalProductsItems.length > 0 ? <h2 class="animate__animated animate__backInRight" style={{ textAlign: "center", marginBottom: "5%" }}>Personal Customized Products:</h2> : null}
                            {PersonalProductsItems.length > 0 ? PersonalProductsItems.map((prod, index) =>
                                <div class="animate__animated animate__backInRight">
                                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                        {console.log(prod)}
                                        <img style={{ width: "100px", height: "100px" }} src={PersonalProducsImages[prod.prod_id].front} />
                                        <div style={{ textAlign: "center", fontSize: "20px" }}>

                                            <p style={{ fontSize: "15px" }}>Product name:{prod.desc} | Price:{prod.price}</p>
                                            <p style={{ fontSize: "15px" }}>Quantity:{prod.quantity} | Number: {prod.number} | Size:{prod.size} | Name:{prod.back_name}</p>

                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <button style={{ marginTop: "5%", height: "40%", width: "60%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }}
                                            onClick={() => RemoveItem(prod.id)}>Remove item</button>
                                    </div>

                                    <hr style={{
                                        borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20
                                    }}></hr>

                                </div>
                            ) : null}
                            {totalAmount > 0 ? <p class="animate__animated animate__backInUp" style={{ textAlign: "right", marginRight: "5%" }}>Total:<span style={{ marginLeft: "0%" }} >{totalAmount}₪</span></p> : null }
                            
                            <hr></hr>

                            {/* OFFICIAL PRODUCTS RENDERING: */}
                            {OfficialProductItems.length > 0 ? <h2 class="animate__animated animate__backInRight" style={{ textAlign: "center", marginBottom: "5%" }}>Official Products:</h2> : null}
                            {OfficialProductItems.length > 0 ? OfficialProductItems.map((prod, index) =>
                                <div class="animate__animated animate__backInRight">
                                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                        <img style={{ width: "100px", height: "100px" }} src={OfficialProductsImages[prod.prod_id].front} />
                                        <div style={{ textAlign: "center", fontSize: "20px" }}>

                                            <p style={{ fontSize: "15px" }}>Product name:{prod.desc} | Price:{prod.price}</p>
                                            <p style={{ fontSize: "15px" }}>Quantity:{prod.quantity} | Size:{prod.size} </p>

                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <button style={{ marginTop: "5%", height: "40%", width: "60%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }}
                                            onClick={() => RemoveItemMyCart(prod.id)}>Remove item</button>
                                    </div>

                                    <hr style={{
                                        borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20
                                    }}></hr>
                                </div>
                            ) : null}
                            {totalProductAmount > 0 ? <p class="animate__animated animate__backInUp" style={{ textAlign: "right", marginRight: "5%" }}>Total:<span style={{ marginLeft: "0%" }} >{totalProductAmount}₪</span></p> :null}
                            
                            <div class="animate__animated animate__backInUp" style={{ display: "flex", justifyContent: "center" }}>
                                {PersonalProductsItems.length >= 1 ? <button style={{ marginTop: "0%", marginRight: "5%", height: "40%", width: "40%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }} onClick={() => cleanCartItems()}>Clean Personal Products</button> : null}
                                {OfficialProductItems.length >= 1 ? <button style={{ marginTop: "0%", marginLeft: "5%", height: "40%", width: "40%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }} onClick={() => cleanMyCartItems()}>Clean Official Products</button> : null}

                            </div>
                        </div>
                        {console.log(OfficialProductItems.length)}
                        {PersonalProductsItems.length >= 1 || OfficialProductItems.length >= 1 ?
                            <div style={{ fontWeight: "bold" }} >
                                <br></br>
                                <p class="animate__animated animate__backInUp" style={{ textAlign: "left", marginLeft: "5%" }}>Cart Total:<span style={{ marginLeft: "50%" }} >{totalAmount + totalProductAmount}₪</span></p>
                            </div> :
                            <h2 style={{ textAlign: "center", marginTop: "10%", paddingBottom: "200%" }}> The cart is Empty.</h2>}
                        <div class="animate__animated animate__backInUp">
                            {token != '' ? <Link to="/final_buy"><button style={{ width: "100%", height: "100%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }}>Final buy</button></Link> : <button style={{ width: "100%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }} onClick={notify}>Buy</button>}
                        </div>


                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
