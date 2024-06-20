import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { createNewCourse, editCourse } from "../../Redux/Slices/CourseSlice";
import { apiConnector } from "../../Helpers/axiosInstance";
import { BASE_URL } from "../../assets/data/data";
import axios from "axios";

function EditCourse() {

    const dispatch = useDispatch();
    const {state}=useLocation();
    const navigate = useNavigate();

    const token=useSelector((state)=>state?.auth?.token)

    const [userInput, setUserInput] = useState({
        title: state?.title,
        category: state?.category,
        createdBy: state?.createdBy,
        description: state?.description,
        previewImage: state?.thumbnail?.secure_url,
    
        
    });
    const [thumbnail,setThumbnail]=useState(state?.thumbnail);
    useEffect(()=>{
        document.title="Create-Course";
        console.log("state",state);
        },[])
   async function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                
                })
            })
          
                // mishraraj wala gmail
    console.log(uploadedImage);
    const data=new FormData();
    data.append("file",uploadedImage);
    data.append("upload_preset","insta-clone2");
    data.append("cloud_name","mohit-cloud2");
    // for uploading images use this  link and rest are same
    // fetch("https://api.cloudinary.com/v1_1/mohit-cloud2/image/upload",{
    //          method:"post",
    //     body:data,
    // }).then(res=>res.json()).
    // then(data=>{console.log(data.secure_url);setThumbnail(data.secure_url);}).catch(err=>console.log(err));
    try{
//   let response=  axios("https://api.cloudinary.com/v1_1/mohit-cloud2/image/upload");
let response = fetch("https://api.cloudinary.com/v1_1/mohit-cloud2/image/upload",{
             method:"post",
        body:data,
    })
  toast.promise(response, {
    loading: "uploading image",
    success: "uploaded",
    error: "Failed to create course"
});

response=await response;
response=await response.json();
    console.log("response of coudinary....",response);
    setThumbnail({public_id:response?.public_id,secure_url:response?.secure_url});
        }catch(err){
            console.log(err);
        }
        
        }
    }

    function handleUserInput(e) {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if(!userInput.title || !userInput.description || !thumbnail ||  !userInput.category  || !userInput.createdBy) {
            toast.error("All fields are mandatory");
            return;
        }
console.log("thumbnail........." ,thumbnail);
console.log("submit........." ,userInput);
const inp={...userInput,thumbnail,previewImage:null}
const formData = new FormData();
formData.append("title", userInput.title);
formData.append("category", userInput.category);
formData.append("createdBy", userInput.createdBy);
formData.append("description", userInput.description);
// formData.append("previewImage", userInput.previewImage);
// formData.append("thumbnail", thumbnail);
try{
        const response = await dispatch(editCourse({inp,token,id:state?._id}));
        // const response= await apiConnector("POST",BASE_URL+"course/id",{...inp},{
        //      Authorization: `Bearer ${token}`,
            
        //   },)
        if(response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            });
            navigate("/courses");
        }
    }
    catch(err){
        console.log(err);
    }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] bg-richblack-800">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                    
                    <Link onClick={()=>navigate(-1)} className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-2xl font-bold">
                        Update Course
                    </h1>

                    <main className="flex flex-col md:flex-row justify-between items-center  gap-5" >
                        <div className="flex flex-col gap-y-6 w-[70%] md:w-1/2">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img 
                                            className="w-full h-44 m-auto border"
                                            src={userInput.previewImage}
                                        />
                                    ): (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                        </div>
                                    )}

                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_uploads"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Course title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-[70%] md:w-1/2">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="createdBy">
                                    Course Instructor
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter course instructor"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="category">
                                    Course category
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter course category"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    Course description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className={`bg-transparent px-2 py-1 h-24 ${userInput?.description?.length>150?"overflow-y-scroll":""}  resize-none border`}
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    <button type="submit" className=" md:w-full w-[70%] mx-auto py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    Edit Course
                    </button>


                </form>
            </div>
        </HomeLayout>
    )
}

export default EditCourse;