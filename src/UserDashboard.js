import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import logo192 from './logo192.png';
import './style.css';
import axios from 'axios';
import Calendarexample from './Calendarexample';
import Header from './Header';
import {BrowserRouter,Route,withRouter,Link} from 'react-router-dom';

function UserDashboard(props) {
   let[event,setEvent]=useState([])
   let[tokens,setTokens]=useState(localStorage.getItem("orderAppToken"))
   let[minute,setMinute]=useState([])
   useEffect(()=>{
      let name=localStorage.getItem('userName');
if(!localStorage.length){
   props.history.push("./");
}
// axios.get("https://minutes-of-meeting.herokuapp.com/view-minutes",
//        {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
//       .then(resp=>setMinute(resp.data))
        




      axios.get("https://minutes-of-meeting.herokuapp.com/List-my-events/",
       {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
      .then(resp=>{
         console.log(resp.data)
         // var today = new Date();
         // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
         // // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
         // // var dateTime = date+' '+time;
         // console.log(date)
         var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

             setEvent(resp.data.filter(i=>{
               let comp=i.meeting_start_date_time;
               let compr=comp.substring(0,10)
               console.log(compr)
               console.log(comp)
                  return (

                     today==compr
                  )
                  
                })
             )
               

      }
      
      )
     
        
     },[])
     let minuteHandler=(id,name)=>{
      localStorage.setItem("cur_id",id);
      localStorage.setItem("cur_name",name);
      props.history.push("./AddMinutes");
     }
     
     
    return (
      
         
    
        <div>
            <div >

  <Header enable={true} />

 <div class="user-con">
 <div class="row backgrond-col" >
 {/* <div class="createbtn col s1" >
   <div>
 <Link to="/CreateEvent" class="btn-floating btn-small waves-effect waves-light blue left"><i class="material-icons ">add</i></Link>
 </div>
 </div> */}
 <div class=" col s11 " >
<div class="row spc">
<div class="col s4">
 <div class="row s12 ">
    <div class="cd1">
 <div class="card card-br " >
       <div class="card-content black-text" >
      
         <h6><b>Today's Schedule</b></h6>
         { 
      event.length?
      event.map((i,index)=>{
        
         return(
         
         <div class="row">
        
         <div  class=" col s12 mkuy">
         <i class="material-icons left">supervisor_account</i><p>{i.meeting_name}</p><br/>
              </div>
      
       
         <div class="col s6">
            <i class="material-icons left ">access_time</i><p>{i.meeting_start_date_time.substring(11,16)}</p>
            </div>
            <div class="col s6">
            <button class=" btn  primary waves-effect waves-light right userdash-btn mar-r" onClick={(e)=>minuteHandler(i.id,i.meeting_name)}>Addminutes</button> 
            </div></div>
            
 )
 
}
):( <p>No meeting for today </p>)
}

       </div>
       </div>
      </div>
   </div>
   
 <div class="row s12">
     <div class="cd2">
 <div class="card card-br">
       <div class="card-content black-text">
         <h6><b>Minutes of last meeting</b></h6>
        <div>
         <ul >
              <li class="list">No DAta Found </li>
              
              <a href="#!" class="collect">More Minutes</a>
         </ul>
         </div>
       </div>
      </div>
      </div>
   </div></div>
<div class="col s8 ">
   <div class="card card-br card-cal">
       <div class="cd3">
       <Calendarexample/>
       </div>
       </div>
       </div>
</div>
   </div>
   {/* </div> */}
   {/* </div > */}
</div>
</div>
</div>

                   
 </div>
       
    )
}



UserDashboard.propTypes = {

}

export default withRouter(UserDashboard);

