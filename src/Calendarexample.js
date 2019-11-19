import React,{useState,useEffect} from 'react'
import { render } from 'react-dom';
import { Calendar, Views,momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import axios from 'axios';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {M} from 'materialize-css'

const localizer = momentLocalizer(moment);

function Calendarexample(props) {
  let [events, setEvents] = useState([])
  let [event, setEvent] = useState([])
  let [eventss, setEventss] = useState([])
  let [agendaItems, setAgendaItems] = useState([])
  let [token, setToken] = useState(localStorage.getItem("orderAppToken"))
  let [show,setShow]=useState(false)
  let[title,setTitle]=useState()
  var[time,setTime]=useState()
  useEffect(() => {
    var tokens = localStorage.getItem("orderAppToken");
    axios.get("https://minutes-of-meeting.herokuapp.com/List-my-participation-meetings/",
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${tokens}` } })
      .then(resp => setEvents(resp.data))


  }, [])
  let selectHandler = (i, j,k) => {
   setTitle(j)
   setTitle(k)
// setShow(true)
// instance.open();
 alert("Event-name:"+k+"----Time:"+j)
//  document.getElementById('modal1');


    axios.get(`https://minutes-of-meeting.herokuapp.com/Create-agendaList/${i}/`,
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` } })
      .then(resp => {
        // console.log(resp.data)
        axios.get("https://minutes-of-meeting.herokuapp.com/add-agenda/",
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` }
          })
          .then(list => {
            
            
            // console.log(list.data)
            setAgendaItems([...agendaItems, list.data.filter((j) => {

              return resp.data.agenda_points == j.id
            })])
           
          }
         )



      }
      )
      // if(agendaItems.length){
      //   document.getElementById("modal1")
      // }
   
  }
  // console.log(new Date("2019-11-14T14:22:00Z"))

  const tess = events.map((i) => {
    // console.log(i)
    const date = new Date(i.meeting_start_date_time);
    // console.log(date)
    date.setHours(date.getHours() - 5);
    date.setMinutes(date.getMinutes() - 30);

    // console.log(date)
    const en = date;
    // console.log(i.duration)
    // en.setHours( en.getHours() - 5 );
    // en.setMinutes( en.getMinutes() - 30 );
    en.setMinutes(en.getMinutes() + i.meeting_duration);
    // console.log(en)
    return {
      id: i.id,
      title: i.meeting_name,
      start: date,
      end: date
    }
  }

  )
  // console.log(events)
  // console.log(tess)
    return (
      <div>

        
        
      
        <div style={{ height: '560px',padding:"20px"}}>
       
          <Calendar 
events={tess}
            titleAccessor="title"
           startAccessor="start"
           endAccessor="end"                   
           onSelectEvent={(events) => selectHandler(events.id, events.start,events.title)}           
            localizer={localizer}
          />
         
        </div>
        {/* {
         show?
         
            
          <div class="view_details" style={{position:'absolute',top:'40%',left:'40%',zIndex:1,opacity:"1"}} >
           
            <div class="col s12" style={{border:"1px solid black"}}>
             <i class="material-icons medium ">chevron_left</i>
            </div>
        
              <div class="col s12 mdl"  >
                     <div  class=" col s12 mkuy ">
  <i class="material-icons left">supervisor_account</i>  <h4>{title}</h4><br/>
                      </div>
                      <div class="col s6">
                    <i class="material-icons left ">access_time</i><p>{time}</p>
                    </div>
                   <p>Agenda of the meeting</p>
              <div>
            
        
            <li>case stories has been shared by the vasara team</li>
            <li>case stories has been shared by the vasara team</li>
        
              </div>
              </div>
        
          
         
         
      </div>
          :""

        } */}
        <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
      </div>
    );
  }

export default Calendarexample;