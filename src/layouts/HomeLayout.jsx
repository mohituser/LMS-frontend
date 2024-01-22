import HomePage from '../Pages/HomePage'
import NavBar from '../Components/Navbar'
import Footer from '../Components/Footer'
function HomeLayout({children}){
    return <>
    <NavBar/>
    {/* <HomePage/> */}
    {children}
    <Footer/>
    </>
}
export default HomeLayout;