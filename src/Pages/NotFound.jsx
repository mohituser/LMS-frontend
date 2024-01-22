import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    useEffect(()=>{
        document.title="Not-found";
        },[])
    return (
        <div className="h-[100vh] w-full flex flex-col justify-center items-center bg-richblack-700">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            <div className="bg-richblack-900  text-white px-2 text-sm rounded  absolute top-[45vh]">
                Page not found ...
            </div>
            <button className="mt-5  text-yellow-500 group hover:bg-yellow-900 border-solid border-2 border-yellow-600 p-3">
                <Link className="">
                    <span onClick={() => navigate(-1)} >
                        Go Back
                    </span>
                </Link>
            </button>
        </div>
    );
}

export default NotFound;