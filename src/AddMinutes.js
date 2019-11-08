import React,{useState,useEffect} from 'react';
import './style.css';
import axios from 'axios';

import {BrowserRouter,Route,Link} from 'react-router-dom';

import Header from './Header';

function AddMinutes(props) {
    let [minutesItem,setMinutesItem]=useState("");
    let [minutesItems,setMinutesItems]=useState([]);
    let[tokens,setTokens]=useState(localStorage.getItem("orderAppToken"))
    let[show,setShow]=useState(true)
    let[editid,setEditid]=useState("")
    let[name,setName]=useState(localStorage.getItem("cur_name"))
  
    useEffect(()=>{
    
 
     if(!localStorage.length){
        props.history.push("./");
            }
            var id = localStorage.getItem("cur_id");
            console.log(id)
            // if(!id){
            //  props.history.push("./CreateEvent");
            // }
    })
 
    //add Items in API
    let AddMinutes=(e)=>{
        e.preventDefault();
        if(minutesItems.length){
        console.log(minutesItems)
        var id = localStorage.getItem("met_id");
        console.log(id)
       var spac=minutesItems.join("\r\n")
        
       var obj={
        meeting_minutes: 
             
           
                 minutesItems.map((i,index)=>{
                //    console.log(i[0].id)
                     return(
                         i[0].id
                     )})
           ,
           id:id
       }
        console.log(obj) 
        axios.post("https://minutes-of-meeting.herokuapp.com/Create-minutesList/",obj,
        {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
        .then(resp=>{
            localStorage.removeItem("met_id");
         props.history.push("/UserDashboard");
     
       },
       error=>{
        alert(error)
      }
       )
    }
    alert("pleace add Minutes for the event ",<h2>{name}</h2>)
        }
    //close ITEMS
 //add item in API 
 
                   let addHandler=(e)=>{
        e.preventDefault();
 if(minutesItem.length){
 axios.post("https://minutes-of-meeting.herokuapp.com/add-minutes/",{
    minutes:minutesItem
            },
            {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
            .then(resp=>{
                
                   
                   
                 axios.get("https://minutes-of-meeting.herokuapp.com/add-minutes/",
                 {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}
                 })
                    .then(list=>{
                        console.log(list)
                        setMinutesItems([...minutesItems,list.data.filter((j)=>{
                        
                                     return   resp.data.id==j.id
                        })])
                })
 
 
            })
            setMinutesItem("")
        }
        alert("pleace Add Minutes for this event" ,<h2>{name}</h2>)
         }
 
 //close add item
 //delete ITEM
    let deleteItem=(e)=>{
     if(window.confirm("Are you sure you want to delete")){
        console.log(e)
        axios.delete(`https://minutes-of-meeting.herokuapp.com/add-minutes/${e}/`,       
            
            {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
            .then(resp=>console.log(resp.data))
            console.log(minutesItems)
            setMinutesItems(minutesItems.filter((i)=>{
                console.log(i[0].id)
                return i[0].id!=e
            }))
      }
     }
      //close delete
      //edit Item
      let editItem=(e,i)=>{
         if(window.confirm("Are you sure you want to Edit")){
            console.log(e,i)
          setMinutesItem(i)
          setEditid(e)
          setShow(false)
          console.log(minutesItem)
          setMinutesItems(minutesItems.filter((i)=>{
              console.log(i[0].id)
              return i[0].id!=e
          }))
         }
       }
       //close edit
     
       let editHandler=(e)=>{
         e.preventDefault();
         if(minutesItem.length){
  
  axios.put(`https://minutes-of-meeting.herokuapp.com/add-minutes/${editid}/`,{
    minutes:minutesItem
             },
             {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
             .then(resp=>{
                
                   
                   
                axios.get("https://minutes-of-meeting.herokuapp.com/add-minutes/",
                {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}
                })
                   .then(list=>{
                       console.log(list)
                       setMinutesItems([...minutesItems,list.data.filter((j)=>{
                       
                                    return   resp.data.id==j.id
                       })])
               })


           })
           setMinutesItem("")
           setEditid("")
           
           setShow(true)
        }
        alert("pleace give  input")
         }
                    
 
    
 
     return(
         <div>
         <Header/>
         <div class="row backgrond-col">
 
 <div class="card">
 
   <div class="row">
 
      <div class="col s1 title-icon">
      <Link to="/UserDashboard"> <i class="material-icons medium ">chevron_left</i></Link>
      {/* <i class="material-icons medium ">chevron_left</i> */}
      </div>
      <div class="col s5">
      <h5 class="createmeet">Add Minutes({name})</h5>
      </div></div>
 
     
        
          
          <form class="add-form" onSubmit={AddMinutes} >
         
         <div class="row">
         <div class="col s3 create-label2 ">AddMinutes:</div>
                
                
                 <div class="col s7">
               
          <input id="agenda" type="text" class="validate agnd-inp"  value={minutesItem} id='demo' autoComplete="off"  onChange={e=>setMinutesItem(e.target.value)} />
       </div>
       {
           show?
       <div class="col s2">
          <button onClick={addHandler}  class="btn-floating btn-small waves-effect waves-light agenda-addbtn"><i class="material-icons">add</i></button>
        </div>:(
        <div class="col s2">
          <button onClick={editHandler}  class="btn-floating btn-small waves-effect waves-light agenda-addbtn"><i class="material-icons">edit</i></button>
        </div>)
       }
               
             <div class=" col s10 agd-lis" >
             <ol>
 
                 
   { 
       
       minutesItems.map((i,index)=>{
           
              return(
                  <div class="row pad-lr">
                  <div class="col s8">
                 
                      <li><input id="agenda" type="text" class="validate disb-input" disabled value={i[0].minutes } /></li></div>
                      <div class="col s1 "><i onClick={(e)=>editItem(i[0].id,i[0].minutes)} class="material-icons agenda-editbtn">edit</i></div>
                     <div class="col s1 "><i onClick={(e)=>deleteItem(i[0].id,i[0].minutes)} class="material-icons agenda-delbtn">delete</i></div>  
                  </div>
              )
          }
          )
      }
      
      </ol>
               </div>
               <div class="col s12">
                      <div >
                      <button class=" btn  primary waves-effect waves-light right sub-btn mar-r">Save</button>    
                      </div>
                     </div>
                     </div>
               </form>
 
               </div>
         </div>
     </div>
         
     );


}

export default AddMinutes

