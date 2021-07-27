import React, { Component } from 'react';
import './Graph.css';

import * as Api from '../../api/apiCall';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryZoomContainer ,VictoryBrushContainer} from 'victory';

class Graph extends Component {

        state = {
            data:[],
            vication_names:[],
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
        let vacations = await Api.getRequest("/vacations/getfilterdVacations")
        let vication_names = vacations.data.map(vication => vication.destination)
        let data = [];
        vacations.data.map(vication =>{
            let object={
                vacation_name : vication.destination,
                followers : vication.num_of_followers
            }
            if(object.followers !=0)
                data.push(object)
        })
        this.setState({data})
        this.setState({vication_names})
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
            scale={{x: "vacations"}}
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
            <VictoryAxis
              tickFormat={this.state.vication_names}
              
            />
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