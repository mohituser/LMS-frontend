import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function Displaylectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token=useSelector((state)=>state.auth.token)
    const {state} = useLocation();
    const {lectures} = useSelector((state) => state.lecture);
    // const lectures=["hi","hi","hi","hi","hi","hi","hi","hi","hi",]
    const {role} = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        console.log("id........",courseId, lectureId);
        await dispatch(deleteCourseLecture({token,cId: courseId, lId:lectureId}));
    
        const id=state._id;
       await dispatch(getCourseLectures({token,id}))
    }

    useEffect(() => {
         document.title="Lectures";
        console.log("fetching...lecture........",state);
        if(!state) navigate("/courses");
        const id=state._id;
        dispatch(getCourseLectures({token,id}));
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10   items-center justify-center min-h-[90vh] py-10 text-wihte  bg-richblack-800">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>

                {(lectures && lectures.length > 0 ) ?  
                    (<div className="flex flex-col md:flex-row item-center justify-center gap-10 w-full">
                    {/* left section for playing videos and displaying course details to admin */}
                   <div className="space-y-5 h-[70vh] p-5 m-auto md:m-0 w-[50%]   rounded-lg shadow-[0_0_10px_black]">
                        <video 
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill  rounded-tl-lg rounded-tr-lg w-[90%]"   
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"

                        >
                        </video>    
                        <div className="text-white ">
                            <p>
                                <span className="text-yellow-500 text-xl"> Title: {" "}
                                </span>
                                {lectures && lectures[currentVideo]?.title}
                            </p>
                            <p>
                                <span className="text-yellow-500  text-xl">
                                    Description: {" "}
                                </span>
                                {lectures && lectures[currentVideo]?.description}
                            </p>
                        </div>
                   </div>

                   {/* right section for displaying list of lectres */}
                   <ul className={`relative min-w-[30%] h-auto max-h-[70vh]  ${lectures.length>4 ?"overflow-y-scroll" :""} p-5 m-auto md:m-0  rounded-lg shadow-[0_0_10px_black] space-y-4 text-white`}>
                        <li className="font-semibold text-2xl text-yellow-500 flex items-center justify-between">
                            <p>Lectures list</p>
                            {/* {role === "ADMIN" && (
                                <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className=" px-2 bg-blue-300 text-white py-1 rounded-md font-semibold text-sm">
                                    Add new lecture
                                </button>
                            )} */}
                        </li> 
                        {lectures && 
                            lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id} >
                                        <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                            <span>
                                                {" "} Lecture {idx + 1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {role === "ADMIN" && (
                                            <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className=" px-2 bg-pink-400 py-1 rounded-md font-semibold text-sm">
                                                Delete lecture
                                            </button>
                                        )}
                                    </li>
                                )
                            })    
                        }
                        
                        {role === "ADMIN" && (<li className="">
                                <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className=" px-2 bg-blue-300 text-white py-1 rounded-md font-semibold text-xl w-10/12 ">
                                    Add new lecture
                                </button>
                           </li> )}
                        
                   </ul>
                </div>) : (
                   role === "ADMIN" && (<>
                    <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="  px-2 bg-blue-300 text-white py-1 rounded-md font-semibold text-xl w-9/12 ">
                        Add new lecture
                    </button>
               </> )
                )}
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;