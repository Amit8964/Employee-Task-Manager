import { createSlice } from "@reduxjs/toolkit";






const initialState = {
   
      logindetails:{  id:"",
        name:"",
        email:"",
        isLogin:false,
},
tasks:[],
employees:[]
        
};

export const adminSlice = createSlice({

name:"user",
initialState,
reducers:{

    adminLogin:(state,action)=>{
        state.logindetails.id = action.payload.userData._id     
        state.logindetails.name= action.payload.userData.name
        state.logindetails.email= action.payload.userData.email
        state.logindetails.isLogin=true
              
    },
    
    adminLogout:(state,action)=>{    
state.logindetails.id = ""
state.logindetails.email = ""
state.logindetails.name = ""
state.logindetails.isLogin = false
    },

    getTask:(state,action)=>{
state.tasks = action.payload;
    },
    getEmployee:(state,action)=>{
        state.employees = action.payload;
            }


}


})


export const { adminLogin , adminLogout, getTask , getEmployee} = adminSlice.actions;
export default adminSlice.reducer