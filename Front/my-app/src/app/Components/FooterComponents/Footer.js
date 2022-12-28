import React from 'react'
import CustomizedDialogs from './TermsOfService'
import ContactUs from './ContactUs'
import ReturnPolicy from './ReturnPolicy'

// footer for the app, has 3 other components with extra data for the user and some nice CSS :)
const Footer = () => {
    return (
        <div>
            <div style={{ height: "200px", marginTop: "0%" }}>
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "60em" }}></hr>
                <CustomizedDialogs />
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "0em" }}></hr>
                <ContactUs />
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "0em" }}></hr>
                <ReturnPolicy />
            </div>
            <div>
                <svg class="waves" xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
                    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering={"auto"}>
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default Footer