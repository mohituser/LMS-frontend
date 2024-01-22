import {BsFacebook,BsLinkedin,BsInstagram,BsTwitter,} from "react-icons/bs"

function Footer(){
    const date=new Date();
    const year=date.getFullYear();
return (

    <>
    <footer className='relative left-0 bottom-0 h-[15vh] md:h-[13vh]  py-5 flex flex-col md:flex-row  items-center gap-7 border-t-2 justify-between  text-white bg-richblack-800 sm:px-20'>
        <section className='text-lg'>
            Copyright {year} | All rights reserved
        </section>
        <section className='flex flex-row items-center justify-center gap-5 text-2xl text-white'>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsLinkedin />
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsInstagram />
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsFacebook />
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsTwitter />
            </a>
        </section>
    </footer>
</>

)
}
export default Footer;