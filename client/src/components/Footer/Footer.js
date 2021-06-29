import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    render() {
        return (
            <div className="footer-container">
                <div className="container pt-5">
                <div className="row  justify-content-center">
                        <div className="col-lg-3">
                            <h4 className="feat-heder ">Help</h4>
                           <ul>
                               <li>Help & FAQ</li>
                               <li>Contact Us</li>
                                <li>Privacy Policy</li>
                           </ul>
                        </div>
                        <div className="col-lg-3">
                            <h4 className="feat-heder" >Company</h4>
                            <ul>
                               <li>About</li>
                               <li>Blog</li>
                                <li>Reviews</li>
                           </ul>
                        </div>
                        <div className="col-lg-3">
                            <h4 className="feat-heder">Let's Get Social</h4>
                            <div className="row">
                            <i className="fab fa-facebook-f fa-2x m-2"></i>
                            <i className="fab fa-instagram fa-2x  m-2"></i>
                            <i className="fab fa-youtube fa-2x  m-2"></i>
                            <i className="fab fa-twitter fa-2x  m-2"></i>
                            </div>
                        </div>
                    </div>
                </div>
                   
            </div>
        );
    }
}

export default Footer;