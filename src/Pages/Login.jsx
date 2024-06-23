import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../layouts/HomeLayout';
import { login } from '../Redux/Slices/AuthSlice';
// import { login } from '../Redux/Slices/AuthSlice';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    useEffect(()=>{
        document.title="Login";
        },[])
    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onLogin(event,obj) {
        event.preventDefault();
        setLoginData(obj);
        if(!obj.email || !obj.password) {
            toast.error("Please fill all the details");
            return;
        }

        // dispatch create account action
        const response = await dispatch(login(obj));
        if(response?.payload?.success){
            navigate("/");

        setLoginData({
            email: "",
            password: "",
        });
    }
    }

    return (
        <HomeLayout>
            <div className='flex overflow-x-auto items-center justify-center h-[80vh] bg-richblack-800'>
                <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button onClick={(e)=>onLogin(e,loginData)} className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login
                    </button>
                    <p className="text-center">
                        Login as Guest
                    </p>
                    <button onClick={(e)=>onLogin(e,{email:"user@gmail.com",password:"1234567"})} className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login as student
                    </button>
                    <button onClick={(e)=>onLogin(e,{email:"mohit7089237060@gmail.com",password:"1234567"})} className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login as admin
                    </button>
                    <p className="text-center">
                        Don't hanve an account ? <Link to="/signup" className=' text-blue-200 underline cursor-pointer'> Signup</Link>
                    </p>

                </form>
            </div>
        </HomeLayout>
    );
}

export default Login;