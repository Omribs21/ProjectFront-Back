import React from 'react'
//Basic carousel to show information for the customer
const Carousel = () => {
    return (
        <div>
            <div style={{backgroundColor:"rgb(74, 115, 199)"}} id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
               
                <br></br>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <p style={{fontSize:"15px",color:"white"}}>Free shipping only this week!</p>
                    </div>
                    <div className="carousel-item">
                        <p style={{fontSize:"15px",color:"white"}}>20% Discount on shirts</p>                    
                    </div>
                    <div className="carousel-item">
                        <p style={{fontSize:"15px",color:"white"}}>Shipping time to 4 days</p>
                    </div>
                </div>
               
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span style={{color:"black"}} className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span style={{color:"black"}} className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                
            </div>

        </div>
    )
}

export default Carousel