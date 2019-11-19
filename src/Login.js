import React ,{useState,useEffect}from 'react';
import axios from 'axios';

import './Login.css';
import './style.css';
import {Preloader,Row,Col} from 'react-materialize'
import {BrowserRouter,Route,withRouter,Link} from 'react-router-dom';



const Login=(props)=>{
  let [email,setEmail]=useState(null)
  let [password,setPassword]=useState(null)
  let [proces,setProces]=useState(false)
  let[log,setLog]=useState(null)
  const forgetHandler=(e)=>{
    alert("sorry it's in progress")
  }
  useEffect(()=>{
    
    if(localStorage.length){
       props.history.push("/UserDashboard");
    }
   })
  let LoginHandler=(e)=>{
    setProces(true)
    e.preventDefault();
    axios.post("https://minutes-of-meeting.herokuapp.com/api-token-auth/",{
 email,
 password
})
.then(
  resp=> {
    setProces(false)
//  console.log(resp)
 if (!resp.data)
 {
   alert("You are not authorized to perform this action");
}
else{
    localStorage.setItem("userEmail",resp.data.email);
  localStorage.setItem("orderAppToken",resp.data.token);
   localStorage.setItem('userName',resp.data.username);
  props.history.push("/UserDashboard");
}
},(error=>{
  setProces(false)
 alert("You are not authorized to perform this action");
})
 )

}

	 
	      
  return(
    <div>
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
//   <Row class="process-bar">

// <Col s={12}>
// <ProgressBar/>
// </Col>
// </Row>
:(
     <div class="login-bg" >
    <div class="row">
      <div class="col s7"></div>
      <div class="col s10 m10 l3">
        <div class="row loginform">
        
      
      <form class="frm"  onSubmit={(e)=>LoginHandler(e)}>

	<div class="Login-heading">
      <h5>Please Sign In</h5>
      <h6>To join your meeting</h6>
      </div>

			
      
				
    <div class="input-field inputstl padt15 col s12 t-aleft mart15">
      <input placeholder="abc@gmail.com" required id="first_name2" type="email" onChange={(e)=>setEmail(e.target.value)}  class="validate u-feild"/>
      <i class="material-icons prefix validate right s-color">email</i>
      <label class="active u-label" for="first_name2">Email</label>
    </div>
    <div class="input-field inputstl padt15 col s12 t-aleft mart30">
      <input placeholder=". . . . ."  required  class="validate u-feild" type="password"  onChange={(e)=>setPassword(e.target.value)}/>
      <i class="material-icons prefix validate right s-color">lock</i>
      <label class="active up-label" for="first_name2">Password</label>
      <Link to="./" class="left ">Sign Up?</Link>
      <a onClick={forgetHandler} class="right">Forgot Password?</a>
    </div>
			
			<div class="row">
        
				<div class="input-field center-align padt15 col s12 mart30">
				<button class="signbtn btn  primary waves-effect waves-light">Sign In</button>
								</div>
			</div>
			</form>
        </div>
        </div>
        </div>
        </div>)}
  
</div>

);
}
export default withRouter(Login) ;