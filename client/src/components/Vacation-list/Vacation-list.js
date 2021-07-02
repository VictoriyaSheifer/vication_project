import React, { Component } from 'react';
import './Vacation-list.css';
import VacationCard from '../Vacation_Card/Vacation_Card'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as Api from '../../api/apiCall';

class VacationList extends Component {

    componentDidMount = () => {
        this.getAllVacations()
        let user = localStorage.getItem("user")
        let role = localStorage.getItem("role")
        user =  Number(JSON.parse(user))
        role =  Number(JSON.parse(role))
        console.log("userId vacation list: " ,user)
        console.log("role vacation list: " ,role)
        this.props.updateLogedInUser(user);
        if(role)
            this.props.isAManeger(true);
        else
            this.props.isAManeger(false);
    }

    getAllVacations = async () => {
        let vacation = await Api.getRequest("/vacations/getAllVacations")
        this.props.updateVacations(vacation.data);
        console.log("vacation : ", vacation.data)
    }

    likeVacation = async (vacationId) => {
        let ob={
            "userId":this.props.loged_in_user,
            "vacationId":vacationId
         }
        let liked_vacation = await Api.postRequest("/vacations/getUsersLikesVacations",ob)
        console.log("liked_vacation : ", liked_vacation.data)
        let found = liked_vacation.data.rows.find( vacation => vacation.vacationId == vacationId);

        if(found){
            let vacation = await Api.postRequest("/vacations/unlikeVacation",ob)
            console.log("vacation : ", vacation.data)
        }
        else{
            let vacation = await Api.postRequest("/vacations/likeVacation",ob)
            console.log("vacation : ", vacation.data)
        }
    }

    render() {
       console.log("render ",this.props.vacations)
        return (
            <div className="loged_in-maneger-container container">
                <div className="loged_in_vacations row">
                {
                    this.props.vacations.map((vacation, index) => <VacationCard key={index} singleVacation={vacation} likeVacation={this.likeVacation}></VacationCard>)
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("State : ", state)
    return {
        vacations: state.vacations,
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
        isAManeger(value){
            dispatch({
                type: 'isAManeger',
                payload: value
            })
        },
        updateVacations(value){
            dispatch({
                type: 'updateVacations',
                payload: value
            })
        },
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(VacationList);