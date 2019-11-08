import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import nouislider from 'nouislider';
import './style.css';
import axios from 'axios';
import Header from './Header';
import { Modal, Button,Select } from 'react-materialize';
import {BrowserRouter,Route,Link} from 'react-router-dom';


const CreateEvent=(props)=>{
    let [eventName,setEventName]=useState("");
   let[date,setDate]=useState("");
   let[participants,setParticipants]=useState("");
   let[time,setTime]=useState("");
   let [participantList,setParticipantList]=useState("")
   let [searchList,setSearchList]=useState([])
   let [displayList,setDisplayList]=useState([])
   let [participantName,setParticipantName]=useState()

   useEffect(()=>{
    
 
    axios.get("https://minutes-of-meeting.herokuapp.com/List-mail/")
    .then(resp=>
    { 
       let emails=resp.data.map(
        i=>{
          return i.email;
        }
      )
      setParticipantList(emails)
    }
    )
    
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
// let eventHandler=(e)=>{
//   e.preventDefault();
// // console.log(date)
// axios.post("https://minutes-of-meeting.herokuapp.com/create-event/",{
//        meeting_name:eventName,
//         meeting_start_date_time:"2019-12-12T11:23:05Z",
//         meeting_location: "hyderabad",
//         description:"none",
//         meeting_participant: 
//           // {
//           //   participant_email:"nikhilgoud2202@gmail.com"
//           // }
          
//           // participant_email : displayList
          
//             displayList.map((i)=>{
//               console.log(i)
//              return
// (            {
//                 participant_email:i
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            //             }
// )
//           })                                                                                                                                                           
          
        
//  })
//  .then(resp=>console.log(resp.data))
    

//     // props.history.push("/AddAgenda");
// }
let eventHandler = e => {
  e.preventDefault();
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
  // console.log(obj)
  axios
    .post("https://minutes-of-meeting.herokuapp.com/create-event/", obj)
    .then(resp =>{
      console.log(resp.data);
    localStorage.setItem("met_id",resp.data.id);
    props.history.push("/AddAgenda");
    }
    );

  
};
    return(

      
        <div>
           <Header />
           <div class="row backgrond-col">
           
           <div class="col s11 m11 l11 xl11 ">
           

           <div class="card create-card">
              <div class="create-title">
            
              </div>
             <div class="row">

             <div class="col s1 title-icon">
             <Link to="/UserDashboard.js"> <i class="material-icons medium ">chevron_left</i></Link>
             {/* <i class="material-icons medium ">chevron_left</i> */}
             </div>
             <div class="col s5">

             <h5 class="createmeet">Create Meeting</h5>
             </div>
             </div>






             
              <form class="create-form" onSubmit={(e)=>eventHandler(e)}>
                  <div class="row">
                  <div class="col s12 create-label">
                  <h5 class="col s2 right-align">0/2</h5>
                  <div class="progress">
         
           <div class="determinate" style={{width:"90%"}}></div>
       </div>
                  </div>
                    <div class="col s12">
                     <div class="col s4 create-label">Event name</div>
                     <div class="col s8">
                      <input type="text" class="create-input" autoComplete="off" onChange={(e)=>setEventName(e.target.value)} required  />
                     </div>
                    </div>
                 
                    <div class="col s6">
                    <div class="row">
                     <div class="col s3 create-label2">Date</div>
                     <div class="col s9">
                     
                      {/* <input type="date"class="create-input" required/> */}
                      <input type="date"  onChange={(e)=>setDate(e.target.value)} autoComplete="off" required></input>
                      {/* <i class="material-icons create-icon ">date_range</i> */}
                     </div>
                     </div>
                    </div>


                    
                    <div class="col s6">
                    <div class="row">
                     <div class="col s2 create-label2">Time</div>
                     <div class="col s7">
                      {/* <input type="time"class="create-input" required/> */}
                      <input type="time" onChange={(e)=>setTime(e.target.value)} autoComplete="off"  required></input>
                      {/* <i class="material-icons create-icon ">access_time</i> */}
                     </div>
                     </div>
                    </div>
                   
                    <div class="col s12">
                     <div class="col s6 create-label">Meeting Duration</div>
                     
                     <div class="input-field col s6">
                     <Select value="">
<option value="" disabled>
Choose your option
</option>
<option value="1">
Option 1
</option>
<option value="2">
Option 2
</option>
<option value="3">
Option 3
</option>
</Select>
    
  
                     </div>
                    </div>
                 
                     <div class="col s12">
                     <div class="col s3 create-label">Participants</div>
                     <div class="col s9">
                      {/* <input type="text" class="create-input"/> */}
                      
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
                  </div>
                  {
                   searchList.map(i=>
                    <div class="add-part">
                     <span class="chip" onClick={()=>selectHandler(i)}>{i}</span>
                     </div>
       )
     }
                   
                    
                     {/* <div class="col s12">
                     <div class="progress">
                         <div class="determinate" ></div>
                       </div>
                     </div> */}
                     
                   
                    <div class="col s12">
                     <div >
                        
                     <button class=" btn  primary waves-effect waves-light right sub-btn ">Next</button>
                       
                     </div>
                    </div>

                          

                  </div>
              </form>

           </div>
        </div>
        </div>
        </div>
        
    );
}
CreateEvent.prototype={}
 export default CreateEvent;