
import React,{useState,useEffect} from 'react'
import { render } from 'react-dom';
import { Calendar, Views,momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import {BrowserRouter,Route,withRouter,Link} from 'react-router-dom';
import axios from 'axios';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {M} from 'materialize-css'
import {Preloader,Row,Col} from 'react-materialize'


const localizer = momentLocalizer(moment);

function Calendarexample(props) {
  let [events, setEvents] = useState([])
  let [event, setEvent] = useState([])
  let [eventss, setEventss] = useState([])
  let [agendaItems, setAgendaItems] = useState([])
  let [displayList, setDisplayList] = useState([])
  let [tokens, setTokens] = useState(localStorage.getItem("orderAppToken"))
  let [show,setShow]=useState(false)
  let[title,setTitle]=useState()
  let[time,setTime]=useState()
  let[id,setId]=useState()
let[opac,setOpac]=useState("1")
  useEffect(() => {
    var tokens = localStorage.getItem("orderAppToken");
    axios.get("https://minutes-of-meeting.herokuapp.com/List-my-participation-meetings/",
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${tokens}` } })
      .then(resp => setEvents(resp.data))


  }, [])
  let selectHandler = (i, j,k) => {
    var hours=j.getHours(); // => 9
var min=j.getMinutes();
var today1=hours+':'+min;
  setTitle(k)
 setTime(today1)
   setId(i)


  setShow(true)

  
      


    axios.get(`https://minutes-of-meeting.herokuapp.com/Create-agendaList/${i}/`,
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${tokens}` } })
      .then(resp => {
        axios.get("https://minutes-of-meeting.herokuapp.com/add-agenda/",
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${tokens}` }
          })
          .then(list => {
                       
            console.log(list.data)
            resp.data.agenda_points.map(i=>{
              console.log(i)
              var result = list.data.filter((j) => {

                  return i == j.id
              })
          

              result.map(ele => {
                var arr = [ele]
                setAgendaItems(agendaItems => ([...agendaItems, arr]));
            })
         
            
          }
         
            )

           
          }
         )
        }
      )
     
  }

  let addHandler=()=>{
    setShow(false)
    setAgendaItems("")


  }
  

  const tess = events.map((i) => {
  // console.log(i.meeting_start_date_time)
    const date = new Date(i.meeting_start_date_time);
     //console.log(date, i.meeting_name)
    date.setHours(date.getHours() - 5);
    date.setMinutes(date.getMinutes() - 30);

    
    const en = date;
  // console.log(en)
    //en.setMinutes(en.getMinutes() + i.meeting_duration);
  
    return {
      id: i.id,
      title: i.meeting_name,
      start: en,
      end: en
    }
  }

  )
  
 // console.log(agendaItems)
    return (
      <div>
        

        
{

         show?
         
         <div style={{margin: "0px",
          padding: "0px",
          position: "fixed",
          right: "0px",
          top: "0px",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",zIndex:99}}
            >
         <div class="view_details"  style={{position:'absolute', backgroundColor:"white",height:"300px", top:'40%',left:'40%',width:"35%", zIndex:999}}>
           

         <div class="col s12" >  
                    <a onClick={addHandler}><i class="material-icons medium arw-icon ">chevron_left</i></a>      
               </div>
                      <div class="col s12 mdlpop">
                     <div  class=" col s12 mkuy ">
                           <i class="material-icons left">supervisor_account</i>  <p class="mdl-titl">{title}</p>
                      </div>
                     

                      <div class="col s12">
                    <i class="material-icons left ">access_time</i><p class="mdl-titl">{time}</p>
                    </div>
                    
                   <p class="cal-agda">Agenda of the meeting</p>   
                         <div class="cal_agnda_list">
                  {
                   agendaItems&&agendaItems.length?
                           agendaItems.map((i)=>{
                                return <li>{i[0].agenda}</li>
                           })
                            :(<Row >
   
                              <Col s={6}>
                              <Preloader flashing  />
                              </Col></Row>)
                  }
                        
        
                         </div>
              </div>
        
         
      </div></div>
          :""

        }
        
        <div style={{ height: '560px',padding:"20px"}}>
       
          <Calendar 
events={tess}
            titleAccessor="title"
           startAccessor="start"
           endAccessor="end"                   
           onSelectEvent={(events) => selectHandler(events.id, events.start,events.title)}           
            localizer={localizer}
            
var defaultMessages = {{
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'All Day',
  week: 'Week',
  work_week: 'Work Week',
  day: 'Day',
  month: 'Month',
  previous: '<',
  next: '>',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',
  agenda: 'Event',
  noEventsInRange: 'There are no events in this range.',
  showMore: function showMore(total) {
    return "+" + total + " more";}
  }}

          />
         
        </div>
      
        
       
      </div>
    );
  }

export default Calendarexample;