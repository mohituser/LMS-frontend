import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function Displaylectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token=useSelector((state)=>state.auth.token)
    const [toDelete ,setToDelete]=useState({courseId:null,lectureId:null});
    const {state} = useLocation();
    const {lectures} = useSelector((state) => state.lecture);
    // const lectures=["hi","hi","hi","hi","hi","hi","hi","hi","hi",]
    const {role} = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete() {
        if(!toDelete.courseId)return;
        // console.log("id........",courseId, lectureId);
        await dispatch(deleteCourseLecture({token,cId: toDelete.courseId, lId:toDelete.lectureId}));
    
        setToDelete({courseId:null,lectureId:null});
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
                    (<div className="flex flex-col md:flex-row item-center lg:justify-between justify-center lg:px-6 gap-10 w-full">
                    {/* left section for playing videos and displaying course details to admin */}
                   <div className="space-y-5 flex flex-col md:min-h-[50vh] h-[70vh] p-3 m-auto md:m-0 md:w-[50%] w-[80%]  rounded-lg shadow-[0_0_10px_black]">
                        <video 
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill  rounded-tl-lg rounded-tr-lg w-[100%] md:min-h-[70%] min-h-[80%]"   
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
                   <div  className={`relative  max-h-[70vh]  overflow-y-auto p-5 m-auto md:m-0 md:w-[40%] lg:w-[35%] w-[80%]  rounded-lg shadow-[0_0_10px_black] space-y-4 text-white`}>
                   <div className="font-bold underline text-2xl text-center  text-yellow-500 ">
                        Lectures list
                        </div>
                   <ul className=" min-h-[76%]">
                       
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
                                        {role === "ADMIN" ?(
                                            <button onClick={() => setToDelete({courseId:state?._id, lectureId:lecture?._id})} className=" px-2 bg-pink-400 py-1 rounded-md font-semibold text-sm">
                                                Delete lecture
                                            </button>
                                        )  :( <button onClick={() => setCurrentVideo(idx)} className=" px-2 bg-pink-400 py-1 rounded-md font-semibold text-sm">
                                        Watch lecture
                                    </button>)}
                                    </li>
                                )
                            })    
                        }
                         </ul>
                        {role === "ADMIN" && (<div className="w-10/12 mx-auto">
                                <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className=" px-2 bg-blue-300 w-full text-white py-1 rounded-md font-semibold text-xl ">
                                    Add new lecture
                                </button>
                           </div> )}
                        
                </div> 
                </div>) : (
                   role === "ADMIN" && (<>
                    <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="  px-2 bg-blue-300 text-white py-1 rounded-md font-semibold text-xl w-9/12 ">
                        Add new lecture
                    </button>
               </> )
                )}
            </div>
            {  toDelete.courseId &&  
        <div className="fixed  left-0 right-0 top-0 bottom-0 z-40 flex justify-center items-center bg-richblack-5 bg-opacity-40">
             <div className=" bg-richblack-50 p-5 z-50 flex flex-col gap-5  h-[150px] w-[300px] rounded-sm shadow-2xl">
         <p>Do you want to delete this lecture?</p>
         <div className=" flex justify-around">
         <button onClick={()=>onLectureDelete()}  className="px-4 rounded-md py-1   border-richblack-50 bg-pink-500 hover:scale-105   text-richblack-300 ">
              Yes
            </button>
            <button onClick={()=>setToDelete({courseId:null,lectureId:null})}  className=" px-4 rounded-md  py-1 border-richblack-50 bg-blue-500 hover:scale-105   text-richblack-300 ">
              No
            </button>
         </div>
             </div>
        </div>}


        </HomeLayout>
    );
}

export default Displaylectures;