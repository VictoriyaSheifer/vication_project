import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Api from '../api/apiCall';

import "./main.css";

class Register extends Component {
     
    state = {
    }

    componentDidMount = () => {
        //console.log("user-log ---register : " ,this.props.loged_in_user)
        let user = localStorage.getItem("user")
        //console.log("userId localStorage: " ,user)
        user =  JSON.parse(user)
        //console.log("userId : " ,user)
        this.props.updateLogedInUser(user);
        //console.log("userId register-prop: " ,this.props.loged_in_user)

        //if user is logged in he can not register only if he will log out 
        if(user !== -1){
            window.location.replace("http://localhost:3000/");
        }
    }

    //use regular expretion to check mail
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //check inputs of registration and add the new user.
    saveInServer = async () => {
        //check if all filleds were filled 
        if(this.firstNameregisterinput.value === "" || this.lastNameregisterinput.value === "" || this.emailregisterinput.value ===  "" || this.passwordregisterinput.value === "" )
        {
            alert("please fill the form compleatly");
        }//check if this email is valid 
        else if(this.validateEmail(this.emailregisterinput.value)){
            let ob = {
                first_name: this.firstNameregisterinput.value.toLowerCase(),
                last_name: this.lastNameregisterinput.value.toLowerCase(),
                email: this.emailregisterinput.value.toLowerCase(),
                password: this.passwordregisterinput.value
            }//insert the user 
            let users = await Api.postRequest("/users/insertUser", ob)
            if(users.status === 200)
            {
                localStorage.setItem("user", JSON.stringify(users.data.id))
                //console.log("registerd local storage in user id 1::::::",users.data.id)
                this.props.updateLogedInUser(users.data.id);
                //console.log("registerd local storage in user id 2::::::",this.props.loged_in_user)
                window.location.replace("http://localhost:3000/vacations");
            }
            else
                alert("Somthing went wrong with the registretion,please try again")
        }
    }

    onChange(e) {
       
    }

    render() {
        return (
            <div className="reg-cont">
                <div className="container">
                    <div className="row reg-header-container">
                        <h2>Sign up to find the vacation you deserve</h2>
                        <p>
                        Enter your details below and enjoy a special and varied list of sites that you will not find anywhere else,
                        and get tips straight to your inbox.
                        </p>
                    </div>
                <form className="needs-validation">
                <div className="form-row justify-content-center">
                    <div className="form-group col-5">
                    <label htmlFor="firstNameregisterinput">First Name</label>
                    <input type="text" className="form-control" id="firstNameregisterinput" ref={ref => this.firstNameregisterinput = ref} placeholder="First Name"/>
                    </div>
                    <div className="form-group col-5">
                    <label htmlFor="lastNameregisterinput">Last Name</label>
                    <input type="text" className="form-control" id="lastNameregisterinput" ref={ref => this.lastNameregisterinput = ref} placeholder="Last Name"/>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group col-5">
                    <label htmlFor="emailregisterinput">Email</label>
                    <input type="email" className="form-control" id="emailregisterinput" ref={ref => this.emailregisterinput = ref} placeholder="Email"/>
                    </div>
                    <div className="form-group col-5">
                    <label htmlFor="passwordregisterinput">Password</label>
                    <input type="password" className="form-control" id="passwordregisterinput" ref={ref => this.passwordregisterinput = ref} placeholder="Password" autoComplete="off"/>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group col-1">
                        <button  type="button" className="btn btn-success" onClick={(e) => this.saveInServer(e)}>Sign in</button>
                    </div>
                    <div className="form-group col-1">
                        <Link to="/home"><button type="button" className="btn btn-secondary">Cancel</button></Link>
                    </div>
                </div>
                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log("State : ", state)
    return {
        loged_in_user: state.loged_in_user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLogedInUser(value){
            dispatch({
                type: 'updateLogedInUser',
                payload: value
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);