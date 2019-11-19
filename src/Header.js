
import React ,{useState}from 'react';
import { Modal, Button,Dropdown,Icon,SideNav,SideNavItem} from 'react-materialize';
import arya from './arya.png';
import mom from './mom.PNG';
import {BrowserRouter,Route,Link,withRouter} from 'react-router-dom';

const Header=(props)=>{
  let [name,setName]=useState(localStorage.getItem('userName'));
  
  let LogoutHandler=(e)=>{
     if(window.confirm("are you sure you want to logout!"))
    
     {
      localStorage.clear();
      props.history.push("/Login");
      }
      
      }
    return(
        <div>
            <nav>
    <div class="nav-wrapper black-text white">
      <a href="#" class="brand-logo center"></a>      
      <ul id="nav-mobile" class="left hide-on-med-and-down">
      <SideNav trigger={  <li> <i class="material-icons" >menu</i></li>  } options={{closeOnClick: true}} >
      
       <div class="row">
          <div class="col s5">

           <img src={mom} class="sidenv-img"/>
         </div>
       
       <div class="col s7">
       <li> <i class="material-icons" style={{paddingLeft:"95px"}} options={{closeOnClick: false}}>menu</i></li>   
       </div>
       </div>

   <SideNavItem >

    
    { props.enable ?
    <div >
     <Link to="/CreateEvent" class="btn-floating btn-small waves-effect waves-light blue  left add-btn-side"><i class="material-icons">add</i></Link>
     <Link to="/CreateEvent" class="sidenav-create">create meeting</Link> </div>
     :(<div ><Link to="/CreateEvent" class="btn-floating btn-small waves-effect waves-light blue  left add-btn-side disabled"><i class="material-icons">add</i></Link>
     <Link to="/CreateEvent" class="sidenav-create disabled">create meeting</Link></div>)
    }
     
     
   </SideNavItem>



       
   </SideNav>
        {/* <li> <i class="material-icons" style={{paddingLeft:"15px"}}>menu</i></li>                */}
        <li>
            <form>
        <div class="input-field" style={{position:"relative",left:'100px'}}>          
          {/* <label class="label-icon" for="search"><i class="material-icons">search</i></label>  */}
          <i class="material-icons prefix ">search</i>
          <input id="search" type="text" style={{width:'300px'}} placeholder="    Search"  required/> 
          <a class="waves-effect waves-light btn white black-text">Search</a>        
        </div>
      </form>
        </li>                        
      </ul>
         
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li> <i class="material-icons silver-text">notifications</i></li>  

     <li><b style={{margin:"10px"}}>{name}</b></li>
     <li class=" collection-item avatar"> 
     <Dropdown trigger={ <img src={arya} width="45px" height="45px"  class="im-cir" style={{ marginRight:"20px"}}/>}
          class="dropdown-trigger" width="0px"
          options={{coverTrigger: false,constrainWidth: false}}>
           <a href="Profile" class="per">
             <Icon>
               person
             </Icon>
           My Profile
           </a>
           <Link onClick={LogoutHandler}>
           
             <Icon>
               beenhere
             </Icon>
           Logout
           
          </Link>
           
     </Dropdown>
     </li>       
                                
      </ul>

    </div>
  </nav>

   
  {/* <div class="container s12"> */}
  <div class="createbtn col s1">
  { props.enable ?
    <Link to="/CreateEvent" class="btn-floating btn-small waves-effect waves-light blue left"><i class="material-icons ">add</i></Link>
:(
   <div>
 <a  class="btn-floating btn-small waves-effect waves-light   disabled left"><i class="material-icons ">add</i></a>
 </div>
 )

 }
 
  {/* <Link to="/CreateEvent" class="btn-floating btn-small waves-effect waves-light blue left"><i class="material-icons ">add</i></Link> */}
  </div>
  </div>
        
    );
}
 export default withRouter(Header);