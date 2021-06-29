import { Component } from 'react';
import './Vacation_Card.css';
import Moment from 'moment';
import { connect } from 'react-redux';

class VacationCard extends Component {

    componentDidMount() {
        console.log("singleVacation :::", this.props.singleVacation)
    }

    render() {
        let image_path = "http://www.localhost:5000/" +  this.props.singleVacation.image_path
        let start_date = this.props.singleVacation.start_date ? Moment(this.props.singleVacation.start_date).format('d MMM') : "No Date Mentiond" ;
        let end_date = this.props.singleVacation.end_date ? Moment(this.props.singleVacation.end_date).format('d MMM') : "No Date Mentiond" ;
        console.log("is a menager ? " , this.props.is_a_meneger) 
        let card_options = this.props.is_a_meneger ? <div className="vacation-option-wrapper-manager"><i class="fas fa-times-circle fa-lg"></i><i class="fas fa-edit fa-lg"></i></div> : <div className="vacation-option-wrapper-user"><i class="fas fa-heart fa-lg"></i></div>

        return (
            <div className="col-4 mt-4">
                <div className="card">
                <img className="card-img-top" src={image_path} alt="Card image cap"></img>
                <div class="card-img-overlay">
                {card_options}
                </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.singleVacation.destination}</h5>
                        <p className="card-text">{this.props.singleVacation.description}</p>
                        <p className="card-text">Dates :{start_date} - {end_date}</p>
                    </div>
                    <div className="card-footer text-muted">
                    price : {this.props.singleVacation.price}
                    </div>
                </div> 
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("State : ", state)
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