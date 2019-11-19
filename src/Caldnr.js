import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default class Caldnr extends Component {
    Constructor(props) {
        super(props);
        this.state = { 
          events:[]
          };
        const now = new Date();
      }
        componentDidMount(){
          var tokens=localStorage.getItem("orderAppToken");
          axios.get("https://minutes-of-meeting.herokuapp.com/List-my-events/",
          {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
         .then(resp=>{
          let events=resp.data;
          this.setState({events})
            //  console.log(events)
    
        });
        }
    
      render() {
        return (
          <div>
          
            <div style={{ height: '400px',padding:"20px"}}>
            
              <Calendar
                events={this.state.events}
                titleAccessor="meeting_name"
               startAccessor="meeting_start_date_time"
               endAccessor="meeting_start_date_time"
    
                defaultDate={moment().toDate()}
    
                localizer={localizer}
              />
             
            </div>
            </div>
        )
    }
}
export default Caldnr;