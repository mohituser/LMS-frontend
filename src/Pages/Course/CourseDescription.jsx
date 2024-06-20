import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { useEffect } from "react";

function CourseDescription() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const { role, data } = useSelector((state) => state.auth);
    
    
    useEffect(()=>{
        
            document.title="Course-Description";
           console.log("state",state);
        if(state==null)navigate("/courses")
       },[])
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col  items-center justify-center text-white bg-richblack-800">
                <div className="flex flex-col md:flex-row  gap-10 py-10 relative    rounded-lg shadow-[0_0_10px_black]">
                    <div className="space-y-5 px-5    ">
                        <img 
                            className="w-full h-64"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />

                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.numberOfLectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>

                            </div>

                            { role === "ADMIN" || role==="USER" || data?.subscription?.status === "active" ? (
                                <button onClick={() => navigate("/course/displaylectures", {state: {...state}})} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Watch lectures
                                </button>
                                ) : (
                                    <button onClick={() => navigate("/login")} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                        Watch lectures
                                    </button>
                                )

                            }
                        </div>
                       

                    </div>
                       <div className=" w-0 border border-richblack-50"> </div>
                    <div className="space-y-2 text-xl px-1">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                        <p className="text-yellow-500 underline">Title: </p>
                           <p> {state?.title}</p>
                        </h1>

                        <p className="text-yellow-500 text-2xl text-center underline font-bold mb-4">Course description: </p>
                        <p className="text-yellow-500 text-center">{state?.description}</p>
                    </div>
                   
                </div>
                {role === "ADMIN" && 
                <div className="flex flex-col md:flex-row w-[60%] mb-5 gap-3 items-center justify-around   mt-10 ">
                        <div
                              onClick={() => navigate("/editcourse", { state: {...state}})}
                            className=" px-4 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Edit Course</button>

                        </div>
                        <button
                            onClick={() => navigate("/course/addlecture", {state: {...state}})}
                            className=" px-4  bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Add Lecture</button>

                        </button>
                    </div>}
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;