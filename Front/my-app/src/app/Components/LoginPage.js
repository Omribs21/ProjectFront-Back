import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from 'react-router-dom';
import { LoginAsync, selectToken } from '../Slicers/loginSlice';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetOrdersAsync } from '../Slicers/GetAllOrdersSlice';
import Footer from './FooterComponents/Footer';

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = useSelector(selectToken);
    const navigate = useNavigate();


    useEffect(() => {
        if (token !== '') {
                toast.success('Welcome Back!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            navigate("/products");
            dispatch(GetOrdersAsync({ "Token": token }))
        } // navigate instantly to main page after login.
    })
    return (
        <div class="header">
            <div style={{ height: "0px" }} class="inner-header flex">
                <div style={{ width: "520px", height: "400px", backgroundColor: "gainsboro", margin: "auto", marginTop: "5%", padding: "20px", borderRadius: "25px" }}>
                    <br></br>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", rowGap: "15px" }}>
                        <h1 class="animate__animated animate__backInDown" style={{ fontSize: "70px", textAlign: "center", color: "black", fontFamily: "monospace" }}>Log in</h1>
                        {/* username */}
                        <input class="animate__animated animate__backInLeft" style={{ width: "45%", margin: "auto", color: "black", fontSize: "17px", blockSize: "50px", borderRadius: "10px" }} placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        {/* password */}
                        <input class="animate__animated animate__backInRight" style={{ width: "45%", margin: "auto", color: "black", blockSize: "50px", fontSize: "17px", borderRadius: "10px" }} type={'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {/* class="w3-input w3-border w3-round"- make the border round */}
                        <button class="animate__animated animate__bounceInUp" style={{ width: "20%", margin: "auto", fontSize: "20px", color: "white", backgroundColor: "dodgerblue", borderRadius: "30px" }} type="button"
                            onClick={() => {
                                dispatch(LoginAsync({ "username": username, "password": password }));
                            }}
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/zmkotitn.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{ width: "50px", height: "30px", color: "white" }}>
                            </lord-icon>
                        </button>
                    </div>
                    <br></br><br></br>
                    <div>
                        <Link to="/register"><p class="animate__animated animate__bounceInUp" style={{ fontSize: "20px" }}>Don't have an acount?, Click Here!</p></Link>
                    </div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Login