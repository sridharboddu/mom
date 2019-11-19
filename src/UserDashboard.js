import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import logo192 from './logo192.png';
import './style.css';
import axios from 'axios';
import Calendarexample from './Calendarexample';
import Header from './Header';
import {BrowserRouter,Route,withRouter,Link} from 'react-router-dom';
import {Preloader,Row,Col} from 'react-materialize'
import { arrayExpression } from '@babel/types';
function UserDashboard(props) {
   let[event,setEvent]=useState([])
   let[tokens,setTokens]=useState(localStorage.getItem("orderAppToken"))
   let[minute,setMinute]=useState([])
   
   let[minutes,setMinutes]=useState([])
   let [proces,setProces]=useState(true)
   let [last,setLast]=useState()
    
   useEffect(()=>{
      let name=localStorage.getItem('userName');
         if(!localStorage.length){
            props.history.push("./");
         }
            
        
        
        

        
     },[])

     axios.get("https://minutes-of-meeting.herokuapp.com/List-my-participation-meetings/",
     {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
    .then(resp=>{  
       setProces(false)
       // console.log(resp.data)
     
       var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

           setEvent(resp.data.filter(i=>{
             let comp=i.meeting_start_date_time;
             let compr=comp.substring(0,10)
             // console.log(compr)
             // console.log(comp)
                return (

                   today==compr
                )
                
              })
           )
       
           axios.get("https://minutes-of-meeting.herokuapp.com/Create-minutesList/",
           {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
           .then(min=>
              {
               //   console.log(min)
                 setMinutes(min.data)
                
           axios.get("https://minutes-of-meeting.herokuapp.com/add-minutes/",
           {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}
           })
              .then(list=>{
                 setMinute(list.data)
                 var tess= event.map(i=>{

                  return  minutes.filter(j=>{
                     // console.log(i.id,j.id)
                     return i.id==j.id
                  })[0]
               })
               
               //console.log(tess)
      
     
               if(tess[0]&&minute.length)
               {
                  setLast(minute.filter(ele=>{
                     return tess[0].meeting_minutes.indexOf(ele.id) !=  -1;
                                  }))
      //           setLast(tess[0].meeting_minutes.map(i=>{
      // console.log(i)
      //          return minute.filter(j=>{
      //             console.log(j)
      //             return i==j.id
      //          })
      //          }))
            }
               
             //  console.log(last)
 
});
           });

    }
    
    )
// if(last&&last.indexOf.length){
//    var result= last.filter(i=>{
//       return arr.indexOf()
//    })
// }

    
   


     let minuteHandler=(id,name,time,duration)=>{
      const tm=new Date(time)
      tm.setHours( tm.getHours() - 5 );
      tm.setMinutes( tm.getMinutes() - 30 );
      const en=new Date(time)
      en.setHours( en.getHours() - 5 );
      en.setMinutes( en.getMinutes() - 30 );
      en.setMinutes( en.getMinutes() + duration );
      localStorage.setItem("cur_id",id);
      localStorage.setItem("cur_name",name);
      localStorage.setItem("cur_time",tm);
      localStorage.setItem("en_time",en);
      props.history.push("./AddMinutes");
     }
     
   //   axios.gect(`https://minutes-of-meeting.herokuapp.com/Create-minutesList/${event.id}/`,
   //      {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
   //      .then(resp=>{
   //          const dat=resp.data;
   //          console.log(dat)
   //      })
  



   
   // console.log(minuteid)9:03 AM

     
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
    <div>
 <div class="card card-br1 " >
       <div class="card-content black-text" >
      
         <h6><b>Today's Schedule</b></h6>
         { proces?
 <Row >
   
 <Col s={6}>
 <Preloader flashing  />
 </Col></Row>:(
      event.length?
      event.map((i,index)=>{
         // console.log(i)
        
         return(
         
         <div class="row">
        
         <div  class=" col s12 mkuy">
         <i class="material-icons left">supervisor_account</i><p>{i.meeting_name}</p><br/>
              </div>
      
       
         <div class="col s6">
            <i class="material-icons left ">access_time</i><p>{i.meeting_start_date_time.substring(11,16)}</p>
            </div>
            <div class="col s6">
            <button class=" btn  primary waves-effect waves-light right userdash-btn mar-r" onClick={(e)=>minuteHandler(i.id,i.meeting_name,i.meeting_start_date_time,i.meeting_duration)}>Addminutes</button> 
            </div></div>
            
 )
 
}
):( <p>No meeting for today </p>))
}


       </div>
       </div>
      </div>
   </div>
   
 <div class="row s12">
     <div>
 <div class="card card-br">
       <div class="card-content black-text">
         <h6><b>Minutes of last meeting</b></h6>
        <div>

         <ul >
            {
               
            
            last&&last.indexOf.length?
            
            last.map((j)=>{
               
              
            return <li class="list">{j.minutes}</li>
        
              })
            
            :(<li class="list">No Data</li>)
            }

            
              
              {/* <a href="#!" class="collect">More Minutes</a> */}



         </ul>
         </div>
       </div>
      </div>
      </div>
   </div></div>
<div class="col s8 ">
   <div class="card  card-cal">
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

