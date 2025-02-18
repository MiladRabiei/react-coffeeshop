import React, { useContext, useEffect, useRef } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import moment from "jalali-moment";
import AuthContext from '../../Context/AuthContext';

export default function UserPanel() {
    let authcontext=useContext(AuthContext)
    let mobileMenuElem=useRef()
    let overlayElem=useRef()
    let openMobileMenu=()=>{
        mobileMenuElem.current.classList.remove("-right-64")
        mobileMenuElem.current.classList.add("-right-0")
        overlayElem.current.classList.remove("hidden")

    }
    let closeMobileMenu=()=>{
        mobileMenuElem.current.classList.remove("-right-0")
        mobileMenuElem.current.classList.add("-right-64")
        overlayElem.current.classList.add("hidden")
    }
    const jalaliTextDate = moment().locale("fa").format(" jD jMMMM jYYYY");
    if(authcontext.isLoading){
        return "loading..."
    }

    return (
        <>
            {authcontext.isLoggedIn?(
                <section className='w-full h-full bg-[#f2f2f2] '>
                <div className='flex relative w-full min-h-screen'>
                    {/* sidebar */}
                    <div ref={mobileMenuElem} className=' fixed w-64 lg:w-[300px] h-screen -right-64 text-white  lg:sticky top-0 z-[15] transition-all'>
                        <div className='h-full w-full rounded-tl-xl rounded-bl-xl bg-orange-300  p-5'>
                            <div className="flex-center">
                                <svg className='w-[100px] h-[80px] text-white'>
                                    <use href='#logo-type'></use>
                                </svg>
                            </div>
                            <ul className='flex font-Dana flex-col mt-8 gap-y-2 child:px-3 child:py-3 child:flex child:items-center
                            child:text-normal child:gap-x-2  child:rounded-2xl'>
                                
                                <NavLink to={"dashboard"} className={link=>link.isActive?"bg-orange-400/30":"bg-white text-zinc-700"}>
                                    <svg className='w-7 h-7'>
                                        <use href='#squares'></use>
                                    </svg>
                                    داشبورد
                                </NavLink>
                                
                                <NavLink to={"orders"} className={link=>link.isActive?"bg-orange-400/30":"bg-white text-zinc-700"}>
                                    <svg className='w-7 h-7'>
                                        <use href='#bag'></use>
                                    </svg>
                                    سفارش ها
                                </NavLink>
                                
                                <NavLink to={"favourits"} className={link=>link.isActive?"bg-orange-400/30 fill-none":"bg-white text-zinc-700 fill-none"}>
                                    <svg className='w-7 h-7'>
                                        <use href='#heart'></use>
                                    </svg>
                                    علاقه مندی ها
                                </NavLink>
                                
                                <NavLink to={"adress"} className={link=>link.isActive?"bg-orange-400/30":"bg-white text-zinc-700 first:text-orange-500"}>
                                    <svg className='w-7 h-7'>
                                        <use href='#map'></use>
                                    </svg>
                                    آدرس ها
                                </NavLink>
                                
                                <NavLink to={"settings"} className={link=>link.isActive?"bg-orange-400/30":"bg-white text-zinc-700 first:text-orange-500"}>
                                    <svg className='w-7 h-7'>
                                        <use href='#settings'></use>
                                    </svg>
                                    تنظیمات
                                </NavLink>
                                
                                <NavLink to={"comments"} className={link=>link.isActive?"bg-orange-400/30":"bg-white text-zinc-700 first:text-orange-500"}>
                                    <svg className='w-7 h-7'>
                                        <use href='#chat'></use>
                                    </svg>
                                    نظرات
                                </NavLink>
                                
                                <NavLink to={"/"} className={link=>link.isActive?"bg-orange-400/30":"bg-white text-zinc-700 "}>
                                    <svg className='w-7 h-7'>
                                        <use href='#home'></use>
                                    </svg>
                                    <span>صفحه اصلی</span>
                                </NavLink>
                                
                                <button onClick={authcontext.logout}  className='text-red-500 bg-white'>
                                    <svg className='w-7 h-7'>
                                        <use href='#arrow-right-start'></use>
                                    </svg>
                                    خروج از حساب
                                </button>
                                
                                
                            </ul>
                        </div> 
                    </div>
                    {/* main */}
                    <div className='flex flex-col gap-y-8 w-full h-full py-6 px-5'>
                        <span className='block lg:hidden' onClick={openMobileMenu}>
                            <svg className='w-6 h-6 text-orange-300'>
                                <use href='#adjustments-horizontal'></use>
                            </svg>
                        </span>
                        {/* header */}
                        <div className='flex justify-between items-center bg-white rounded-xl w-full h-[60px] p-5'>
                            <div className='flex items-center gap-x-5'>
                                <svg className='w-6 h-6 text-orange-300 '>
                                    <use href='#person'></use>
                                </svg>
                                <div className='flex h-full  items-center gap-x-2'>
                                    <span className='text-sm xs:text-base'>
                                         {authcontext.userInfos.username}
                                    </span>
                                    <span className="hidden xs:block w-px h-10 bg-orange-300"></span>
                                    <span className='hidden xs:block'>مشتری</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-1'>
                                <span className='text-sm xs:text-base'>
                                    {jalaliTextDate}
                                </span>
                                <span className='bg-orange-300  rounded-tl-lg rounded-bl-lg px-2 py-1'>امروز</span>
                            </div>
                        </div>
                        <div><Outlet/></div>
                    </div>
                </div>
                <div ref={overlayElem} onClick={closeMobileMenu} className="overlay hidden fixed inset-0 bg-black/40 z-10"></div>
            </section>
            ):(
                <Navigate to={"/login"}/>
            )}
        </>
    )
}
