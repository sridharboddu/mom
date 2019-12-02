import React,{useState,useEffect} from 'react';
import Header from './Header';
 import './Profile.css';
 import {BrowserRouter,Route,Link} from 'react-router-dom';
const Profile=(props)=>{
  let [name,setName]=useState(localStorage.getItem('userName'));
  useEffect(()=>{
    let name=localStorage.getItem('userName');
    if(!localStorage.length){
       props.history.push("./");
    }
   })
    return(
<div>
<Header />
<div class="row backgrond-col">

<div class="card create-card">

<div class="row">

<div class="col s1 title-icon">
<Link to="/UserDashboard"> <i class="material-icons medium ">chevron_left</i></Link>
 </div> 




   <div class="collection-item avatar center">
      <img src="arya.png" alt="" class="circle2 "/>
     
    
        <p class="title"><b>{name}</b></p>
      <p class="txtcolor">arya.joe@gmail.com</p> 
      <p  class="txtcolor">9900121231</p>   
     
      
    </div>

 </div> 






 <div class="row">


 <div class="col s4 ">
      <div class="card1 procrd darken-1">
        <div class="card-content  black-text">
        <img src="numberofmeetings.png" class="icn"/>
      
        <div class="cardval">
          <span class="card-title val-user">14</span>
          <p>No. of meetings</p>
        </div>

        </div>
       
      </div>
    </div>

    
    <div class="col s4 ">
      <div class="card1 procrd darken-1">
        <div class="card-content   black-text">
        <img src="minutes.png" class="icn"/>

        <div class="cardval">
          <span class="card-title val-user">92</span>
          <p>Minutes</p>
        </div>
       
        </div>
      </div>
    </div>
 

    
    <div class="col s4 ">
      <div class="card1 procrd darken-1">
        <div class="card-content black-text ">
              
        <img src="decisions.png" class="icn"/>
               
        <div class="cardval">
          <span class="card-title val-user">99</span>
          <p>Decisions</p>
        </div>
       
        </div>
      </div>
    </div>


  </div>

  <div class="row">

    <div class="col s4 ">
      <div class="card1 procrd darken-1">
        <div class="card-content  black-text">
        <img src="ideas.png" class="icn"/>
        <div class="cardval">
          <span class="card-title val-user">14</span>
          <p>Ideas</p>
        </div>
       
        </div>
      </div>
    </div>

    
    <div class="col s4 ">
      <div class="card1 procrd darken-1">
        <div class="card-content  black-text">
        <img src="actionitems.png" class="icn"/>
        <div class="cardval">
          <span class="card-title val-user">57</span>
          <p>Action Items</p>
        </div>
       
        </div>
      </div>
    </div>
 

    
    <div class="col s4 ">
      <div class="card1 procrd darken-1">
        <div class="card-content  black-text">
        <img src="todaysmeeting.png" class="icn"/>
        <div class="cardval">
        <span class="card-title val-user">04</span>
          <p>Today's Meeting</p>
        </div>
       
      </div>
      </div>
    </div>
 


  </div>





    
</div>
   



</div>
 </div>


    );
}
export default Profile;
