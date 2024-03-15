import "./workpages.css";
import axios from "axios";
import { getTask } from "../../../slices/adminSlice";
import { getTaskData } from "../../../stateApis/stateapi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';












const Alltask = ()=>{

    const [assignval, setassignval] = useState("") 
    const dispatch = useDispatch();
    const taskdata = useSelector((state)=>state.admin.employees)
    const navigate = useNavigate();

const updateTaskData = async (data)=>{
    dispatch(getTask(data))
}
useEffect(()=>{
    getTaskData(updateTaskData);

},[])

 const allTasks = useSelector((state)=>state.admin.tasks);
 const allEmployees = useSelector((state)=>state.admin.employees);




//  alert dialoge







 const deleteTask = async (id)=>{

    id =JSON.stringify(id)
     
      let data = await axios.get("http://localhost:8000/api/v1/deletetask/:"+id)
    if(data){       
      toast.success(' Task has been deleted', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
        
         })
        getTaskData(updateTaskData);
    }
    else{
      toast.error(' Somthing Went Wrong ', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
        
         })  
    }
    }




    const submitAlert = (key) => {
      confirmAlert({
        title: "Are you sure want to delete",
        message: "",
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteTask(key._id)
          },
          {
            label: "No"
            // onClick: () => alert("Click No")
          }
        ]
      });
    };








    return <>

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
style={{fontSize:"1.8rem", width:"fit-content", padding:"0 2rem"}}
/>

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
       <h1>Assign to</h1>
    </th>
    <th>
       <h1>Status</h1>
    </th>
    <th>
       <h1>Action</h1>
    </th>
</tr>
{allTasks.map((key, idx)=>{


return<>
<tr>
<td>
        <h1>{idx}</h1>
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

   {/* filtering the perticular assigned task */}
    <td>
       {allEmployees.filter((key2)=>{
return key2._id == key.assign
       }).map((key3)=>{
        return <h1>{key3.name}</h1>
       })}
    </td>


  
    <td>
       <h1>{key.status}</h1>
    </td>
    <td>
      <div style={{display:"flex", justifyContent:"space-around", alignItems:"center" }}>
        <MdDeleteForever style={{color:"red", fontSize:"2.4rem", marginLeft:"20px",cursor:"pointer"}} onClick={()=>{submitAlert(key._id)}} />
        <GrUpdate  style={{color:"green", fontSize:"2.2rem",marginRight:"20px",cursor:"pointer"}} onClick={()=>{navigate("/dashboard/updatetask/"+key._id)}} />
      </div>
    </td>
    </tr>

</>
})}



</table>


     </div>
    </>
}

export default Alltask;