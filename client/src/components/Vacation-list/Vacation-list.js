import React, { Component } from 'react';
import './Vacation-list.css';
import VacationCard from '../Vacation_Card/Vacation_Card'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as Api from '../../api/apiCall';

class VacationList extends Component {

    componentDidMount = () => {
        this.getAllVacations()
    }

    getAllVacations = async () => {
        let vacation = await Api.getRequest("/vacations/getAllVacations")
        this.props.updateVacations(vacation.data);
        console.log("vacation : ", vacation.data)
    }

    render() {
        //let vacations_list = this.props.vacations ? this.props.vacations.map((vacation, index) => <VacationCard key={vacation.id} singleVacation={vacation} index={index} />) : <div></div>
        console.log("render ",this.props.vacations)
        //let vacations = this.props.vacations
        return (
            <div className="loged_in-maneger-container container">
                <div className="loged_in_vacations">
                {
                    // vacations.map((vacation, index) => <div>{vacation.destination}</div>)
                    this.props.vacations.map((vacation, index) => <VacationCard key={index} singleVacation={vacation}></VacationCard>)
                }
                {/* <VacationCard key={vacation} singleVacation={vacation} index={index} />) */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("State : ", state)
    return {
        vacations: state.vacations,
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