import React, { Component } from 'react';
import './Vacation-list.css';
import VacationCard from '../Vacation_Card/Vacation_Card'
import UploadImage from '../Vacation-list/UploadImage'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as Api from '../../api/apiCall';
import { useRef } from "react";
import socketIOClient from "socket.io-client";

class VacationList extends Component {


    socket;
    state = {
        endpoint: "localhost:6003",
        vacation: {}
    };

    filesToUpload;
    uploaded_picture = ""
    
    componentDidMount = () => {
        //start socket
        // this.socket = socketIOClient(this.state.endpoint);
        this.socket = socketIOClient(this.state.endpoint);
        this.socket.on('update-vacation2', () =>{
            console.log("ON : ")
            this.getAllVacations();
        })

        //get all vacations
        this.getAllVacations()
        let user = localStorage.getItem("user")
        let role = localStorage.getItem("role")
        user =  Number(JSON.parse(user))
        role =  Number(JSON.parse(role))
        // console.log("userId vacation list: " ,user)
        // console.log("role vacation list: " ,role)
        this.props.updateLogedInUser(user);
        if(role === 1)
            this.props.isAManeger(true);
        else
            this.props.isAManeger(false);
    }

        // // sending sockets
        // send = () => {
        //     console.log("Send : ", this.state.vacation)
        //     this.socket.emit('updateVacation', this.state.vacation) // change 'red' to this.state.color
        // }

    getAllVacations = async () => {
        let ob = {
            userId:this.props.loged_in_user
         }
        let vacation
        if(this.props.is_a_meneger){
            vacation = await Api.getRequest("/vacations/getAllVacations")
             // console.log("vacation : ", vacation.data)
            let likes = await Api.getRequest("/vacations/calcAllLikedVacations")
            // console.log("likes : ", likes.data)
        }
        else
            vacation = await Api.postRequest("/vacations/getVacationsByLikeOrder",ob)
        this.props.updateVacations(vacation.data);
    }


    likeVacation = async (vacationId) => {
        let ob={
            userId:this.props.loged_in_user,
            vacationId:vacationId,
         }
        //if it alrady liked it will unlikeit on another click
        let likeresult = await Api.postRequest("/vacations/likeVacation",ob)
        if(likeresult.status === 204){
            //unliked
            console.log("unliked")
        }
        else{
            //liked
            console.log("liked!")
        }
        ob.id = ob.vacationId
        delete ob.vacationId
        //update in vacation list the num of likes 
        let likes = await Api.postRequest("/vacations/calcLikedVacations",ob)
        //update the vacation list 
        this.getAllVacations();
    }

    deleteVacations = async (vacationId) => {
        console.log("delete : ",vacationId)
        let ob ={
            id:vacationId
        }
        if(window.confirm("Are you sure you whant to delete this vacation?") === true) {
            let vacation = await Api.postRequest("/vacations/deleteVacations",ob)
            this.getAllVacations()
            // console.log("vacation : ", vacation.data)
        };
    }

    openEditModal = async (vacationId) => {
        console.log("edit : ",vacationId)
        this.imgInput.value = "";
        let edit_vacation  = this.props.vacations.find( vacation => vacation.id === vacationId);
        this.edit_vacation_destination.value=edit_vacation.destination;
        this.edit_vacation_description.value=edit_vacation.description;
        this.edit_vacation_startdate.value= edit_vacation.start_date;
        this.edit_vacation_enddate.value= edit_vacation.end_date;
        this.edit_vacation_price.value=edit_vacation.price;
        this.edit_vacation_id.value=edit_vacation.id;
        this.uploaded_picture = edit_vacation.picture;
    }

    openAddVacationModel = async () => {
        //update values in modal to the clicked vication
        this.edit_vacation_destination.value = null;
        this.edit_vacation_description.value = null;
        this.edit_vacation_startdate.value = null;
        this.edit_vacation_enddate.value = null;
        this.edit_vacation_price.value = null;
        this.edit_vacation_id.value = -1;
        this.uploaded_picture = "";
        this.imgInput.value = "";
    }


    editVacations = async (vacationId) => {
        let ob = {
            id:vacationId,
            destination: this.edit_vacation_destination.value,
            description: this.edit_vacation_description.value,
            start_date: this.edit_vacation_startdate.value,
            end_date: this.edit_vacation_enddate.value,
            price: this.edit_vacation_price.value,
            picture: this.uploaded_picture,
        }

        if(vacationId !== "-1"){
            //checking if there is a need to upload picture into the database in edit :
            let editVacation  = this.props.vacations.find( vacation => vacation.id == vacationId);
            if(ob.picture !=  editVacation.picture)
            {
                console.log("picture : ", ob.picture);
                this.upload()
                this.imgInput.value = "";
            }
            let vacation = await Api.postRequest("/vacations/editVacations",ob)
            this.socket.emit('update-vacation2');
            //setTimeout(() => { this.socket.emit('updateVacation', ob); }, 100);

            //close the modal
            this.closeEditModal.click();
            //update the vacations
            //this.getAllVacations();
        }
        else {
            //add vacation
            if(ob.destination == "" || ob.description == ""  || ob.start_date == "" || ob.end_date == "" || ob.price == "" ){
                alert("Please fill all the components");
            }
            else{
                delete ob.id; 
                if(ob.picture == ""){
                    delete ob.picture; 
                }
                else this.upload()
                
                console.log("ob", ob)
                //add vication
                let vacation = await Api.postRequest("/vacations/insertVacation", ob)
                console.log("vacation add : ", vacation.data)
                console.log("vacation add : ",ob)
                //close modal
                this.closeEditModal.click();
                //update the vacations
                this.getAllVacations();
            }


        }
    }

    fileChangeEvent = (fileInput) => {
        this.filesToUpload = fileInput.target.files;
        console.log("filesToUpload : ",this.filesToUpload);
        console.log("this.imgInput : ", this.imgInput);
        if(this.filesToUpload[0] !== undefined)
            this.uploaded_picture =  this.filesToUpload[0].name;
    }

    upload = async () => {
        const formData = new FormData();
        const files = this.filesToUpload;

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i]);
        }
        console.log("UPLOAD ")
        let res = await Api.postRequest('/upload', formData)
    }




    render() {
    //console.log("render ",this.props.vacations);

    let addVacationCard = this.props.is_a_meneger ? <div className="col-4">
                                                    <div id="add-card" data-toggle="modal" data-target="#editModal" onClick={() =>  this.openAddVacationModel()}  >
                                                        <div className="add-wrapper">
                                                        <svg id="add-icon" fill="#ffffff" viewBox="0 0 24 24" width="96px" height="96px">
                                                            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"/>
                                                        </svg>
                                                    </div>
                                                    </div>
                                                </div> : null;
        return (
            <div className="loged_in-maneger-container container">
                <div className="loged_in_vacations row">
                    {/* add vication card */}
                {addVacationCard}
                {
                    this.props.vacations.map((vacation, index) => <VacationCard key={index} singleVacation={vacation} likeVacation={this.likeVacation} deleteVacations={this.deleteVacations} openEditModal={this.openEditModal}></VacationCard>)
                }
                </div>


                
            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Edit Vavation</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Destination</span>
                </div>
                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={ref => this.edit_vacation_destination = ref}/>
                </div>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                </div>
                <textarea type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={ref => this.edit_vacation_description = ref}/>
                </div>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Start Date</span>
                </div>
                <input type="date" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={ref => this.edit_vacation_startdate = ref}/>
                </div>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">End Date</span>
                </div>
                <input type="date" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={ref => this.edit_vacation_enddate = ref}/>
                </div>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Price</span>
                </div>
                <input type="number" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={ref => this.edit_vacation_price = ref}/>
                </div>
                </div>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <input type="file" id="img" name="img" accept="image/*" onChange={($event) => this.fileChangeEvent($event)} ref={ref => this.imgInput = ref} />
                </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" ref={input => this.closeEditModal = input}  data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary"  ref={ref => this.edit_vacation_id = ref} onClick={() =>  this.editVacations(this.edit_vacation_id.value)} >Save changes</button>
                </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log("State : ", state)
    return {
        vacations: state.vacations,
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
        updateVacations(value){
            dispatch({
                type: 'updateVacations',
                payload: value
            })
        },
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(VacationList);