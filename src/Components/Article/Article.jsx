import React from 'react'
import { Link } from 'react-router-dom'
export default function Article(props) {
  console.log(props.date);
  let parts=props.date.split(" ")

  return (
    <div className='flex sm:block gap-x-2.5 group p-2.5 md:pb-2 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl'>
                        {/* item-banner */}
                        <div className='w-[130px] h-[130px] shrink-0  flex flex-grow sm:w-auto sm:h-[141px] lg:h-[190px] relative sm:mb-4 rounded-2xl rounded-bl-4xl overflow-hidden'>
                          <img className='w-full h-full object-cover sm:w-auto sm:h-auto ' src={import.meta.env.BASE_URL +props.src}  />
                          <div className='absolute inset-0 w-full h-full hidden invisible opacity-0 group-hover:opacity-100 group-hover:visible md:flex-center bg-gradient-to-r from-orange-200/80 to-orange-300/80 transition-all delay-100'>
                            <svg className='w-[138px] h-[54px] text-amber-900'>
                              <use href="#logo-type"></use>
                            </svg>
                          </div>
                        </div>
                        {/* item-caption */}
                        <div className='w-full flex flex-col sm:flex-row items-start justify-between'>
                          <Link to={`/article-info/${props.id}`} className='font-DanaMedium md:font-Dana text-sm/7 line-clamp-2 lg:text-lg ml-1.5 sm:ml-0 mt-2.5 sm:mt-0  md:max-w-[193px] text-zinc-700 dark:text-white '>{props.title}</Link>
                          <div className='hidden sm:flex gap-5'>
                            <span className="hidden lg:block w-px h-[61px] bg-gray-100 dark:bg-white/10 "></span>
                            <div className='flex flex-col ml-3 lg:ml-[18px] -mt-1 text-teal-600 dark:text-emerald-500 text-sm text-left '>
                              <span className='font-DanaDemiBold md:text-xl lg:text-2xl '>{parts[0]}</span>
                              <span>{parts[1]}</span>
                              <span>{parts[2]}</span>
                            </div>
                          </div>
                          <div className="flex items-end justify-between w-full sm:hidden border-t border-gray-100 dark:border-t-white/10 pt-[18px] pb-1.5 ">
                            <span className='text-teal-600 dark:text-emerald-500 text-xs'>{props.date}</span>
                            <Link to={`/article-info/${props.id}`} className="flex items-center gap-x-1 ml-1.5 font-DanaMedium text-xs h-5 rounded-md pr-2.5 pl-2 bg-orange-200/20 text-orange-300">
                              مطالعه
                              <svg className='w-3.5 h-3.5'>
                                <use href='#arrow-left'></use>
                              </svg>
                            </Link>
                          </div>
                        </div>
                  </div>
  )
}
