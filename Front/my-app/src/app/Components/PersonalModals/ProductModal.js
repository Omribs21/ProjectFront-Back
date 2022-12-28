import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemMyCart, selectProductItems} from '../../Slicers/MycartSlice';
import { selectAllprods } from '../../Slicers/GetAllProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductImages } from '../../Slicers/ImagesSlice';
import { AddToWishlistAsync } from '../../Slicers/AddToWishlistSlice';
import { selectToken } from '../../Slicers/loginSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {selectproductswishlist } from '../../Slicers/getWishlistSlice';
import { selectAllprodsByCategory } from '../../Slicers/GetAllProdsByCategorySlice';

// component to render all of the PersonalProducts
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[900],
                        opacity: 0.5
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function Productmodal() {
    const [open, setOpen] = React.useState(false);
    //  THE FUNCTION THAT OPENS THE DIALOG with the selected item details
    const handleClickOpen = (id, index) => {
        setselectedprice(AllProducts.filter(x => x._id === id)[0].price)
        setdiscount_price(AllProducts.filter(x => x._id === id)[0].discount_price)
        setselectedDesc(AllProducts.filter(x => x._id === id)[0].desc)
        setselectfrontpicture(pictures[index].front)
        setselectbackpicture(pictures[index].back)
        setselectedID(id - 1)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Declaring variables -->
    const dispatch = useDispatch()
    const [Size, setSize] = useState("")
    const [Quantitycount, setQuantitycount] = useState(0)
    const [over, setOver] = useState(false);
    const [selectedID, setselectedID] = useState(0)
    const [selectedDesc, setselectedDesc] = useState("")
    const [selectedprice, setselectedprice] = useState(0)
    const [discount_price, setdiscount_price] = useState(0)
    const [selectfrontpicture, setselectfrontpicture] = useState(null)
    const [selectbackpicture, setselectbackpicture] = useState(null)
    const cartItems = useSelector(selectProductItems)
    const AllProducts = useSelector(selectAllprods)
    const pictures = useSelector(selectProductImages)
    const token = useSelector(selectToken)
    const wishlistProds = useSelector(selectproductswishlist)
    const AllPerfectProds = useSelector(selectAllprodsByCategory)
    const [WishlistArr, setWishlistArr] = useState([])
    var count = 0

    // function to clean the data of the modal
    const clean = () => {
        setSize("");
        setQuantitycount(0);
    }
    // Check if modal is closed to clean the data
    useEffect(() => {
        if (!open) { clean(); }
    }, [open])

    const notify = () => {
        if (Size === '') {
            toast.error('Please fill the Size field.', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (Quantitycount === 0) {
            toast.error('Please fill the Quantity field.', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            toast.success('Your item was added!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    // check if the user can add item to wishlist if so notify for him, otherwise notify as well.
    const FinalAddToWishlist = (token, id) => {
        if (token === "") {
            toast.success('You need to Log in first!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            if (wishlistProds.length === 0) {
                dispatch(AddToWishlistAsync({ "Token": token, "prod_id": id }))
                setWishlistArr(...WishlistArr, id)
                toast.success('Your item was added!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                wishlistProds.forEach(element => {
                    if (element.prod_id === id) {
                        console.log(element.prod_id)
                        count += 1
                    }
                });
                if (count === 0) {
                    
                    dispatch(AddToWishlistAsync({ "Token": token, "prod_id": id }))
                    toast.success('Your item was added!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    });
                } else{
                    toast.info('Your item is already in Wishlist!', {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
        }

    }


    const FinalAddToMyCart = () => {
        if (Quantitycount >= 1 && Size !== "") {
            dispatch(addItemMyCart({
                id: cartItems.length + 1,
                prod_id: selectedID,
                desc: selectedDesc,
                quantity: Number(Quantitycount),
                price: discount_price,
                size: Size,
                total: Quantitycount * selectedprice
            }))
            handleClose();
        }
    }

    return (
        <div style={{ marginTop: "2.5%" }} className="container">
            <div className="row">
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>

                    {console.log(AllPerfectProds.length)}
                    {AllPerfectProds.length >= 1 ? AllProducts.map((prod, index) =>
                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                            <div style={{ display: "flex", order: { index } }} className="col-sm-3">
                                {prod.category === AllPerfectProds[0].category ? <div key={2} className="panel panel-primary">
                                    <div style={{ fontSize: "medium" }} className="panel-heading">{prod.desc}</div> {/*name of the product */}
                                    <div className="panel-body">
                                        <div >
                                            <Button onClick={() => handleClickOpen(prod._id, index)}>
                                                <img style={{ width: "250px", height: "250px" }} src={pictures[index].front} alt="front"></img>
                                            </Button>
                                        </div>
                                    </div>

                                    <div style={{ color: "black", fontSize: "25px", display: "flex", flexDirection: "row", justifyContent: "center" }} className="panel-footer">

                                        {/* <button style={{ fontSize: "10px", marginRight: "15%" }} onClick={() => FinalAddToWishlist(token, prod._id)} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button> */}
                                        <p style={{ margin: "auto" }}><del>{prod.price}₪</del> {prod.discount_price}₪</p>
                                    </div>
                                </div>
                                    : null}

                            </div>
                        </div>) : AllProducts.map((prod, index) =>
                            <div style={{ display: "flex", order: { index } }} className="col-sm-3">
                                <div key={1} className="panel panel-primary">
                                    <div style={{ fontSize: "medium" }} className="panel-heading">{prod.desc}</div> {/*name of the product */}
                                    <div className="panel-body">
                                        <div >
                                            <Button onClick={() => handleClickOpen(prod._id, index)}>
                                                <img style={{ width: "250px", height: "250px" }} src={pictures[index].front}  alt="front"></img>
                                            </Button>
                                        </div>
                                    </div>

                                    <div style={{ color: "black", fontSize: "25px", display: "flex", flexDirection: "row", justifyContent: "center" }} className="panel-footer">

                                        {/* <button style={{ fontSize: "10px", marginRight: "15%" }} onClick={() => FinalAddToWishlist(token, prod._id)} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button> */}
                                        <p style={{ margin: "auto" }}><del>{prod.price}₪</del> {prod.discount_price}₪</p>
                                    </div>
                                </div>


                            </div>)}

                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            <p style={{ fontSize: "20px", textAlign: 'center' }}>{selectedDesc} 2022/2023</p>
                            <p style={{ fontSize: "35px", textAlign: 'center' }}>{discount_price}₪</p>
                        </BootstrapDialogTitle>

                        <DialogContent dividers>
                            <div>
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                        <div style={{ display: "flex", flexDirection: "column", fontSize: "15px" }}>
                                            <p style={{ fontSize: "15px" }}>Please choose the following:</p>
                                            Size:
                                            <div style={{ padding: "10px" }}>
                                                <form>
                                                    <input type="radio" id="small" name="check" value="S" onChange={(e) => setSize(e.target.value)} />
                                                    <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="small">S</label>
                                                    <input type="radio" id="medium" name="check" value="M" onChange={(e) => setSize(e.target.value)} />
                                                    <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="medium">M</label>
                                                    <input type="radio" id="large" name="check" value="L" onChange={(e) => setSize(e.target.value)} />
                                                    <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="large">L</label>
                                                    <input type="radio" id="xlarge" name="check" value="XL" onChange={(e) => setSize(e.target.value)} />
                                                    <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="xlarge">XL</label>
                                                    <input type="radio" id="xxlarge" name="check" value="XXL" onChange={(e) => setSize(e.target.value)} />
                                                    <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="xxlarge">XX-L</label>{" "}
                                                </form>
                                            </div>
                                            Quantity:

                                            <input required style={{ width: "45%", marginLeft: "0px", blockSize: "30px", fontSize: "15px" }} type={"number"} min={1} max={10} value={Number(Quantitycount)} onChange={(e) => setQuantitycount(e.target.value)} />

                                            <button style={{ fontSize: "10px", marginTop: "15%" }} onClick={() => FinalAddToWishlist(token, (selectedID + 1))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>

                                        </div>
                                        <div onMouseOver={() => setOver(true)}
                                            onMouseOut={() => setOver(false)} style={{ paddingLeft: "15px", height: "250px" }}>
                                            <img src={over ? selectbackpicture : selectfrontpicture}
                                                alt="arrow"
                                                width="250"
                                                height="250" ></img>
                                        </div>
                                    </div><br></br>
                                    <hr></hr>
                                    <div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <p style={{ paddingTop: "0px" }}>Quantity:{Quantitycount}  |   Price:{discount_price}</p>
                                        </div>
                                        <p style={{ textAlign: "center" }}>Total: {Quantitycount * discount_price}₪</p>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <Button style={{ fontSize: "large", color: "white", backgroundColor: "#1E90FF" }} onClick={() => { FinalAddToMyCart(); notify(); }}>
                            Add to cart
                        </Button>
                    </BootstrapDialog>
                </div>
            </div>
        </div>
    );
}
