import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import {FiMenu} from "react-icons/fi";
import { FaHome,FaPhoneAlt } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { useEffect, useState } from "react";
import {useSelector,useDispatch} from "react-redux"
import { logout } from "../Redux/Slices/AuthSlice";
import { NavbarLinks } from "../assets/data/data";
export default function NavBar(){
  const [drapDown ,setDrapDown]=useState(false);
  const [leftDrapDown,setLeftDrapDown]=useState(false);
  const isLoggedIn =useSelector((state)=>state?.auth?.isLoggedIn);
  const role=useSelector((state)=>state?.auth?.role);
  const user=useSelector((state)=>state?.auth?.data);
  const token=useSelector((state)=>state?.auth?.token)
  const Navigate=useNavigate();
  const DashBoard="/dashboard";
  const Allcourses="/courses";
    const dispatch=useDispatch();
   
      function fun(){console.log(isLoggedIn,user,token);}
     useEffect(()=>{
      fun()
     },[])
      const matchRoute = (route) => {
        // return matchPath({ path: route }, location.pathname)
        return true;
      }
      async function handleLogout(e){
        // e.preventdefault();
        console.log("logout")
         const res=  dispatch(logout());
         console.log(res)
        if(res?.payload?.success)
        Navigate("/")
      }
    return (
        <div
        className={` flex h-[7vh] justify-between items-center  border-b-[1px] border-b-richblack-700 ${
           "bg-richblack-800" 
        } ease-linear duration-200`}>
     
     
        <div className="flex w-11/12 m-auto   items-center justify-between">
    {/* <div  onClick={()=>setDrapDown(!drapDown)}> */}
     <FiMenu size={"32px"} onClick={()=>setDrapDown(!drapDown)} className="text-white md:hidden font-bold m-4"/>
    {/* </div> */}
     {/* Logo */}
        {/* <Link to="/">
          <img src="" alt="Logo" width={160} height={32} loading="lazy" />
        </Link> */}
          {/* Navigation links */}
          <nav className="hidden  md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              link.roles.includes("") && 
              <li key={index}>
                
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-300"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                
              </li>
            ))}
           
          </ul>
        </nav>
         {/* Login / Signup / Dashboard */}
         <div className=" items-center gap-x-4  hidden md:flex ">
         {isLoggedIn === false && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {isLoggedIn === false && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
           {isLoggedIn && (
            // <Link  >
            //   <button onClick={(e)=>handleLogout(e)} className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
            //  Logout
            //   </button>
            // </Link>
            
            <div onClick={()=>setLeftDrapDown(!leftDrapDown)} className="flex relative justify-center items-center w-[35px]">
             <img src={user?.avatar?.secure_url} alt="" className="fit" />
           
             {leftDrapDown && <div className="absolute flex flex-col p-4 rounded-md justify-center items-center gap-1 top-[6vh] right-0 z-20 bg-white w-[11vw] ">
             <ul className="flex flex-col gap-x-6 ">
            {NavbarLinks.map((link, index) => (
              link.roles.includes(role) && !link.roles.includes("") &&
              <li key={index}>
                
                  <Link to={link?.path}>
                    <p className="text-richblack-300">
                      {link.title}
                    </p>
                  </Link>
                
              </li>
            ))}
           
          {/* <div onClick={(e)=>handleLogout(e)} className="cursor-pointer text-richblack-300">Logout</div> */}
          </ul>
          {/* <Link > */}
            <button onClick={(e)=>handleLogout(e)} className="rounded-[8px] border border-richblack-50 bg-pink-500 hover:scale-105 items-center mt-3 px-[6px] py-[6px] text-richblack-300 ">
              Logout
            </button>
          {/* </Link> */}
              {/* <div className="cursor-pointer">DashBoard</div>
              <Link to="/courses"  className="cursor-pointer">Allcourses</Link> */}
             </div>}
            </div>
          )}
            </div>
        </div>
        {true && 
      <div className={`absolute flex flex-col justify-between p-3 sm:p-9 ${drapDown ?'left:0 z-20' :"-left-[50vw] -z-1"}  top-[7vh] w-[40vw] h-[80vh] transistion-all bg-white ease-linear  duration-1000`}>
        <div className="absolute right-5 top-2" onClick={()=>setDrapDown(false)}><CiCircleRemove size={"30px"} /></div>
 <nav className="md:block">
          <ul className="flex flex-col gap-3 text-richblack-300">
            {NavbarLinks.map((link, index) => (
               link.roles.includes(role) && 
              <li key={index} >
                  <Link to={link?.path}  className="flex items-center gap-1">
                      {/* {matchRoute(link?.path) ? <>{link.icon1}</> :<>{link.icon2}</>} */}
                    <p
                      className={`${
                          matchRoute(link?.path)
                          ? "text-yellow-500"
                          : "text-richblack-300"
                        }`}
                        >
                      {link.title}
                    </p>
                  </Link>
                
              </li>
            ))}
            
          </ul>
        </nav>
          {/* Login / Signup / Dashboard */}
          <div className=" gap-4 flex flex-col">
         {isLoggedIn === false && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-50 bg-richblack-25 px-[12px] py-[8px] text-richblack-300">
                Sign in
              </button>
            </Link>
          )}
          {isLoggedIn === false && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-50 bg-richblack-25 px-[12px] py-[8px] text-richblack-300">
                Sign up
              </button>
            </Link>
          )}
          {isLoggedIn && (
            <button onClick={(e)=>handleLogout(e)} className="rounded-[8px] border max-w-[150px] border-richblack-50 bg-pink-500 hover:scale-105 items-center mt-3 px-[6px] py-[6px] text-richblack-300 ">
            Logout
          </button>
          )}
            </div>

      </div>
}
</div>
    )
}
