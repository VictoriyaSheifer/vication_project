import React, { Component } from 'react';
import './Graph.css';

import * as Api from '../../api/apiCall';
import { VictoryBar, VictoryChart, VictoryZoomContainer ,VictoryBrushContainer} from 'victory';

class Graph extends Component {

  /*
created two graphs big one and a small one for scrolling if there are meny vacations
in the graphs there will be only the liked ones by the users 
  */
        state = {
            data:[],
            //place the defult position of the view
            selectedDomain:{
                x:[1, 6],
                y:[0, 5],
            },
            zoomDomain:{
                x:[1, 6],
                y: [0, 5],
            }
        }

    componentDidMount(){
        this.getfilterdVacations()
    }

    getfilterdVacations = async () => {
        //get only the needed info from the server 
        let vacations = await Api.getRequest("/vacations/getfilterdVacations")
        let data = [];
        //go over the data and push only the liked ons 
        vacations.data.map(vication =>{
            let object={
                vacation_name : vication.destination,
                followers : vication.num_of_followers
            }
            if(object.followers !=0)
                data.push(object)
        })
        //update the data 
        this.setState({data})
    }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    return (
      <div className="graph-container">
          <VictoryChart
            width={550}
            height={200}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryBar
                x="vacation_name"
                y="followers"
                data={this.state.data}
                style={{
                    data: {
                      fill: "#439e7b",
                    }
                  }}
            />

          </VictoryChart>

          <VictoryChart
            width={550}
            height={90}
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush.bind(this)}
                brushStyle={{fill: "teal", opacity: 0.2}}
              />
            }
          >
            <VictoryBar
                x="vacation_name"
                y="followers"
              data={this.state.data}
              style={{
                data: {
                  fill: "#165c41",
                }}}
            />
          </VictoryChart>
      </div>
    );
  }
}

export default Graph;