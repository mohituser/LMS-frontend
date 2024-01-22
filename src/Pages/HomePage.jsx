import { Link } from "react-router-dom";
import Banner from "../assets/Images/banner.mp4"
import HomeImage from "../assets/Images/homePageMainImage.png"
import HomeLayout from "../layouts/HomeLayout";
import { useEffect } from "react";
function HomePage(){
   
    useEffect(()=>{
    document.title="Home";
    },[])
    return <HomeLayout>
    <div className="bg-richblack-800 lg:h-[80vh] md:px-20 py-24 flex  flex-col gap-3 lg:flex-row justify-between items-center">
            {/* Section 1 */}
            <div className="relative mt-0  mx-auto flex w-1/2 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
                 {/* Heading */}
        <div className="text-center text-5xl font-semibold lg:w-7/12">
          Find Out Best <span className="text-yellow-500 font-bold" > Online Courses </span>
        </div>
        {/* paragraaph */}
        <p className="text-center text-lg font-bold text-richblack-300  lg:w-8/12">
      We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
     </p>
     <div className="flex gap-5 flex-col md:flex-row ">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
       {/* Video */}
       {/* <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200"> */}
         
        {/* </div> */}
    
        </div>
       <div className="w=1/2">
        <img src={HomeImage} alt="" />
       </div>
        </div>
        </HomeLayout>
}
export default HomePage;