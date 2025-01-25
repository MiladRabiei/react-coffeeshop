import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function Forbidden() {
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme")); // Get the theme value as a boolean
    if (savedTheme) {
      document.documentElement.classList.add("dark"); // Instead of document.body

    } else {
      document.documentElement.classList.remove("dark"); // Instead of document.body

    }
  }, []);
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-screen  ">
      <img src={import.meta.env.BASE_URL+"/images/403-forbidden.png"} alt="" className='aspect-[3/1] md:aspect-auto md:w-[57%] h-full flex-1 object-contain' />
      <div className='md:w-[43%] flex flex-col items-center md:items-start justify-center text-zinc-700 p-5 dark:text-white'>
        <h1 className='text-3xl font-MorabbaBold my-4'>ورود ممنوع!</h1>
        <h2 className='text-2xl lg:text-3xl font-MorabbaLight my-4'>شما اجازه دسترسی به این صفحه را ندارید</h2>
        <Link to="/Home" className=" my-8  w-40 h-10 bg-[#5ac1b2] flex-center text-white rounded-lg">
          برو به صفحه اصلی
        </Link>
      </div>

    </div>
  )
}






