import React, { Component } from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Nav extends Component {

    componentDidMount(){
        let role = localStorage.getItem("role")
        role =  Number(JSON.parse(role))
        if(role)
            this.props.isAManeger(true);
        else
            this.props.isAManeger(false);
        console.log("role Log-in: " ,this.props.is_a_meneger)
    }

    render() {

        let graphLink = this.props.is_a_meneger ? <Link className="nav-li-item" to="/graphs"><div className="col-4"><p>Graphs</p></div></Link> : ""

        return (
            <div className="nav-container">
                <div className="nav-heder-container">
                </div>
                <nav className="navbar-content text-center">
                    <div className="row text-center nav-ul-content">
                    <Link className="nav-li-item" to="/home"><div className="col-4"><p>Home</p></div></Link>
                    <Link className="nav-li-item" to="/vacations"><div className="col-4"><p>Vacations</p></div></Link>
                    {graphLink}
                    </div>
                </nav>

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

export default  connect(mapStateToProps, mapDispatchToProps)(Nav);