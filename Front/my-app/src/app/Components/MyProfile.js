import React from 'react'
import { useSelector } from "react-redux";
import { selectFirstName, selectLastName, selectUserName,  selectEmail } from '../Slicers/loginSlice';
import { Link, Outlet } from 'react-router-dom';
import Footer from './FooterComponents/Footer';

// The User profile page, Where he can see his details.
const MyProfile = () => {
  const first_name = useSelector(selectFirstName)
  const user_name = useSelector(selectUserName)
  const last_name = useSelector(selectLastName)
  const email = useSelector(selectEmail)

  return (
    <div class="header">
      <div style={{ height: "0px" }} class="inner-header flex">
        <div style={{ color: "black", width: "620px", height: "550px", backgroundColor: "gainsboro", margin: "auto", marginTop: "1%", padding: "20px", borderRadius: "25px" }}>
          <br></br>
          <h1 class="animate__animated animate__backInDown" style={{ fontSize: "50px", textAlign:"center",  color: "black", fontFamily: "monospace" }}>Welcome Back! {user_name}</h1>
          <h2 class="animate__animated animate__backInUp" style={{ fontSize: "30px", textAlign:"center",  color: "black", fontFamily: "monospace" }}>Your Personal details:</h2>
          <br></br>
          <div style={{ display: "flex", rowGap: "15px",justifyContent:"center" }}>
            <div class="animate__animated animate__backInLeft" style={{textAlign:"center"}}> 
              <p>User Name: {user_name}</p>
              <p>First name: {first_name}</p>
              <p>Last Name: {last_name}</p>
              <p>Email:{email}</p>
            </div>
          </div>
          <Link to='/myorders'><p class="animate__animated animate__backInUp" style={{fontsize:"25px",marginTop:"15%"}}>Click here! My orders</p></Link>
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MyProfile