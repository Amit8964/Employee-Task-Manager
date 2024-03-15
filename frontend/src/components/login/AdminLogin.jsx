import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../slices/adminSlice";
import "./style.css"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const AdminLogin = ()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state)=>state.admin.logindetails.isLogin);
  const [message, setmessage] = useState("");
  const [adminData,setAdminData] = useState("");




  const handleInput = (e)=>{

setAdminData((prev)=>{

  return {
...prev,
[e.target.name]:e.target.value

  }
})

  };








  const Login = async () => {
    axios.post("http://localhost:8000/api/v1/adminlogin", adminData).then(data => {

        if (data.statusText == "OK") {
            if (data.data.adminlogin) {
                //if admin is login is true redirect to the home page
                console.log(data.data);
                dispatch(adminLogin(data.data))
                navigate("/dashboard/setemployee")
             

                                                                        
            }
            else {
                //if admin login is not true set a message to show on the screen     
                if (data.data.message.length > 0) {   
                    console.log(data)

                    toast.error(` ${data.data.message} `, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                     
                      })  

                    setmessage(data.data.message)                      
                }   
            }     
        }
        else {
            alert("something went wrong")
        }
    })       
}

if(isLogin){
   
  }










  
  
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
style={{fontSize:"1.8rem", width:"40rem", padding:"0 2rem"}}
/>


      <div className="login-container">    




<div className="login-box">
<div className="login-box-container">
  <h1>Admin</h1>
<div className="login-input-container">
    <input type="email" placeholder="Email or Phone" name="email" onChange={handleInput}/>
    <input type="password" placeholder="Password" name="password" onChange={handleInput} pattern="[a-zA-Z0-9]+" title="Only alphanumeric characters are allowed" required/>
</div>
<button className="primary-button" onClick={Login}> Sign In</button>
<button className="primary-button empbtn" onClick={()=>{navigate("employee")}} > Employee Login</button>
<p><span style={{color:"gray"}}> </span> <Link to={"/"} style={{fontWeight:300, color:"#fff"}}> forgot password</Link> </p>

</div>
</div>

      </div>
      </>
}

export default AdminLogin;