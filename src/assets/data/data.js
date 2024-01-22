import apj from "../Images/apj.png";
import billGates from "../Images/billGates.png";
import einstein from "../Images/einstein.png";
import nelsonMandela from "../Images/nelsonMandela.png";
import steveJobs from "../Images/steveJobs.png";

export const celebrities = [
    {
        title: "Nelson Mandela",
        description: "Education is the most powerful tool you can use to change the world.",
        image: nelsonMandela,
        slideNumber: 1
    },
    {
        title: "APJ Abdul Kamal",
        description: "Failure will never overtake me if my determination to succeed is strong enough.",
        image: apj,
        slideNumber: 2
    },
    {
        title: "Albert Einstein",
        description: "A person who never made a mistake never tried anything new.",
        image: einstein,
        slideNumber: 3
    },
    {
        title: "Steve Jobs",
        description: "We don't get a chance to do that many things, and every one should be really excellent.",
        image: steveJobs,
        slideNumber: 4
    },
    {
        title: "Bill Gates",
        description: "Success is a lousy teacher. It seduces smart people into thinking they can’t lose.",
        image: billGates,
        slideNumber: 5
    },
];
export const  NavbarLinks = [
    {
      title: "Home",
      path: "/",
      roles:["","ADMIN","USER"]
    },
    {
        title: "DashBoard",
        path: "/DashBoard",
        roles:["ADMIN","USER"]
      },
      {
        title: "Profile",
        path: "/user/profile",
        roles:["ADMIN","USER"]
      },
      {
        title: "Allcourses",
        path: "/courses",
        roles:["ADMIN","USER"]
      },
      {
        title: "Create-Course",
        path: "/course/create",
        roles:["ADMIN",]
      },
   
    {
      title: "About Us",
      path: "/about",
      roles:["","ADMIN","USER"]
    },
    {
      title: "Contact Us",
      path: "/contact",
      roles:["","ADMIN","USER"]
  
    },
  ];
 export const BASE_URL="https://lms-new-back.onrender.com/api/v1";
