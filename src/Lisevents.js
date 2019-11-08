import React,{useState,useEffect} from 'react';

import Header from './Header'
import axios from 'axios';
import {BrowserRouter,Route,Link} from 'react-router-dom';
function Lisevents(props) {
 
    let[list,setList]=useState([]);
    useEffect(()=>{
        axios.get("https://minutes-of-meeting.herokuapp.com/create-event/")
        .then(resp=>setList(resp.data))
        axios.get("https://minutes-of-meeting.herokuapp.com/Create-agenda/")
        .then(resp=>console.log(resp.data))


         }
    )
    return (
        <div>
           <Header />
          <Link to="/UserDashboard.js"><h7>Back To Dashboard</h7></Link>
          <h3>List of All Events</h3>
            <table className="striped">
        <thead>
          <tr>
          <th>meeting_id</th>
              <th>meeting_name</th>
              <th>meeting_start_date_time</th>
              <th>meeting_location</th>
              <th>description</th>
              {/* <th>participant_email</th> */}
          </tr>
        </thead>
        <tbody>
        {
                  list.map(i=>
          <tr>
            <td>{i.id}</td>
            <td>{i.meeting_name}</td>
            <td>{i.meeting_start_date_time}</td>
            <td>{i.meeting_location}</td>
            <td>{i.description}</td>
            {/* <td>{i.participant_email}</td> */}
          
          </tr>
                   )}
        </tbody>
      </table>
      <Link to="/UserDashboard.js"><h7>Back To Dashboard</h7></Link>
        </div>
    )
}

export default Lisevents
