import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import nouislider from 'nouislider';
import './style.css';
import axios from 'axios';
import Header from './Header';
import { Modal, Button,Select } from 'react-materialize';
import {BrowserRouter,Route,Link} from 'react-router-dom';

function CreateEvent(props) {
  let [eventName,setEventName]=useState("");
  let[date,setDate]=useState("");
  let[participants,setParticipants]=useState("");
  let[time,setTime]=useState("");
  let [participantList,setParticipantList]=useState("")
  let [searchList,setSearchList]=useState([])
  let [displayList,setDisplayList]=useState([])
  let [participantName,setParticipantName]=useState()
let[tokens,setTokens]=useState(localStorage.getItem("orderAppToken"))

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

let searchHandler=(e)=>{


  if(e.target.value!==""){
   
    // console.log(participantList)
    let requiredParticipants=participantList.filter(i=>{
      let lower_case=i.toLowerCase();
      let input_value=e.target.value.toLowerCase();
      return lower_case.includes(input_value)
    })
    setSearchList(requiredParticipants)
    // console.log(searchList)
  }
 else{
   setSearchList([])
 }
}
let selectHandler=(participantname)=>{
      setSearchList([]);
   // setParticipantName(participantname)
//  console.log(participantName)
 let existing=displayList.filter(i=>{
   return participantname===i;
 })
 if(existing.length===0){
  setDisplayList([...displayList,participantname])
  // console.log(displayList)
  }
  else
  {
    alert("participant is already added")
  }
  document.getElementById("addparticipants").value=""
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
if(displayList.length){
  


  // let da_ti= moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').format();
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
  
   
  console.log(obj)
  axios
    .post("https://minutes-of-meeting.herokuapp.com/create-meeting/", {
      meeting_name: eventName,
      meeting_start_date_time: da_ti,
      meeting_location: "bangalore",
      description: "scrum",
      meeting_participant: displayList.map(i => {
        
        return {
          participant_email: i
        };
      })
    },
    {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}}) 
    //  .post(`https://minutes-of-meeting.herokuapp.com/create-event/${tokens}`,obj)
    .then(resp =>{
      console.log(resp.data);
    localStorage.setItem("met_id",resp.data.id);
    localStorage.setItem("met_name",resp.data.meeting_name);
    props.history.push("/AddAgenda");
    },
    error=>{
      alert(error)
    }
    )
    ;

}
alert("pleace add Participants")
}
// End
//HTML UI Part
  return (
    <div>
        <Header />
        <div class="row backgrond-col">

        <div class="card">
        
          <div class="row">

             <div class="col s1 title-icon">
             <Link to="/UserDashboard"> <i class="material-icons medium ">chevron_left</i></Link>
             {/* <i class="material-icons medium ">chevron_left</i> */}
             </div>
             <div class="col s5">
             <h5 class="createmeet">Create Meeting</h5>
             </div></div>

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
                         <input type="date" class="adj-inp"  onChange={(e)=>setDate(e.target.value)} autoComplete="off" required></input>
                        </div>
                        </div>
               <div class="col s6"><div class="col s2 create-label2">Time:</div>
               <div class="col s6">            
               <input type="time"  class="adj-inp1" onChange={(e)=>setTime(e.target.value)} autoComplete="off"  required></input>
                        </div></div>
                        <div class="col s3 create-label2">Event Duration:</div>
                 <div class="col s9"> 
                 <Select onChange={"value"}>
<option value="" disabled>
Choose your option
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
                 <div class="col s3">Participants:</div>
                 <div class="col s9">
                 <input id="addparticipants" type="text" class="validate create-input" autoComplete="off"    onChange={(e)=>searchHandler(e)}   />
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
                     {
                   searchList.map(i=>
                    <div class="add-part">
                     <span class="chip" onClick={()=>selectHandler(i)}>{i}</span>
                     </div>
       )
     }
                     <div class="col s12">
                     <button class=" btn  primary waves-effect waves-light right sub-btn ">Next</button>

                     </div>
                   
               </div>
              
               </form>

             
          </div>
        </div>
    </div>
  )
}

CreateEvent.propTypes = {

}

export default CreateEvent

