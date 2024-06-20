import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer'
// import HomeLayout from './layouts/HomeLayout'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import NavBar from './Components/Navbar'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import ContactUs from './Pages/ContactUs'
import Denied from './Pages/Denied'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import CourseDescription from './Pages/Course/CourseDescription'
import EditCourse from './Pages/Course/editCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Displaylectures from './Pages/Dashboard/DisplayLectures'
import AddLecture from './Pages/Dashboard/AddLecture'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
    {/* <HomeLayout/> */}
    <Routes>
   {/* <Route path='/' element={<HomePage/>}></Route>  */}
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/about' element={<AboutUs/>}></Route>
      <Route path='/contact' element={<ContactUs/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/courses' element={<CourseList/>}></Route>

      <Route path='/denied' element={<Denied/>}></Route>
    
      <Route path="/course/description" element={<CourseDescription />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
           <Route path="/course/addlecture" element={<AddLecture/>} />
            <Route path="/dashboard" element={<CourseList/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/editprofile' element={<EditProfile />} />
          <Route path='/editcourse' element={<EditCourse/>} />
             {/* <Route path="/dashboard" element={<CourseList/>} /> */}
          {/* <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/fail' element={<CheckoutFailure />} />*/}
          <Route path='/course/displaylectures' element={<Displaylectures />}/>  
        </Route>
      <Route path='/*' element={<NotFound/>}></Route>
    </Routes>

     </div>
  )
}

export default App
