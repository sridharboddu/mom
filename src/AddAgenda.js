import React,{useState,useEffect} from 'react';
import './style.css';
import axios from 'axios';

import {BrowserRouter,Route,Link} from 'react-router-dom';

import Header from './Header';

const AddAgenda=(props)=>{
    let [agendaItem,setAgendaItem]=useState("");
   let [agendaItems,setAgendaItems]=useState([]);
   let[tokens,setTokens]=useState(localStorage.getItem("orderAppToken"))
   let [agendaList,setAgendaList]=useState("");
  let[list,setList]=useState([])
  let[viewagenda,setViewagenda]=useState([])
  let[show,setShow]=useState(true)
  let[editid,setEditid]=useState("")
  let[name,setName]=useState(localStorage.getItem("met_name"))

   useEffect(()=>{
   

    if(!localStorage.length){
       props.history.push("./");
           }
           var id = localStorage.getItem("met_id");
           if(!id){
            props.history.push("./CreateEvent");
           }
   })

   //add Items in API
   let addAgenda=(e)=>{
  
    e.preventDefault();
    if(agendaItems.length){
       
   console.log(agendaItems)
   var id = localStorage.getItem("met_id");
   console.log(id)
  var spac=agendaItems.join("\r\n")
   
  var obj={
      agenda_points: 
        
      
            agendaItems.map((i,index)=>{
           //    console.log(i[0].id)
                return(
                    i[0].id
                )})
      ,
      id:id
  }
   console.log(obj) 
   axios.post("https://minutes-of-meeting.herokuapp.com/Create-agendaList/",obj,
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
else
  alert("pleace add Agenda for the event ",<h2>{name}</h2>)
}


   //close ITEMS
//add item in API 

                  let addHandler=(e)=>{
       e.preventDefault();
       if(agendaItem.length){
       
axios.post("https://minutes-of-meeting.herokuapp.com/add-agenda/",{
            agenda:agendaItem
           },
           {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
           .then(resp=>{
        //        setAgendaItems([...agendaItems,resp.data])
               
        //    })
                  
                axios.get("https://minutes-of-meeting.herokuapp.com/add-agenda/",
                {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}
                })
                   .then(list=>{
                       console.log(list)
                       setAgendaItems([...agendaItems,list.data.filter((j)=>{
                       
                                    return   resp.data.id==j.id
                       })])
               })


           })
           setAgendaItem("")
        }
        else
        alert("pleace Add Agenda for this event" ,<h2>{name}</h2>)
    }


//close add item
//delete ITEM
   let deleteItem=(e)=>{
    if(window.confirm("Are you sure you want to delete")){
       console.log(e)
       axios.delete(`https://minutes-of-meeting.herokuapp.com/add-agenda/${e}/`,       
           
           {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
           .then(resp=>console.log(resp.data))
           console.log(agendaItems)
           setAgendaItems(agendaItems.filter((i)=>{
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
          setAgendaItem(i)
          setEditid(e)
          setShow(false)
          console.log(agendaItems)
          setAgendaItems(agendaItems.filter((i)=>{
              console.log(i[0].id)
              return i[0].id!=e
          }))
            
        }
      }
      //close edit
    
      let editHandler=(e)=>{
        e.preventDefault();
        if(agendaItem){
 
 axios.put(`https://minutes-of-meeting.herokuapp.com/add-agenda/${editid}/`,{
             agenda:agendaItem
            },
            {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}})
            .then(resp=>{
                //        setAgendaItems([...agendaItems,resp.data])
                       
                //    })
                          
                        axios.get("https://minutes-of-meeting.herokuapp.com/add-agenda/",
                        {headers: {'Content-Type': 'application/json', 'Authorization':`Token ${tokens}`}
                        })
                           .then(list=>{
                               console.log(list)
                               setAgendaItems([...agendaItems,list.data.filter((j)=>{
                               
                                            return   resp.data.id==j.id
                               })])
                       })
        
        
                   })
                setEditid("")
                setAgendaItem("")
                setShow(true)
        }
        else
        alert("pleace Add Agenda for this event" ,<h2>{name}</h2>)
    }          

   

    return(
        <div>
        <Header/>
        <div class="row backgrond-col">

<div class="card">

  <div class="row">

     <div class="col s1 title-icon">
     <Link to="/CreateEvent"> <i class="material-icons medium ">chevron_left</i></Link>
     {/* <i class="material-icons medium ">chevron_left</i> */}
     </div>
     <div class="col s5">
     <h5 class="createmeet">Create Meeting</h5>
     </div></div>

    
       
         
         <form class="add-form" onSubmit={addAgenda} >
         <div class="create-label ">
             <h5 class="col s12 right-align">2/2</h5></div>
             <div class="progress">
         <div class="determinate" ></div>
     </div>
     
        <div class="row">
        <div class="col s3 create-label2 ">AddAgenda:</div>
               
               
                <div class="col s7">
              
         <input id="agenda" type="text" class="validate agnd-inp"  value={agendaItem} id='demo' autoComplete="off"  onChange={e=>setAgendaItem(e.target.value)} />
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
      
         agendaItems.map((i,index)=>{
        //    console.log(i[0].id)
             return(
                 <div class="row pad-lr">
                 <div class="col s8">
                
                     <li><input id="agenda" type="text" class="validate disb-input" disabled value={i[0].agenda} /></li></div>
                     <div class="col s1 "><i onClick={(e)=>editItem(i[0].id,i[0].agenda)} class="material-icons agenda-editbtn">edit</i></div>
                     <div class="col s1 "><i onClick={(e)=>deleteItem(i[0].id,i[0].agenda)} class="material-icons agenda-delbtn">delete</i></div>  
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
 export default AddAgenda; 
