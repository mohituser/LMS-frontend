import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import { BASE_URL } from "../../assets/data/data";

import axiosInstance ,{apiConnector} from "../../Helpers/axiosInstance";

const initialState = {
    lectures: []
}


export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (data) => {
    // const BASE_URL="http://localhost:5001/api/v1/";
    try {
        // const response = axiosInstance.get(`/courses/${cid}`);
        console.log("coursesss..........",data.token)
        const response=await apiConnector("GET",BASE_URL+`course/${data.id}`,null,{
            Authorization: `Bearer ${data.token}`,
        });
        console.log("data2");
        // toast.promise(response, {
        //     loading: "Fetching course lectures",
        //     success: "Lectures fetched successfully",
        //     error: "Failed to load the lectures"
        // });
        return ( response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    // const BASE_URL="http://localhost:5001/api/v1/";
    console.log("dataaaaaaa at lecture slice",data.token);
    try {
        // const formData = new FormData();
        // formData.append("lecture", data.lecture);
        // formData.append("title", data.title);
        // formData.append("description", data.description);

        // const response = axiosInstance.post(`/courses/${data.id}`, formData);
        let response=apiConnector("POST",BASE_URL+`course/${data.id}`,data.userInput,{
            'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${data.token}`,
          });
        toast.promise(response, {
            loading: "adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lectures"
        });
        response=await response;
        return ( response).data;
    } catch(error) {
        console.log("error at adding lecture")
        toast.error(error?.response?.data?.message);
    
    }
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    // const BASE_URL="http://localhost:5001/api/v1/";
    console.log("dataaaaaaa at lecture slice",data.token);
    try {

        // const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        const response= await apiConnector("DELETE",BASE_URL+`course/${data.cId}?cId=${data.cId}&lId=${data.lId}`,null,{
                Authorization: `Bearer ${data.token}`,
          });
          console.log("Data.........2")
        // toast.promise(response, {
        //     loading: "deleting course lecture",
        //     success: "Lecture deleted successfully",
        //     error: "Failed to delete the lectures"
        // });
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.course?.lectures;
        })
    }
});

export default lectureSlice.reducer;