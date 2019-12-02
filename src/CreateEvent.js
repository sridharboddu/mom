 import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import nouislider from 'nouislider';
import './style.css';
import axios from 'axios';
import Header from './Header';

import {BrowserRouter,Route,Link} from 'react-router-dom';
import {Preloader,Row,Col,Select } from 'react-materialize'

function CreateEvent(props) {
  let [eventName,setEventName]=useState("");
  let[date,setDate]=useState("");
  let [email,setEmail]=useState(null)
  let [duration,setDuration]=useState(null)
  let[participants,setParticipants]=useState("");
  let[time,setTime]=useState("");
  let [participantList,setParticipantList]=useState("")
  let [searchList,setSearchList]=useState([])
  let [displayList,setDisplayList]=useState([localStorage.getItem("userEmail")])
  let [participantName,setParticipantName]=useState()
  let [proces,setProces]=useState(false)
let[tokens,setTokens]=useState(localStorage.getItem("orderAppToken"))
var[mintime,setMintime]=useState("")
var[mindate,setMindate]=useState("")
let[show,setShow]=useState(true);
var today = new Date();
 
var dd = String(today.getDate() ).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var hours=today.getHours(); // => 9
var min=today.getMinutes();

today= yyyy + '-' + mm + '-' + dd;
var today1=hours+':'+min;


  // Functionlity Part
  useEffect(()=>{
    let name=localStorage.getItem('userName');
    if(!localStorage.length){
       props.history.push("./");
    }
    let token=localStorage.getItem("orderAppToken");
 console.log(token)
    axios.get("https://minutes-of-meeting.herokuapp.com/List-mail/",
    {headers:{"Authorization":`Token ${token}`}})
    .then(resp=>
    { 
      console.log(resp.data)
      
       let emails=resp.data.map(
        i=>{
          return i.email;
        }
      )
      console.log(emails)
      setParticipantList(emails)
    },(error=>console.log(error))
    )
    console.log(participantList)
},[])


let selectHandler=(participantname)=>{
  console.log(email)
    if(email){
      
 let existing=displayList.filter(i=>{
   return participantname===i;
 })
 if(existing.length===0){
   console.log(email)
  setDisplayList([...displayList,email])
  console.log(displayList)
  }
  else
  {
    alert("participant is already added")
  }
  setEmail("")
}else alert("please enter Valid Email")
}


let deleteParticipant=(id)=>{
  if(window.confirm("Are you sure you want to delete")){
  let participants=Object.assign([],displayList)
  participants.splice(id,1)
 setDisplayList(participants)
  }

}


let eventHandler = e => {
  
  e.preventDefault();

if(displayList.length&&today1.length){
  setProces(true)
  
 
let da_ti=date+"T"+time+":00Z";


  console.log(da_ti);
  var obj = {
    meeting_name: eventName,
    meeting_start_date_time: da_ti,
    meeting_location: "bangalore",
    description: "scrum",
    meeting_participant: displayList.map(i => {
      
      return {
        participant_email: i
      };
    })
  };
  
   
  console.log(obj,duration)
  axios
    .post("https://minutes-of-meeting.herokuapp.com/create-meeting/", {
      meeting_name: eventName,
      meeting_start_date_time: da_ti,
      meeting_location: "bangalore",
      meeting_duration:duration,
      description: "scrum",
      meeting_participant: displayList.map(i => {
        
        return {
          participant_email: i
        };
      })
    },
    {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}}) 
   
    .then(resp =>{
      setProces(false)
      console.log(resp.data);
    localStorage.setItem("met_id",resp.data.id);
    localStorage.setItem("met_name",resp.data.meeting_name);
    props.history.push("/AddAgenda");
    },
    error=>{
      setProces(false)
      alert("pleace add Valid Participants emails")
    }
    )
    

}
else
alert("pleace add Participants")
 }

console.log(today1)

// End
//HTML UI Part


let checkhandler=(e)=>{
  
  if(today==date){
    if(e<=today1){

document.getElementById("fld").innerHTML="pls check the time";
    }
    else{
      setTime(e)
      document.getElementById("fld").innerHTML="";
    }

  }
  else{
    setTime(e)
    document.getElementById("fld").innerHTML="";
  }
}
  return (
    
    <div>
      
        <Header />
        <div class="row backgrond-col">

        <div class="card">
        
          <div class="row">

             <div class="col s1 title-icon">
             <Link to="/UserDashboard"> <i class="material-icons medium arw-icon ">chevron_left</i></Link>
            
             </div>
             <div class="col s5">
             <h5 class="createmeet">Create Meeting</h5>
             </div></div>
             {proces?
 <Row >
   <Col s={12} >
 <Col s={3}>
 <Preloader flashing  />
 </Col>
 <Col s={3}>
 <Preloader flashing  />
 </Col>
 <Col s={3}>
 <Preloader flashing />
 </Col>
 <Col s={3}>
 <Preloader flashing />
 </Col>
 </Col>
 </Row>

:(
             <form class="create-form " onSubmit={(e)=>eventHandler(e)}>
              
             <div class="create-label ">
             <h5 class="col s12 right-align">0/2</h5></div>
             <div class="progress">
         <div class="determinate" ></div>
     </div>
     
               
               <div class="row">
                 <div class="col s3 create-label2 ">Event name:</div>
                 <div class="col s9"> <input type="text"  autoComplete="off" onChange={(e)=>setEventName(e.target.value)} required  /></div>
                
                 <div class="col s6">
                    <div class="col s6 create-label2">Date:</div>
                   
                    
                        <div class="col s6">        
                         <input type="date" class="adj-inp" min={today} onChange={(e)=>setDate(e.target.value)} autoComplete="off" required></input>
                        </div>
                        </div>

                      
                        
               <div class="col s6"><div class="col s2 create-label2">Time:</div>
               <div class="col s6">  
               {
                 date.length?
               <input type="time"  class="adj-inp1"      onChange={(e)=>checkhandler(e.target.value)} autoComplete="off"  required></input>
:(
               <input type="time"  class="adj-inp1" disabled     onChange={(e)=>checkhandler(e.target.value)} autoComplete="off"  required></input>
   )   }  <label id="fld" class="tym-fld"></label>
                        </div></div>

                        <div class="col s3 create-label2">Event Duration:</div>
                 <div class="col s9"> 
                 <Select onChange={(e)=>setDuration(e.target.value)} required>
                 
<option value="">
select your choice
</option>
<option value="30">
30Minutes
</option>
<option value="60">
60Minutes
</option>
<option value="90">
90Minutes
</option>
<option value="120">
120Minutes
</option>

</Select>
                 </div>
                 <div class="col s3 create-label2">Participants:</div>
                 <div class="col s7">
                 <input  class="validate  addparticipants" value={email} type="email"  autoComplete="off"    onChange={(e)=>setEmail(e.target.value)}   />
                    </div>
                    <div class="col s2">
          <a onClick={selectHandler}  class="btn-floating btn-small waves-effect waves-light agenda-addbtn"><i class="material-icons">add</i></a>
        </div>
                    {
                      

                       displayList.map((i,index)=>{
                        return(
                      <div class="add-part">
                      { (i)?
                     <span class="chip left" onClick={(e)=>deleteParticipant(index)}>{i} X</span> :""
                   }
                 </div>
                  )
               }
                )
                    }
                    
                     <div class="col s12">
                     <button class=" btn  primary waves-effect waves-light right sub-btn ">Next</button>

                     </div>
                     </div>
            
              
               </form>

)
                  }
          </div>
        </div>

    </div>
  )
}


export default CreateEvent;
