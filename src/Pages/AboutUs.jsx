import HomeLayout from "../layouts/HomeLayout";
import aboutMainImage from "../assets/Images/aboutMainImage.png";
import { celebrities } from "../assets/data/data";
import CarouselSlide from "../Components/CarouselSlide";
import { useEffect, useState } from "react";
export default function AboutUs(){
    const [slide,setSlide]=useState(0);
    useEffect(()=>{
        document.title="About-us";
        },[])
    return (
        <HomeLayout>
 <div className=" pt-10 flex flex-col items-center justify-center text-white bg-richblack-800">
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 mx-10">
                    <section className="w-[40%] space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the afoordable and quality education to the world. 
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.  
                        </p>
                    </section>

                    <div className="w-[30%]">
                        <img
                            id="test1"
                            
                            alt="about main image"
                            className=""
                            src={aboutMainImage}
                        />
                    </div>
                </div>
                <div className="carousel m-auto my-16 h-[50vh]">
                    {/* {celebrities && celebrities.map(celebrity => ( */}
                    <CarouselSlide
                     {...celebrities[slide]}
                    key={celebrities[slide].slideNumber} 
                    totalSlides={celebrities.length}
                    setSlide={setSlide} 
                    slide={slide}                                         
                    />
                    
                </div>
            </div>
        </HomeLayout>
    )
}