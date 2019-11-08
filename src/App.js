import React,{useState} from 'react';
import logo from './logo.svg';
// import './App.css';
import Final from './Final';
// import DashBoard from './DashBoard';
import Login from './Login';
// import Bigcal from './Bigcal';
import Calendarexample from './Calendarexample';
import {BrowserRouter,Route} from 'react-router-dom';
import CreateEvent from './CreateEvent';
import AddAgenda from './AddAgenda';

import UserDashboard from './UserDashboard';
import Lisevents from './Lisevents';
import Profile from './Profile';
import Register from './Register';
import AddMinutes from './AddMinutes';


function App() {
  //  let[loggedIn,setLoggedIn]=useState(false)
  return (
    <BrowserRouter>
    <div className="App">
    {/* <CreateEvent/> */}
     {/* <AddAgenda/> */}

 {/* <Router>
   <Switch>
     <Login  exact path='/'/>
     <Calenderview path='/Calenderview'/>
   </Switch>
 </Router> */}
   <Route exact path="/" component={Register}/>
   <Route exact path="/Login" component={Login}/>
   <Route path="/UserDashboard" component={UserDashboard}/>
   <Route path="/CreateEvent" component={CreateEvent}/>
   <Route path="/AddAgenda" component={AddAgenda}/>
   <Route path="/Listevents" component={Lisevents}/>
   <Route path="/Profile" component={Profile}/>
   <Route path="/AddMinutes" component={AddMinutes}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
