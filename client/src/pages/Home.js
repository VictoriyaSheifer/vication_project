import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import * as Api from '../api/apiCall';

import "./main.css"

class Home extends Component {
    
    state = {
    }

    componentDidMount = () => {

    }


    render() {
        return (
            <div className="home-container">
                <div className="welcome-container">
                    <div className="welcome-wrapper">
                    <div className="welcome-row">
                            <div className="row">
                                <div className="col-md-5">
                                    <img src="http://www.localhost:5000/wel.png" className="card-img welcome-img" alt="..."/>
                                </div>
                                <div className="col-md-5">
                                    <div className="card-body">
                                        <h5 className="card-title font-family-Lobster">Discover Experiences</h5>
                                        <p className="card-text">Welcome to the begining of your new vication jerny.Here in Vacation lists we will help you plan the perfect vacation for you.By investing in technology that takes the friction out of travel, Vacation lists seamlessly connects millions of travelers to memorable experiences, a variety of transportation options, and incredible places to stay – from homes to hotels, and much more. </p>
                                    </div>
                                </div>
                         </div>
                    </div>

                    <div className="row">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="card-body">
                                            <h5 className="card-title font-family-Lobster">Our Story.</h5>
                                            <p className="card-text">We started as a small travle agency that attempts to make every vacation personal and as cheep as we can. Our Gole was to make every costomer we had as joyfull as we can .One day one ours lates coustemers calld us as he returned from the vacation we organized for him and said "I had such a wonderful time , i wonder why i didnt here from you guys before, i have a freind that is creating websites do you whant me to contact you with her ?". We were in shock , this was a great beginning to our own jerny </p>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <img src="http://www.localhost:5000/a-img.jpg" className="card-img about-img" alt="..."/>
                                    </div>
                                </div>
                    
                    </div>
                    </div>
                </div>


                <div className="fitures-container">
                <div className="fitures-wrapper">
                <div className="row justify-content-center">
                    <div id="fea-title ">
                        <div className="title">
                            <h2 className="font-family-Patua">Features You'll Love</h2>
                            <span className="byline">in this site you can find</span>
                        </div>
                    </div>
                    <div className="row" id="featuresHome">
                        <div className="col-lg-3">
                            <h4 className="feat-heder ">Incredible Selection</h4>
                            <p className="feat-content">Whether you want to stay in a chic city apartment, a luxury beach resort, or a cozy B and B in the countryside, Booking.com gives you amazing diversity and variety of choice – all in one place.</p>
                        </div>
                        <div className="col-lg-3">
                            <h4 className="feat-heder" >Low Rates</h4>
                            <p className="feat-content">We guarantees to offer you the best available rates. And with our promise to price match, you can rest assured that you’re always getting a great deal.</p>
                        </div>
                        <div className="col-lg-3">
                            <h4 className="feat-heder">Instant Confirmation</h4>
                            <p className="feat-content">Here every reservation is instantly confirmed. When you find your perfect stay, a few clicks are all it takes.</p>
                        </div>
                        <div className="col-lg-3">
                            <h4 className="feat-heder">No Reservation Fees</h4>
                            <p className="feat-content">We don’t charge you any booking fees or add any administrative charges. And in many cases, your booking can be canceled free of charge.</p>
                        </div>
                    </div>
                </div>
                </div>
                </div>  
            </div>

        );
    }
}


export default Home;