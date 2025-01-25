import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className=' md:mt-[130px] flex flex-col md:flex-row items-center justify-between'>
      <img className='aspect-[2/1] xs:aspect-auto md:w-2/4' src={import.meta.env.BASE_URL+"/images/svgs/404-computer.svg"} alt="" />
      <div className="md:w-2/4 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-MorabbaBold text-z-700 dark:text-white tracking-wide">صفحه مورد نظر شما یافت نشد!</h1>
      <Link to="/home" className='flex-center w-30 h-10 my-11 bg-orange-300 rounded-lg text-white'>
      صفحه اصلی
      </Link>
      </div>
    </div>
  )
}
