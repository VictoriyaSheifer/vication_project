import React, { Component } from 'react';
import VacationRegular from '../components/Vacation-regular/Vacation-regular'
import VacationList from '../components/Vacation-list/Vacation-list'
import { connect } from 'react-redux'
// import * as Api from '../api/apiCall';

import "./main.css"

class Vacations extends Component {
     
    state = {
        loged_in_vacations: "loged_in_vacations",
        regular_vacations: "regular_vacations",

    }

    componentDidMount = () => {
        if(this.props.loged_in_user!== -1){
        }
        let role = localStorage.getItem("role")
        role =  Number(JSON.parse(role))
        if(role)
            this.props.isAManeger(true);
        else
            this.props.isAManeger(false);
        console.log("user id vications : " ,this.props.loged_in_user)
        console.log("role Log-in: " ,this.props.is_a_meneger)
    }

    onChange(e) {
    }

    render() {
        let div_container = this.props.loged_in_user !== -1 ? <VacationList></VacationList> : <VacationRegular></VacationRegular>
        return (
            <div className="vacation-container">
                {div_container}
            </div>

        );
    }
}

const mapStateToProps = state => {
    // console.log("State : ", state)
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

export default  connect(mapStateToProps, mapDispatchToProps)(Vacations);