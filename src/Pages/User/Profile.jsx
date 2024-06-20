import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
// import { getUserData } from "../../Redux/Slices/AuthSlice";
// import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);
    useEffect(()=>{
        document.title="Profile";
        },[])
    async function handleCancellation() {
        toast("Initiating cancellation");
        // await dispatch(cancelCourseBundle());
        // await dispatch(getUserData());
        toast.success("Cancellation completed!");
        navigate("/");

    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-richblack-800">
                <div className=" flex flex-col gap-4 rounded-lg p-4 text-white min-w-96 shadow-[0_0_10px_black]">
                   {userData?.avatar?.secure_url ? <img
                        src={userData?.avatar?.secure_url}
                        className="w-40 h-40 items-center m-auto rounded-full border border-black"
                    />:<BsPersonCircle className="w-28 h-28 rounded-full m-auto " />
                    }
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2 ">
                        <p>Email: </p><p>{userData?.email}</p>
                        <p>Role: </p><p>{userData?.role}</p>
                        {/* <p>Subscription: </p> */}
                        {/* <p>{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p> */}
                    </div>
                    <div className="flex text-center ">
                        {/* <Link 
                            to="/changepassword" 
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Change password</button>

                        </Link> */}
                        <Link 
                            to="/user/editprofile" 
                            className="w-1/2 mx-auto bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Edit profile</button>

                        </Link>
                    </div>
                    {userData?.subscription?.status === "active" && (
                        <button onClick={handleCancellation} className="w-full bg-pink-500 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    );

}

export default Profile;