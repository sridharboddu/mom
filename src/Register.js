import React ,{useState,useEffect}from 'react';
import axios from 'axios';

import './Login.css';
import {ProgressBar,Row,Col} from 'react-materialize'
import {BrowserRouter,Route,withRouter,Link} from 'react-router-dom';



const Register=(props)=>{
  let [email,setEmail]=useState(null)
  let [password,setPassword]=useState(null)
  let [rpassword,setRpassword]=useState(null)
 
 
  const forgetHandler=(e)=>{
    alert("sorry it's in progress")
  }
  useEffect(()=>{
   
    if(localStorage.length){
       props.history.push("/UserDashboard");
    }
   })
  let LoginHandler=(e)=>{
 
    e.preventDefault();
    axios.post("https://minutes-of-meeting.herokuapp.com/rest-auth/registration/",{
      email: email,
     password1: password,
      password2:rpassword 
})
.then(
  resp=> {
     props.history.push("/Login");
  },(error=>{
   alert(error);
})
 )

}

	 
	      
  return(
    <div>

     <div class="login-bg" >
    <div class="row">
      <div class="col s7"></div>
      <div class="col s10 m10 l3">
        <div class="row loginform">
        
      
      <form class="frm1"  onSubmit={(e)=>LoginHandler(e)}>

	<div class="Login-heading">
      <h5>Please Sign Up</h5>
      <h6>To join your meeting</h6>
      </div>

			
      
				
    <div class="input-field inputstl padt15 col s12 t-aleft mart15">
      <input placeholder="abc@gmail.com" required id="first_name2" type="email"  autoComplete="off" onChange={(e)=>setEmail(e.target.value)}  class="validate u-feild"/>
      <i class="material-icons prefix validate right s-color">email</i>
      <label class="active u-label" for="first_name2">Email</label>
    </div>
    <div class="input-field inputstl padt15 col s12 t-aleft mart30">
      <input placeholder=". . . . ."  required  class="validate u-feild" type="password"autoComplete="off" onChange={(e)=>setPassword(e.target.value)}/>
      <i class="material-icons prefix validate right s-color">lock</i>
      <label class="active up-label" for="first_name2">Password</label>
      {/* <a onClick={forgetHandler} class="right">Already have an account?Signin</a> */}
    </div>


    <div class="input-field inputstl padt15 col s12 t-aleft mart30">
      <input placeholder=". . . . ."  required  class="validate u-feild" type="password"autoComplete="off" onChange={(e)=>setRpassword(e.target.value)}/>
      <i class="material-icons prefix validate right s-color">lock</i>
      <label class="active urp-label" for="first_name2">Re-password</label>
      <Link to="/Login" class="right">Already have an account?Signin</Link>
    </div>
			
			<div class="row">
				<div class="input-field center-align padt15 col s12 mart30">
				<button class="signbtn btn  primary waves-effect waves-light">Sign up</button>
								</div>
			</div>
			</form>
        </div>
        </div>
        </div>
        </div>
  
</div>

);
}
export default withRouter(Register) ;