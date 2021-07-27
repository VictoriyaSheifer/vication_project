import { Component } from 'react';
import './Vacation_Card.css';
import Moment from 'moment';
import { connect } from 'react-redux';

class VacationCard extends Component {


    componentDidMount() {
    }

    render() {
        let likeBntStatus = "fas fa-heart fa-lg unliked-vacation"
        let image_path = "http://www.localhost:5000/" +  this.props.singleVacation.picture
        let start_date = this.props.singleVacation.start_date ? Moment(this.props.singleVacation.start_date).format('d MMM') : "No Date Mentiond" ;
        let end_date = this.props.singleVacation.end_date ? Moment(this.props.singleVacation.end_date).format('d MMM') : "No Date Mentiond" ;
        let card_options = this.props.is_a_meneger ? <div className="vacation-option-wrapper-manager"><i className="fas fa-times-circle fa-lg"  onClick={() =>  this.props.deleteVacations(this.props.singleVacation.id)} ></i><i className="fas fa-edit fa-lg"  data-toggle="modal" data-target="#editModal" onClick={() =>  this.props.openEditModal(this.props.singleVacation.id)}></i></div> : <div className="vacation-option-wrapper-user"><i className={likeBntStatus}  onClick={() =>  this.props.likeVacation(this.props.singleVacation.id)}></i></div>
        let card_footer = this.props.is_a_meneger ? <p>price : {this.props.singleVacation.price}  likes:{this.props.singleVacation.num_of_followers}</p> : <p>{this.props.singleVacation.price}</p>
        return (
            <div className="col-4">
                <div className="card vacations-cards">
                <img className="card-img-top" src={image_path} alt="Card image cap"></img>
                <div className="card-img-overlay">
                {card_options}
                </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.singleVacation.destination}</h5>
                        <p className="card-text card-description">{this.props.singleVacation.description}</p>
                        <p className="card-text">Dates :{start_date} - {end_date}</p>
                    </div>
                    <div className="card-footer text-muted">
                    {card_footer}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        is_a_meneger: state.is_a_meneger,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        isAManeger(value){
            dispatch({
                type: 'isAManeger',
                payload: value
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacationCard);