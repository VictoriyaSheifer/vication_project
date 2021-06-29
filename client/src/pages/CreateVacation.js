import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Api from '../api/apiCall';
import "./main.css"

class CreateVacation extends Component {

    componentDidMount = () => {
        this.getAllTeams();
    }

    getAllTeams = async () => {
        let teams = await Api.getRequest("/development_team/getAllDevTeams")
        this.props.updateTeams(teams.data);
        console.log("DevTeams : ", teams.data)
    }

    saveInServer = async () => {
        let ob = {
            devTeamId: this.props.selected_team,
            meeting_description: this.refs.meeting_description.value,
            room: this.refs.room.value,
            end_date: this.refs.to_date.value + " " + this.refs.to_time.value, 
            start_date : this.refs.from_date.value + " " + this.refs.from_time.value, 
         }
        
        let meeting = await Api.postRequest("/meetings/createMeeting", ob)
        this.props.updateMeetings(meeting.data);
    }

    onChange(e) {
        this.props.update_selected_team(e.target.value);
    }



    render() {
        return (
            <div className="container insert-conteiner">
                <div className="content-container">
                <form>
                <div className="form-row row m-2">
                    <div className="form-group col-12">
                    <label >Team:</label>
                        <select className="form-select" aria-label="Default select example"  onChange={(e) => this.onChange(e)}>
                        <option selected>Select Team</option>
                        {
                            this.props.teams.map((team,i)=> {
                                return <option key={i} value={team.id}>{team.name}</option>
                            })
                        }
                        </select>
                     </div>
                </div>

                <div className="form-row row m-2">

                <div className="form-group col-5 m-3">
                    <label for="inputPassword4">from :</label>
                        <div className="row">
                            <input id="date" type="date" ref="from_date"/>
                            <input type="time" id="time" ref="from_time"/>
                        </div>
                    </div>
                <div className="form-group col-5 m-3">
                    <label for="inputPassword4">To :</label>
                        <div className="row">
                            <input id="date" type="date"  ref="to_date"/>
                            <input type="time" id="time"  ref="to_time"/>
                        </div>
                </div>

                </div>

                <div className="form-row row m-2">
                    <div className="form-group col-12">
                    <label>Description:</label>
                    <input type="text" className="form-control" ref="meeting_description" placeholder="Description"/>
                     </div>
                </div>
                <div className="form-row row m-2">
                    <div className="form-group col-12">
                    <label >Room:</label>
                    <input type="text" className="form-control" ref="room" placeholder="Room"/>
                     </div>
                </div>
                
                <button type="submit" className="btn btn-dark m-2"  onClick={(e) => this.saveInServer(e)}>Add Meeting</button>
                </form>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    console.log("State : ", state)
    return {
        teams: state.teams,
        selected_team: state.selected_team,
        meetings: state.meetings
        
    }
}


const mapDispatchToProps = dispatch => {
    return {
        updateTeams(value){
            dispatch({
                type: 'updateTeams',
                payload: value
            })
        },
        update_selected_team(value){
            dispatch({
                type: 'update_selected_team',
                payload: value
            })
        },
        updateMeetings(value){
            dispatch({
                type: 'updateMeetings',
                payload: value
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVacation);