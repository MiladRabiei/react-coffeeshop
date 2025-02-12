import React, { useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
export default function Product({id,name, off, src, count, price }) {
    let location = useLocation()
    let isStorePage = location.pathname === "/Store"
    let isFavoritesPage=location.pathname ==="/userpanel/favourits"
    let authContext=useContext(AuthContext)
    
    let addToShopBox=(id)=>{
        authContext.addtoshopbox(id)
    }
    let addToFavorites=(id)=>{
        authContext.addtofavorites(id)
    }
    let removeFromFavorites=(id)=>{
        authContext.removefromfavorites(id)
    }
    return (
        <>

        <div className='group p-2 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl'>
            <div className='relative mb-2 md:mb-5 '>
                <img src={import.meta.env.BASE_URL+src} className='group-hover:scale-105 duration-300 overflow-hidden rounded-lg  mx-auto md:w-auto' alt="" />
                {off ? (
                <>
                <span className='absolute top-1.5 right-1.5 block h-5 md:h-[30px]  text-xs/[24px] md:text-base/[34px] font-DanaDemiBold bg-orange-300 text-white dark:text-zinc-700 px-2.5 md:px-3.5  rounded-full '>{off}%</span>
                </>

                ) : 
                (null)
                }
                {isFavoritesPage&&(
                <span onClick={()=>removeFromFavorites(id)} className='absolute top-1 left-1 block h-5 md:h-[30px] text-zinc-700 cursor-pointer   rounded-full '>
                    <svg className='w-5 h-5 text-zinc-700'>
                        <use href='#x-mark'></use>
                    </svg>
                </span>
                )}
                </div>
                <Link to={`/Product-info/${id}`} className="font-DanaMedium h-10 md:h-14 text-zinc-700 dark:text-white text-sm md:text-xl line-clamp-2">
                    {name}
                </Link>
                {
                    !isStorePage ? (
                        <>
                            <div className='flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5 overflow-hidden '>
                                {count > 0 ? (
                                    <>
                                        {off ? (
                                            <>
                                                <div className='text-teal-600 dark:text-emerald-500'>
                                                    <span className='font-DanaDemiBold text-base md:text-xl'>{(price-((price * off)/100)).toLocaleString()}</span>
                                                    <span className='text-xs md:text-sm tracking-tighter'>تومان</span>
                                                </div>
                                                <div className='offer '>
                                                    <span className='text-xs md:text-xl'>{price.toLocaleString()}</span>
                                                    <span className='hidden lg:inline text-xs md:text-sm tracking-tighter'>تومان</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className='text-teal-600 dark:text-emerald-500'>
                                                <span className='font-DanaDemiBold text-base md:text-xl'>{price.toLocaleString()}</span>
                                                <span className='text-xs md:text-sm tracking-tighter'>تومان</span>
                                            </div>
                                        )}

                                    </>
                                ) : (
                                        <div className='text-red-400'>
                                            <span className=' text-base md:text-xl'>فعلا موجود نیست</span>
                                        </div>

                                    
                                )}
                            </div>
                            <div className=' flex items-center justify-between mt-2.5'>
                                <div className='flex items-center gap-x-2.5 md:gap-x-3'>
                                    <span onClick={()=>addToShopBox(id)} className='flex-center w-[26px] h-[26px] md:w-9 md:h-9 text-gray-400 bg-gray-100 dark:bg-zinc-800 hover:text-white hover:bg-teal-600 dark:hover:text-white dark:hover:bg-emerald-500 transition-all rounded-full cursor-pointer'>
                                        <svg className=' w-4 h-4 md:w-[22px] md:h-[22px] '>
                                            <use href='#shopping-cart'></use>
                                        </svg>
                                    </span>
                                    <span onClick={()=>addToFavorites(id)} className={`block  hover:text-teal-600  dark:hover:text-emerald-500  transition-all rounded-full cursor-pointer ${authContext.userInfos.favorites?.some(item=>item.id===id)?"fill-red-500 text-red-500":"fill-current text-gray-200 dark:text-gray-400"}`}>
                                        <svg className=' w-4 h-4 md:w-6 md:h-6 '>
                                            <use href='#heart'></use>
                                        </svg>
                                    </span>
                                </div>
                                <div className='flex text-yellow-400'>
                                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                                        <use href='#star'></use>
                                    </svg>
                                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                                        <use href='#star'></use>
                                    </svg>
                                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                                        <use href='#star'></use>
                                    </svg>
                                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                                        <use href='#star'></use>
                                    </svg>
                                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                                        <use href='#star'></use>
                                    </svg>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                        <div className='flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5 overflow-x-hidden'>
                            {count > 0 ? (
                                <>
                                    {off ? (
                                        <>
                                            <div className='text-teal-600 dark:text-emerald-500'>
                                                <span className='font-DanaDemiBold text-sm md:text-base'>{(price-((price * off)/100)).toLocaleString()}</span>
                                                <span className='text-xs md:text-sm tracking-tighter'>تومان</span>
                                            </div>
                                            <div className='offer'>
                                                <span className='text-xs md:text-base'>{price.toLocaleString()}</span>
                                                <span className='hidden lg:inline text-xs md:text-sm tracking-tighter'>تومان</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='text-teal-600 dark:text-emerald-500'>
                                            <span className='font-DanaDemiBold text-sm md:text-base'>{price.toLocaleString()}</span>
                                            <span className='text-xs md:text-sm tracking-tighter'>تومان</span>
                                        </div>
                                    )}

                                </>
                            ) : (
                                
                                    <div className='text-red-400'>
                                        <span className=' text-sm md:text-base'>فعلا موجود نیست</span>
                                    </div>

                                
                            )}
                        </div>
                        <div className=' flex items-center justify-between mt-2.5'>
                            <div className='flex items-center gap-x-2.5 md:gap-x-3'>
                                <span onClick={()=>addToShopBox(id)} className='flex-center w-[26px] h-[26px] md:w-9 md:h-9 text-gray-400 bg-gray-100 dark:bg-zinc-800 hover:text-white hover:bg-teal-600 dark:hover:text-white dark:hover:bg-emerald-500 transition-all rounded-full cursor-pointer'>
                                    <svg className=' w-4 h-4 md:w-5 md:h-5 '>
                                        <use href='#shopping-cart'></use>
                                    </svg>
                                </span>
                                <span onClick={()=>addToFavorites(id)} className={`block  hover:text-teal-600  dark:hover:text-emerald-500  transition-all rounded-full cursor-pointer ${authContext.userInfos.favorites?.some(item=>item.id===id)?"fill-red-500 text-red-500":"fill-current text-gray-200 dark:text-gray-400"}`}>
                                    <svg className=' w-4 h-4 md:w-5 md:h-5 '>
                                        <use href='#heart'></use>
                                    </svg>
                                </span>
                            </div>
                            <div className='flex text-yellow-400'>
                                <svg className='w-4 h-4 md:w-5 md:h-5'>
                                    <use href='#star'></use>
                                </svg>
                                <svg className='w-4 h-4 md:w-5 md:h-5'>
                                    <use href='#star'></use>
                                </svg>
                                <svg className='w-4 h-4 md:w-5 md:h-5'>
                                    <use href='#star'></use>
                                </svg>
                                <svg className='w-4 h-4 md:w-5 md:h-5'>
                                    <use href='#star'></use>
                                </svg>
                                <svg className='w-4 h-4 md:w-5 md:h-5'>
                                    <use href='#star'></use>
                                </svg>
                            </div>
                        </div>
                        </>  
                    )
                }
        </div>
        </>


    )
}
