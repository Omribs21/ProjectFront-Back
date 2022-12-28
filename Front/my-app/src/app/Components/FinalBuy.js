import React, { useState } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFirstName, selectLastName, selectToken, selectEmail } from '../Slicers/loginSlice';
import { selecttotalAmount, selectCartItems, cleanCart } from '../Slicers/CartSlice';
import { addOrderAsync } from '../Slicers/FinalBuySlice';
import { cleanMyCart, selectProductAmount, selectProductItems } from '../Slicers/MycartSlice';
import Footer from './FooterComponents/Footer';

const FinalBuy = () => {

  // DECLARING VALUES -->
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [City, setCity] = useState("");
  const [district, setdistrict] = useState("")
  const [phone_number, setphone_number] = useState("")
  const [postal_code, setpostal_code] = useState("")
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const CartItems = useSelector(selectCartItems)
  const MycartItems = useSelector(selectProductItems)
  const total_amount = useSelector(selecttotalAmount)
  const Mytotal_amount = useSelector(selectProductAmount)
  const token = useSelector(selectToken)
  
  const notify = () => {
    if (district === '') {
      toast.error('Please fill the District field.', {
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
    else if (City === '') {
      toast.error('Please fill the City field.', {
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
    else if (phone_number === '') {
      toast.error('Please your phone number.', {
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
    else if (postal_code === "") {
      toast.error('Please fill your postal code.', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

    } else if (total_amount === 0 || Mytotal_amount ===0) {
      toast.info('Your cart is empty!', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

    } else if (first_name === "") {
      toast.error('Please fill your First Name.', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else if (last_name === "") {
      toast.error('Please fill your Last.', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else if (email === "") {
      toast.error('Please fill your Email.', {
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


  const final_buy = () => {
    if (email !== "" && first_name !== "" && last_name !== "" && City !== "" && district !== "" && phone_number !== "" && postal_code !== "" && (total_amount + Mytotal_amount) >0) {
      dispatch(addOrderAsync({
        "Token": token,
        "cartItems": { CartItems },
        "mycartItems": { MycartItems },
        "city": City,
        "district": district,
        "phone": phone_number,
        "postalCode": postal_code,
        "total": total_amount + Mytotal_amount,
        "first_name": first_name,
        "last_name": last_name,
        "email": email
      }))
      toast.success('your order saved.', {
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
    // after the order is set, clean the cart Fully and navigate to main page.
    dispatch(cleanCart());
    dispatch(cleanMyCart());
    navigate("/products");
  }


  return (
    <div style={{ zIndex: "1" }} class="header">
      <div style={{ height: "75px" }} class="inner-header flex">
        <div style={{ width: "600px", height: "550px", backgroundColor: "gainsboro", margin: "auto", marginTop: "2.5%", padding: "20px", borderRadius: "25px" }}>
          <h1 class="animate__animated animate__zoomIn" style={{ width: "100%", fontSize: "70px", color: "black", fontFamily: "monospace" }}>Order</h1>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", rowGap: "15px" }}>
              <input required class="animate__animated animate__zoomInDown" style={{ width: "100%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='First name' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
              <input required class="animate__animated animate__zoomInDown" style={{ width: "100%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='Last name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
              <input required class="animate__animated animate__zoomInDown" style={{ width: "100%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='City' value={City} onChange={(e) => setCity(e.target.value)} />
              <input required class="animate__animated animate__zoomInDown" style={{ width: "100%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='District' value={district} onChange={(e) => setdistrict(e.target.value)} />
              <input required class="animate__animated animate__zoomInDown" style={{ width: "100%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='Phone Number' value={phone_number} onChange={(e) => setphone_number(e.target.value)} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
              <input required class="animate__animated animate__zoomInDown" style={{ width: "100%", borderRadius: "10px", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='Postal Code' value={postal_code} onChange={(e) => setpostal_code(e.target.value)} />
              <input required class="animate__animated animate__zoomInDown" style={{ width: "100%", borderRadius: "10px", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <p style={{ marginTop: "15%", textDecoration: "underline", fontWeight: "bold" }}>Payment:{total_amount + Mytotal_amount}₪</p>
            </div>
            <Outlet />
          </div>
          <button class="animate__animated animate__zoomInDown" style={{ width: "35%", height: "18%", borderRadius: "5px", margin: "auto", marginTop: "5%", fontSize: "17px", color: "white", blockSize: "50px", backgroundColor: "dodgerblue" }} type="button"
            onClick={() => { final_buy(); notify() }}
          >
            <p style={{ color: "white" }}>Confirm Order</p>
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default FinalBuy