
import axios from "axios";
import { getTask } from "../../../slices/employeeSlice";
import { getEmpTaskData } from "../../../stateApis/stateapi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";










const MyEmpTask = ()=>{


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  mytask = useSelector((state)=>state.employee.tasks)
    let emp_id = useSelector((state)=>state.employee.logindetails.id)

  console.log(emp_id);


const updateTaskData = async (data)=>{
    dispatch(getTask(data))
}
useEffect(()=>{
   console.log(mytask)
   if(emp_id){     
      getEmpTaskData(emp_id, updateTaskData);
   }  

},[]);













    return <>
         <div className="all-task-container" >

<table border={2}>

<tr>
    <th>
        <h1>Seriel Number</h1>
    </th>
    
    <th>
       <h1>Task Title</h1>
    </th>

    <th>
      <h1> Task discription </h1>
    </th>

    <th>
       <h1>Start date</h1>
    </th>

    <th>
       <h1>Endtart date</h1>
    </th>

    <th>
       <h1>Status</h1>
    </th>
    <th>
       <h1>Action</h1>
    </th>
</tr>
{mytask.map((key, idx)=>{

return<>
<tr>
<td>
        <h1>{idx+1}</h1>
    </td>
    <td>
        <h1>{key.title}</h1>
    </td>
    
    <td>
       <h1>{key.discription}</h1>
    </td>

    <td>
      <h1> {key.startdate} </h1>
    </td>

    <td>
       <h1>{key.enddate}</h1>
    </td>

  
    <td>
       <h1>{key.status}</h1>
    </td>
    <td>
      <div style={{display:"flex", justifyContent:"space-around", alignItems:"center" }}>
        <GrUpdate  style={{color:"green", fontSize:"2.2rem",marginRight:"20px",cursor:"pointer"}} onClick={()=>{navigate(`/employee/dashboard/updateemptask/${key._id}`)}} />
      </div>
    </td>
    </tr>

</>
})}


</table>


     </div>
    </>
}

export default MyEmpTask;