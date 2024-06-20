import {BsFacebook,BsLinkedin,BsInstagram,BsTwitter,} from "react-icons/bs"
import { FaGithub } from "react-icons/fa";
function Footer(){
    const date=new Date();
    const year=date.getFullYear();
return (

    <>
    <footer className='relative left-0 bottom-0 h-[15vh] md:h-[13vh]  py-4 flex flex-col md:flex-row  items-center gap-2 border-t-2 justify-between  text-white bg-richblack-800 sm:px-20'>
    <section className='flex flex-row items-center justify-center gap-5 text-2xl md:hidden text-white'>
            <a href="https://www.linkedin.com/in/mohit-mishra-79a717251/" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsLinkedin />
            </a>
            <a href="https://github.com/mohituser" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <FaGithub/>
            </a>
            <a href="https://x.com/MohitMishr1010" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsTwitter />
            </a>
            <a href="https://x.com/MohitMishr1010" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsInstagram />
            </a>
        </section>
        <section className='text-lg'>
            Copyright {year} | All rights reserved
        </section>
        <section className='flex-row hidden md:flex items-center justify-center gap-5 text-2xl text-white'>
            <a href="https://www.linkedin.com/in/mohit-mishra-79a717251/" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsLinkedin />
            </a>
            <a href="https://github.com/mohituser" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <FaGithub/>
            </a>
            <a href="https://x.com/MohitMishr1010" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsTwitter />
            </a>
            <a href="https://x.com/MohitMishr1010" target="_blank" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsInstagram />
            </a>
        </section>
    </footer>
</>

)
}
export default Footer;