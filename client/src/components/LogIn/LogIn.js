import React, { Component } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Api from '../../api/apiCall';
class LogIn extends Component {

    state = {
        reg_className: "floating-icons",
        log_className: "floating-icons",
        email_validation_class :"form-control",
        password_validation_class :"form-control",
      };

    componentDidMount(){
        console.log("user-log-----log : " ,this.props.loged_in_user)
        let user = localStorage.getItem("user")
        let role = localStorage.getItem("role")
        user =  Number(JSON.parse(user))
        role =  Number(JSON.parse(role))
        console.log("userId Log-in: " ,user)
        console.log("role Log-in: " ,role)
        this.props.updateLogedInUser(user);
        if(role)
            this.props.isAManeger(true);
        else
            this.props.isAManeger(false);
        console.log("userId Log-in: " ,this.props.loged_in_user)
        console.log("role Log-in: " ,this.props.is_a_meneger)
    }


    logInFunction = async () => {

        let user_cridentials = {
            email:this.useremaill.value,
            password:this.userpassword.value,
        }

        let users = await Api.postRequest("/users/CheckIfExist", user_cridentials)
        console.log("check if exists : " , users)

        if(users.data === "no found")
        {//wrong email
            console.log("no user with this email")
            this.setState({email_validation_class :"form-control is-invalid"})
            console.log("no log in for you !")
        }
        else{
            let log_in_user = await Api.postRequest("/users/CheckCredentials", user_cridentials)
            if(log_in_user.data === "no found"){
                //wrong password
                this.setState({email_validation_class :"form-control is-valid"})
                this.setState({password_validation_class :"form-control is-invalid"})
                console.log("no log in for you !")
                
            }
            else{
                //correct crieds
                this.setState({email_validation_class :"form-control is-valid"})
                this.setState({password_validation_class :"form-control is-valid"})
                localStorage.setItem("user", JSON.stringify(log_in_user.data.id))
                localStorage.setItem("role", JSON.stringify(log_in_user.data.role))
                this.props.updateLogedInUser(log_in_user.data.id);
                //check if this is the menager
                if(log_in_user.data.role)
                    this.props.isAManeger(true);
                else
                    this.props.isAManeger(false);

                console.log("loged in succssess")
                this.useremaill.value = ""
                this.userpassword.value = ""
                this.hideModal()
                this.setState({
                    reg_className : "floating-icons display-none",
                    log_className : "floating-icons display-none",
                    email_validation_class :"form-control",
                    password_validation_class :"form-control",
                })
                alert("Welcome back!");
                window.location.replace("http://localhost:3000/vacations");
            }
        }
    }
    
    animetedIcons(){
        if(this.props.loged_in_user === -1){
            this.setState({reg_className : "floating-icons reg-icon-animete"})
            this.setState({log_className : "floating-icons log-icon-animete"})
        }
        else{
            this.setState({reg_className : "floating-icons display-none"})
            this.setState({log_className : "floating-icons display-none"})
        }
    }

    onClicklogInOptionBnt(){
        if(this.props.loged_in_user === -1){
            this.animetedIcons()
        }
        else{
        //log out
        let question = window.confirm( "Are you sure you want to log out?" );
            if(question)
            {
                localStorage.setItem("user", JSON.stringify(-1))
                this.props.updateLogedInUser(-1);
                localStorage.setItem("role", JSON.stringify(0))
                this.props.isAManeger(false);
                window.location.replace("http://localhost:3000/home");
            }
        }

    }

    hideModal(){
        this.inputElement.click();
    }



    render() {
        let icon_title = this.props.log_in_user === -1 ? <title>log-in options</title> :<title>log out</title>
        return (
            
            <div className="log-in-container">
                <div className="icons-container">
                <Link to="/register">
                <svg id="register-icon" className={this.state.reg_className} viewBox="0 0 670.4 670.4">
                    <title>register</title>
                    <circle fill="white" cx="335.2" cy="335.2" r="335.2"/>
                    <path d="M626.17,441.27c-2.49,9.3-8.88,15.81-15.45,22.37Q540.24,533.89,470,604.38a24.21,24.21,0,0,1-13.29,7c-20.2,3.86-40.36,7.94-60.53,12a11.73,11.73,0,0,0-2.07.82h-5.46c-7-4-8-6.31-6.42-14.48,4.25-21.53,8.48-43.06,12.95-64.54a14.71,14.71,0,0,1,3.77-7q74.77-75,149.78-149.84c12-11.95,29.39-11.89,41.57-.1,9.25,9,18.62,17.84,27.17,27.45,3.86,4.34,5.84,10.35,8.68,15.6ZM403.73,601.6a26.52,26.52,0,0,0,2.8-.15c15.59-3.08,31.19-6.12,46.75-9.35a9,9,0,0,0,4.05-2.66q72.56-72.45,145-145c5.9-5.9,5.91-10.89,0-16.82Q590.22,415.37,578,403.2c-5.89-5.83-10.91-5.78-16.82.12q-72.35,72.33-144.62,144.73a13.38,13.38,0,0,0-3.28,6.15c-1.94,8.41-3.55,16.88-5.24,25.34C406.57,586.75,405.2,594,403.73,601.6Z" transform="translate(-55 -55)"/>
                    <path d="M237.84,235.41c-12.4.48-24.45-.08-36.16,1.67-12.53,1.89-21,13.44-22,26.76-.09,1.21-.09,2.42-.09,3.64q0,123.74,0,247.49c0,15.3,7.81,26.6,21.2,30.28a43.18,43.18,0,0,0,11.23,1.3q65.28.12,130.57.06c7.18,0,11.19,3.1,11.61,8.77a9.58,9.58,0,0,1-8.55,10.47,25.93,25.93,0,0,1-3.18.08q-66.42,0-132.85,0c-23.39,0-42.4-14.77-47.86-37.06a55.47,55.47,0,0,1-1.45-13q-.14-124.66-.05-249.31c0-28.9,21.07-49.86,49.95-50,9.06,0,18.12,0,27.61,0,0-3,0-5.56,0-8.1.16-7.59,3.66-11.16,11.19-11.22,9.4-.07,18.79,0,28.35,0,.44-1.32.85-2.44,1.18-3.58a48.7,48.7,0,0,1,46.15-35.31,48,48,0,0,1,46.75,34.3c1.19,4,3,4.76,6.64,4.65,7.72-.22,15.46-.12,23.2-.05s11.1,3.4,11.23,11c0,2.56,0,5.11,0,8.28,8.8,0,17.23-.16,25.65.06A73,73,0,0,1,453.07,218c22.09,5.26,37,23.83,37.18,47.31.35,38.21.13,76.43.08,114.64,0,6.93-4,11.29-9.86,11.23s-9.65-4.43-9.66-11.43c0-37.76,0-75.52,0-113.28,0-14.65-8-25.67-21.1-29.38a24.4,24.4,0,0,0-6.25-1.09c-10-.11-20,0-30.87,0,0,2.63,0,5.12,0,7.61-.1,19.18-12.12,31.16-31.31,31.17q-56,0-111.92,0c-19.29,0-31.4-12.2-31.48-31.6C237.83,240.89,237.84,238.65,237.84,235.41Zm155.31-18.9c-9.68,0-18.76.05-27.84,0-6.77-.05-10.31-3.38-11-10.12a47.36,47.36,0,0,0-.65-5.85c-3.16-13.82-15.81-23.58-29.45-22.84-14.93.81-26.1,11.51-27.94,26.75-1.2,10-3.55,12.08-13.64,12.08H257.4c0,8.86,0,17.16,0,25.47,0,10.54,2.91,13.43,13.55,13.43q54.33,0,108.66,0a28.75,28.75,0,0,0,5.87-.41c4.53-.95,7.41-4,7.56-8.48C393.37,236.69,393.15,226.86,393.15,216.51Z" transform="translate(-55 -55)"/><path d="M325.45,313.65h92.79c1.66,0,3.34,0,5,.12a9.57,9.57,0,0,1,8.79,9.36,9.81,9.81,0,0,1-8,9.67,23,23,0,0,1-4.08.18q-94.6,0-189.21,0a19.4,19.4,0,0,1-5.8-.72,9.39,9.39,0,0,1-6.34-9.93,9.5,9.5,0,0,1,8.64-8.53,49,49,0,0,1,5-.13Z" transform="translate(-55 -55)"/>
                    <path d="M325.46,371.89h92.79c1.51,0,3,0,4.54.08a9.6,9.6,0,0,1,9.24,9.41,9.77,9.77,0,0,1-8.94,9.77,33.78,33.78,0,0,1-3.63.07q-94.15,0-188.31,0a20.4,20.4,0,0,1-6.25-.73,9.35,9.35,0,0,1-6.33-9.93,9.55,9.55,0,0,1,8.65-8.52c1.66-.16,3.33-.12,5-.12Z" transform="translate(-55 -55)"/>
                    <path d="M325.46,430.12h92.79c1.51,0,3,0,4.54.07a9.61,9.61,0,0,1,9.24,9.42,9.77,9.77,0,0,1-8.94,9.77,33.78,33.78,0,0,1-3.63.07q-94.15,0-188.31,0a20.72,20.72,0,0,1-6.25-.73,9.35,9.35,0,0,1-6.33-9.93,9.54,9.54,0,0,1,8.65-8.52c1.66-.16,3.33-.12,5-.12Z" transform="translate(-55 -55)"/>
                </svg>
                </Link>
                <svg id="log-in-icon" className={this.state.log_className}  ref={input => this.logInIcon = input}  viewBox="0 0 670.4 670.4"  data-toggle="modal"  data-target="#exampleModal">
                    <title>log-in</title>
                    <circle fill="white" cx="335.2" cy="335.2" r="335.2"/>
                    <path d="M588.4,553.53c-.66,2-1.19,4.12-2,6.08-5.2,12.44-14.67,19.33-28,19.46q-47.46.49-94.94,0c-17.69-.17-30.19-13.42-30.24-31.16-.05-19.12,0-38.24,0-57.37S445.3,459,464.41,458.31c.93,0,1.86-.15,3.31-.26,0-7.59-.22-15.09.07-22.58.2-5.08.45-10.3,1.79-15.15,5.48-19.81,25.65-33.2,45.63-30.74,21.63,2.66,37.8,19.77,38.48,41,.29,9,0,18,0,27.45l5,.28c14.6.78,25.37,9.65,28.92,23.79a14.5,14.5,0,0,0,.73,1.85ZM511,484.19q-22.62,0-45.23,0c-5.46,0-6.69,1.23-6.69,6.6q0,27.87,0,55.74c0,5.6,1.19,6.78,6.93,6.78h89.67c5.69,0,6.89-1.2,6.89-6.82q0-27.68,0-55.34c0-5.86-1.13-7-7.15-7ZM527.86,458c0-9.33.25-18.23-.08-27.1-.31-8.26-7.5-15-15.82-15.58-8.49-.55-17.16,5.37-17.87,13.63-.82,9.57-.19,19.26-.19,29.05Z" transform="translate(-55 -55)"/>
                    <path d="M200.27,518.76H388.21c7.35,0,12.33,3.22,14.14,9.07a13,13,0,0,1-11.16,16.73c-1.33.13-2.69.07-4,.07H190.31c-11.26,0-15.91-4.66-15.91-15.94q0-28.29,0-56.59c.12-46.33,36.22-82.6,82.49-82.7,49.85-.1,99.7,0,149.55,0a81.82,81.82,0,0,1,40.61,10.38c7.19,4,9.7,11.49,6.07,18.08-3.53,6.41-11.17,8.5-18.2,4.69a61.81,61.81,0,0,0-30.25-7.32q-73.16.15-146.32.05c-33.78,0-58.06,24.28-58.08,58.06Z" transform="translate(-55 -55)"/>
                    <path d="M329.46,354.8c-47.53-.13-86.13-38.76-86.11-86.16a86.46,86.46,0,0,1,86.88-86.25c47.33.23,86,39.35,85.71,86.61A86.33,86.33,0,0,1,329.46,354.8Zm.15-25.87a60.34,60.34,0,1,0-60.39-60.44A60.44,60.44,0,0,0,329.61,328.93Z" transform="translate(-55 -55)"/>
                </svg>
                <svg id="log-in-options-icon" className="floating-icons" onClick={() => this.onClicklogInOptionBnt() } onMouseEnter={() => this.animetedIcons() }  onMouseLeave={() => this.animetedIcons()}viewBox="0 0 670.4 670.4">
                    {icon_title}
                    <circle fill="white" cx="335.2" cy="335.2" r="335.2"/>
                    <path d="M598,538.8c-2.17,6.93-3.44,14.32-6.67,20.72-11.41,22.54-30.12,34.58-55.4,36-7.18.39-14.4.11-21.6.11q-130.19,0-260.37,0c-28.94,0-53-16.68-62-43.51-2.21-6.58-3-13.79-3.42-20.77-.56-10.1-.19-20.25-.14-30.39s6.7-17.29,16-17.29,15.94,7.13,16,17.28c.05,10-.11,20,0,30,.28,18.86,13.83,32.33,32.69,32.7h2q138.2,0,276.38,0c13.84,0,24.79-5.25,30.9-18a36.86,36.86,0,0,0,3.45-15.37q.3-139.38.13-278.77c0-19.76-13.73-33.48-33.49-33.49q-139.2-.08-278.38,0c-20,0-33.6,13.69-33.7,33.69,0,9.6,0,19.2,0,28.8,0,10.22-6.55,17.36-15.81,17.46-9.43.11-16.22-7.11-16.15-17.51.1-13-.57-26.21.88-39.12,3.17-28.26,25.52-50.34,53.71-54.58a12,12,0,0,0,2.18-.76h296a8.2,8.2,0,0,0,1.78.72c22.5,3.62,38.9,15.69,48.72,36.15,3,6.22,4.25,13.26,6.3,19.93Z" transform="translate(-55 -55)"/>
                    <path d="M471.1,389.12c-.11,15.13-4.91,26.39-14.09,35.73q-29.28,29.81-58.72,59.45c-7.2,7.25-16.91,7.57-23.5,1s-6.4-16.23.75-23.51q28.44-28.95,57-57.76c9-9.12,9-17.58-.16-26.69q-28.27-28.26-56.56-56.52c-8-8-7.69-18.86.47-25.09a15.67,15.67,0,0,1,19.29-.06,34.75,34.75,0,0,1,3.55,3.21q28.44,28.4,56.86,56.79C465.83,365.48,471.11,377.14,471.1,389.12Z" transform="translate(-55 -55)"/>
                    <path d="M289.39,406.8q-41.79,0-83.59,0c-7.35,0-13-2.87-16-9.72a15.9,15.9,0,0,1,13.05-22.17,33,33,0,0,1,3.59-.12H372.8c8.61,0,14.63,3.78,17,10.61,3.7,10.5-3.79,21.17-15.26,21.33-13.46.18-26.93.05-40.4.05Z" transform="translate(-55 -55)"/>
                </svg>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Log In</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form>
                    <div className="form-group">
                        <label htmlFor="useremaill">Email</label>
                        <input type="email" className={this.state.email_validation_class} ref={ref => this.useremaill = ref} id="useremaill" aria-describedby="emailHelp" placeholder="Enter email.."/>
                        <div id="validationServer03Feedback" className="invalid-feedback">
                            This email does not exists!
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userpassword">Password</label>
                        <input type="password" className={this.state.password_validation_class}  ref={ref => this.userpassword = ref} id="userpassword" placeholder="Password..." autoComplete="off"/>
                        <div id="validationServer03Feedback" className="invalid-feedback">
                            This passord is not correct!
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Not a user ?</label>
                        <Link to="/register" onClick={() => this.hideModal() }>Click Here to Register!</Link>
                    </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={input => this.inputElement = input} className="btn btn-secondary" data-dismiss="modal"  onClick={() => this.logInFunction() } >Cancel</button>
                        <button type="button" className="btn btn-success" onClick={() => this.logInFunction() } >Log In</button>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("State : ", state)
    return {
        loged_in_user: state.loged_in_user,
        is_a_meneger: state.is_a_meneger,
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
        isAManeger(value){
            dispatch({
                type: 'isAManeger',
                payload: value
            })
        },
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(LogIn);