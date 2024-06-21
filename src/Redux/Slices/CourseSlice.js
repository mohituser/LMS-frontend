import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance, { apiConnector}  from "../../Helpers/axiosInstance";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../assets/data/data";
const initialState = {
    courseList: []
}

export const getAllCourses = createAsyncThunk("/course/getAllCourses", async () => {
    // const BASE_URL="http://localhost:5001/course/";
    // const BASE_URL="http://localhost:5001/api/v1/";
    try {
        // const response = axiosInstance.get("/courses", data);
        console.log("coursesss..........")
        const res= apiConnector("GET",BASE_URL+"course/");
        // const res=await apiConnector("GET","api/v1/course/");
        // const res=await axios("api/v1/course")
        console.log("data2");
        toast.promise(res, {
            loading: 'Wait! fetching all courses',
            success: "fetched",
            error: 'Failed to load courses'
        });
        return (await res).data.courses;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
});

export const createNewCourse= createAsyncThunk("/course/create", async (data) => {
    // const BASE_URL="http://localhost:5001/api/v1/";
    console.log("dataaaaaaa",data.token);
    // const PE=useSelector((state)=>state?.auth?.token)
    try {
        // let formData = new FormData();
        // formData.append("title", data?.title);
        // formData.append("description", data?.description);
        // formData.append("category", data?.category);
        // formData.append("createdBy", data?.createdBy);
        // formData.append("thumbnail", data?.thumbnail);

        // const response = axiosInstance.post("/courses", formData);
        //  'Content-Type': 'multipart/form-data'
        const response= apiConnector("POST",BASE_URL+"course/",data.userInput,{
            'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${data.token}`,
          });
        // const response =axios.post(BASE_URL+"course/",data,{ ['Content-Type']: 'multipart/form-data'  ,withCredentials: true })
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});
export const editCourse = createAsyncThunk("/course/edit", async (data) => {
    // const BASE_URL="http://localhost:5001/api/v1/";
    console.log("dataaaaaaa",data.inp);
    // const PE=useSelector((state)=>state?.auth?.token)
    try {

const inp=data.inp;
        const response= apiConnector("PUT",BASE_URL+`course/${data.id}`,{...inp},{
            // 'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${data.token}`,
            
          },
        
        );
        // const response =axios.post(BASE_URL+"course/",data,{ ['Content-Type']: 'multipart/form-data'  ,withCredentials: true })
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course updated",
            error: "Failed to create course"
        });

    
        return (await response).data

    } catch(error) {
        toast.error(error?.response?.data?.message);
        // toast.error(error);
    }
});
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
        addCase(getAllCourses.fulfilled, (state, action) => {
            console.log(action.payload)
            if(action?.payload) {
                state.courseList = [...action.payload];
            }
        })
        
    }
});
export default courseSlice.reducer;