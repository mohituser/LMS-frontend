import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance, { apiConnector}  from "../../Helpers/axiosInstance";
import { BASE_URL } from "../../assets/data/data";
const initialState={
    data:localStorage.getItem("data")?JSON.parse(localStorage.getItem('data')):{},
    token:localStorage.getItem("token") || null,
    isLoggedIn:localStorage.getItem("isLoggedIn")|| false,
    role:localStorage.getItem("role")  || "",
}
export const createAccount= createAsyncThunk("/auth/signup",async (data)=>{
    // const BASE_URL="http://localhost:5001/api/v1/";
    try {
        console.log("data1",data)
        // const res =await axiosInstance.post("user/register", data);
        // const res= await axios.post(BASE_URL,{
        //     body:data,
        //     headers:{'Content-Type': 'multipart/form-data'}
        // });
        const res=await apiConnector("POST",BASE_URL+"user/register",data,{
            'Content-Type': 'multipart/form-data'
          });
        console.log("data2");
        // toast.promise(res,{
        //   loading:"Wait! creating your account",
        //   success:(data)=>{
        //     return data?.data?.message;
        //   },
        //   error:"failed to create account"
        // })
        toast.success("Account created successfully")
        console.log(res.data);
        return res.data;
        
    } catch (error) {
        console.log("data3")
        toast.error(error?.response?.data?.message)
    }
})

export const login= createAsyncThunk("/auth/login",async (data)=>{
    // const BASE_URL="http://localhost:5001/api/v1/";
    try {
        console.log("data1",data)
        // const res =await axiosInstance.post("user/register", data);
        // const res= await axios.post(BASE_URL,{
        //     body:data,
        //     headers:{'Content-Type': 'multipart/form-data'}
        // });
        const res=await apiConnector("POST",BASE_URL+"user/login",data);
        console.log("data2");
        // toast.promise(res,{
        //   loading:"Wait! creating your account",
        //   success:(data)=>{
        //     return data?.data?.message;
        //   },
        //   error:"failed to create account"
        // })
        toast.success("User loggedin successfully")
        console.log(res.data);
        return res.data;
        
    } catch (error) {
        console.log("data3")
        toast.error(error?.response?.data?.message)
    }
})
export const logout= createAsyncThunk("/auth/logout",async ()=>{
    // const BASE_URL="http://localhost:5001/api/v1/";
    try {
        console.log("data1")
        // const res =await axiosInstance.post("user/register", data);
        // const res= await axios.post(BASE_URL,{
        //     body:data,
        //     headers:{'Content-Type': 'multipart/form-data'}
        // });
        const res=await apiConnector("GET",BASE_URL+"user/logout");
        console.log("data2");
        // toast.promise(res,{
        //   loading:"Wait! creating your account",
        //   success:(data)=>{
        //     return data?.data?.message;
        //   },
        //   error:"failed to create account"
        // })
        toast.success("User loggedout successfully")
        console.log(res.data);
        return res.data;
        
    } catch (error) {
        console.log("data3")
        toast.error(error?.response?.data?.message)
    }
})
export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    // const BASE_URL="http://localhost:5001/api/v1/";
    console.log("dataaaaaaa",data.token);
    try {
        // const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        const response= apiConnector("Put",BASE_URL+"user/update",data.formData,{
            'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${data.token}`,
          });
        toast.promise(response, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        console.log("updated.............")
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details", async (token) => {
    // const BASE_URL="http://localhost:5001/api/v1/";
    console.log("geting user dataa>...........")
    try {
        // const res = axiosInstance.get("user/me");
        const response= await apiConnector("GET",BASE_URL+"user/me",null,{
             Authorization: `Bearer ${token}`,
          });
        return (response).data;
    } catch(error) {
        toast.error(error.message);
    }
})
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("token",action?.payload?.token);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.token = action?.payload?.token;
            state.role = action?.payload?.user?.role
        })
        builder.
        addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("token",action?.payload?.token);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.token = action?.payload?.token;
            state.role = action?.payload?.user?.role
        })
        builder.
        addCase(getUserData.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            // localStorage.setItem("token",action?.payload?.token);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            // state.token = action?.payload?.token;
            state.role = action?.payload?.user?.role
        })
        builder.
        addCase(logout.fulfilled, (state, action) => {
            localStorage.removeItem("data");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            state.isLoggedIn = false;
            state.data = {};
            state.token ="";
            state.role = null;
        })
    }

})
// export const {}=authSlice.actions;
export default authSlice.reducer;