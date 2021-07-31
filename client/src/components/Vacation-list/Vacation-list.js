import React, { Component , useRef } from 'react';
import './Vacation-list.css';
import VacationCard from '../Vacation_Card/Vacation_Card'
import { connect } from 'react-redux'
import * as Api from '../../api/apiCall';
import socketIOClient from "socket.io-client";

class VacationList extends Component {

    socket;
    state = {
        endpoint: "localhost:5003",
    };
    filesToUpload;
    uploaded_picture = ""
    
    componentDidMount = () => {
        this.getAllVacations()
        //start socket
        this.socket = socketIOClient(this.state.endpoint, { transports: ["websocket", "polling", "flashsocket"] });

        this.socket.on('update-vacation', () =>{
            //get all vacations
            this.getAllVacations();
        })
        this.socket.on('delete-vacation', () =>{
            //get all vacations
            this.getAllVacations();
        })

        //grt loged in user id and role if refreshed 
        let user = localStorage.getItem("user")
        let role = localStorage.getItem("role")
        user =  Number(JSON.parse(user))
        role =  Number(JSON.parse(role))
        // console.log("userId vacation list: " ,user)
        // console.log("role vacation list: " ,role)

        //update it in the reduser 
        this.props.updateLogedInUser(user);
        if(role === 1)
            this.props.isAManeger(true);
        else
            this.props.isAManeger(false);
    }

    /*
    In this function we call the server and get the vacations.
    if the menager loged in we call all vacations 
    if user loged in we get the vacations by order of likes
    */
    getAllVacations = async () => {
        let ob = {
            userId:this.props.loged_in_user
         }
        let vacation
        //check to see if theis is a user 
        if(this.props.is_a_meneger){
            vacation = await Api.getRequest("/vacations/getAllVacations")
             // console.log("vacation : ", vacation.data)
             //update the vacations likes
            let likes = await Api.getRequest("/vacations/calcAllLikedVacations")
            // console.log("likes : ", likes.data)
        }
        else{
            //get the vacation by like order 
            vacation = await Api.postRequest("/vacations/getVacationsByLikeOrder",ob)
            //call to get the liked vacations of this user in arry for like bnts
            this.getAllUsersLikedVacations();
            }

        //update the vacations in the redusers
        this.props.updateVacations(vacation.data);
    }

    /*
    In this function updates the liked vacation array in the redusers by the logged in user 
    */
    getAllUsersLikedVacations = async () => {
        let ob = {
            userId:this.props.loged_in_user
        }
        //get the vacation array 
        let vacation = await Api.postRequest("/vacations/getUsersLikedVacations",ob)
        //update the array
        this.props.updatelikedVacationsByUser(vacation.data);
        //console.log("liked vacation : ", vacation.data)
    }

    /*
    This function activates when like bnt is clicked.
    if the vacation is already liked it will unlike it and update the order of the vacations.
    */
    likeVacation = async (vacationId) => {
        //create the object with the wonted params
        let ob={
            userId:this.props.loged_in_user,
            vacationId:vacationId,
         }
        //if it alrady liked it will unlikeit on another click unlike= status == 204 like status == 200
        await Api.postRequest("/vacations/likeVacation",ob)
        //delete id to use the same ob 
        ob.id = ob.vacationId
        delete ob.vacationId
        //update in vacation list the num of likes 
        await Api.postRequest("/vacations/calcLikedVacations",ob)
        //update the vacation list 
        this.getAllVacations();
    }

    /*
    This function deleate vication from the server by vacationId
    */
    deleteVacations = async (vacationId) => {
        console.log("delete : ",vacationId)
        let ob ={
            id:vacationId
        }
    //asking the user if they are sure 
        if(window.confirm("Are you sure you whant to delete this vacation?") === true) {
            //deleting from the server
            await Api.postRequest("/vacations/deleteVacations",ob)
            //updating at all sessions
            this.socket.emit('delete');
            // console.log("vacation : ", vacation.data)
        };
    }

    /*
    this function is used when wanting to edit vcation.
    updates all the inputs to the clicked vacations details.
    */
    openEditModal = async (vacationId) => {
        //console.log("edit : ",vacationId)
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

    /*
    this function is used when wanting to add new vcation.
    Cleans all the input.
    */
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

    /*
    this function is used when wanting to save the edit vcation or adding new one.
    */
    saveVacations = async (vacationId) => {
        //creting an ob to send to the server
        let ob = {
            id:vacationId,
            destination: this.edit_vacation_destination.value,
            description: this.edit_vacation_description.value,
            start_date: this.edit_vacation_startdate.value,
            end_date: this.edit_vacation_enddate.value,
            price: this.edit_vacation_price.value,
            picture: this.uploaded_picture,
        }

        //vacationId -1 means it is new vacation else need to update the existing vacation
        if(vacationId !== "-1"){
            //checking if there is a need to upload picture into the database in edit :
            let editVacation  = this.props.vacations.find( vacation => vacation.id == vacationId);
            if(ob.picture !=  editVacation.picture)
            {
                //console.log("picture : ", ob.picture);
                //upload the picture and updating the input value
                this.upload()
                this.imgInput.value = "";
            }

            let vacation = await Api.postRequest("/vacations/editVacations",ob)
            //update the vacations in all sessions
            this.socket.emit('update-vacation2')
            //close the modal
            this.closeEditModal.click();
        }
        else {
            //add vacation
            if(ob.destination == "" || ob.description == ""  || ob.start_date == "" || ob.end_date == "" || ob.price == "" ){
                alert("Please fill all the components");
            }
            else{
                //delete all un nesesery filleds
                delete ob.id; 
                if(ob.picture == ""){
                    delete ob.picture; 
                }
                else this.upload()
                //console.log("ob", ob)
                //add vication
                let vacation = await Api.postRequest("/vacations/insertVacation", ob)
                //close modal
                this.closeEditModal.click();
                //update the vacations
                this.socket.emit('update-vacation2');
            }
        }
    }

    /*
    this function updates the uploaded_picture value if there is one to upload
    */
    fileChangeEvent = (fileInput) => {
        this.filesToUpload = fileInput.target.files;
        // console.log("filesToUpload : ",this.filesToUpload);
        // console.log("this.imgInput : ", this.imgInput);
        if(this.filesToUpload[0] !== undefined)
            this.uploaded_picture =  this.filesToUpload[0].name;
    }

    /*
    this function updates the picture to the server
    */
    upload = async () => {
        const formData = new FormData();
        const files = this.filesToUpload;
        //if there is more then one picture 
        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i]);
        }
        let res = await Api.postRequest('/upload', formData)
        //console.log("UPLOAD :",res)
    }




    render() {
    //console.log("render ",this.props.vacations);

    // creating an additionat card to add vacation only if this is a menager loged in.
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
                {/* all vication card */}
                {
                    this.props.vacations.map((vacation, index) => <VacationCard key={index} singleVacation={vacation} likeVacation={this.likeVacation} deleteVacations={this.deleteVacations} openEditModal={this.openEditModal}></VacationCard>)
                }
                </div>

                {/* module add and edit vacatiom */}
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
                    <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <input type="file" id="img" name="img" accept="image/*" onChange={($event) => this.fileChangeEvent($event)} ref={ref => this.imgInput = ref} />
                    </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" ref={input => this.closeEditModal = input}  data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"  ref={ref => this.edit_vacation_id = ref} onClick={() =>  this.saveVacations(this.edit_vacation_id.value)} >Save changes</button>
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
        likedVacationsByUser: state.likedVacationsByUser,
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
        updatelikedVacationsByUser(value){
            dispatch({
                type: 'updatelikedVacationsByUser',
                payload: value
            })
        },
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(VacationList);