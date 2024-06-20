import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// import axiosInstance from "../config/axiosInstance";
import axiosInstance ,{apiConnector} from "../Helpers/axiosInstance";
// import { isEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { BASE_URL } from "../assets/data/data";

function ContactUs() {
    useEffect(()=>{
        document.title="Contact-us";
        },[])

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleInputChange(e) {
        const {name, value} = e.target;
        setUserInput({
            ...userInput, 
            [name]: value
        })
    }

    async function onFormSubmit(e)  {
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }
        // if(!isEmail(userInput.email)) {
        //     toast.error("Invalid email provided");
        //     return;
        // }
        try {
            // const BASE_URL="http://localhost:5001/api/v1/user/";
            // const response = axiosInstance.post("/contact", userInput);
            let response= apiConnector("POST",BASE_URL+"user/contact",{...userInput});
            toast.promise(response, {
                loading: "Submitting your query",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
         response = await response;
            console.log(response?.data);
            if(response?.data?.success) {
                setUserInput({
                    email: "",
                    name: "",
                    message: ""
                })
            }
        } catch(error) {
            // toast.error("operation failed....");
            toast.error(error.message);
            
        }
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] bg-richblack-800">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white shadow-[0_0_10px_black]">
                    <h1 className="text-3xl font-semibold">Contact form</h1>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            id="name"
                            className="bg-transparent px-2 py-1 border"
                            type="text"
                            placeholder="enter your name"
                            name="name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            id="email"
                            className="bg-transparent px-2 py-1 border"
                            type="email"
                            placeholder="enter your email"
                            name="email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea 
                            id="message"
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40 text-white"
                            type="text"
                            placeholder="enter your message"
                            name="message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ContactUs;