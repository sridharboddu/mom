import React from 'react';
const Final=()=>{
    return(
<div style={{backgroundImage:"url(login.png)",backgroundRepeat:"no-repeat"}}>
<h1> abcdef</h1>
<div >
       <div class="row" >
           <div class="col s6"></div>
           <div class="col s6">
           <div class="container" style={{border:"1px solid black",height:"500px",marginTop:"60px",width:"350px"}}>
               <h6 style={{marginRight:"215px"}}><b>please sign in</b></h6>
               <h6 style={{marginRight:"240px",fontSize:"60%"}}>To join our meeting</h6>
               <h4 class="reg"><b><u>Login</u></b> </h4>

               <div class="row">
                   <div class="col s3"></div>
               <div class="col s6">
              
           <form class="form-inline" action="/action_page.php">
           <fieldset style={{border:"1px solid black", paddingLeft:"70%",left:"10%",margin:"6px 0"}}>
				                          <legend  >Emailid:</legend>
				                     	</fieldset>
           {/* <label for="email">Email:</label> */}
           <input  id="email" type="email"/>
           <input class="validate" type="password" placeholder="Password" />
           <button type="submit" class="btn btn-default">Submit</button>   
          
           </form>
           </div>
           </div>
           <div class="col s2"></div>
           </div>
       </div>
</div>

</div>

</div>
    );
}
export default Final;