import React, { useContext, useState } from 'react'
import AuthContext from '../../Context/AuthContext'

export default function Comment({id,title,suggested,content,date,username,userID,productID,likecount,dislikecount,isapproved,handleLike,handleDisLike}) {
    let authContext=useContext(AuthContext)
    let [isLiked,setIsLiked]=useState(false)
    let [isDisliked,setIsDisliked]=useState(false)
    return (
        <>
            <li className='py-4 border-b border-gray-200 child:border-white/20'>
                <div className='flex items-center gap-x-2'>
                    <h2 className='font-DanaMedium text-lg mb-1'>{title}</h2>
                    <span className='px-2 py-1 rounded-lg bg-orange-300 text-white text-xs'>خریدار</span>
                </div>
                <div className='flex flex-col'>
                    {suggested?(
                        <h2 className='flex items-center gap-x-1 text-green-500 mb-4'>
                        <svg className='w-4 h-4'>
                            <use href='#hand-up'></use>
                        </svg>
                        پیشنهاد میشود
                    </h2>
                    ):(
                        <h2 className='flex items-center gap-x-1 text-red-500 mb-4'>
                        <svg className='w-4 h-4'>
                          <use href='#hand-down'></use>
                        </svg>
                        پیشنهاد نمیشود
                      </h2>
                    )}
                    <p className='text-gray-500 dark:text-gray-200 mb-2 line-clamp-2'>{content}</p>
                </div>
                <div className='mt-2 lg:mt-0 flex flex-col justify-between gap-y-2 lg:flex-row lg:items-center'>
                    <div className='flex items-center gap-x-4 text-gray-400 text-sm'>
                        <span>{date}</span>
                        <span>{username}</span>
                    </div>
                    <div className='flex items-center gap-x-2 mt-2'>
                        <p className='text-gray-400 text-sm'>آیا این دیدگاه برایتان مفید بود؟</p>
                        <div className='flex items-center gap-x-2 child:gap-x-1 child:p-2 child:rounded-lg child:delay-150 child:font-DanaMedium child:text-sm'>
                        <button disabled={!authContext.isLoggedIn||isLiked} onClick={()=>{
                            handleLike(id,likecount,dislikecount)
                            setIsLiked(true)
                            }} className='flex items-center text-green-600 ring-transparent ring-1 focus:ring-green-600 focus:dark:ring-green-600 '>
                                {likecount>0&&likecount}
                                <svg className='w-4 h-4'>
                                    <use href='#hand-up'></use>
                                </svg>
                            </button>
                            <button disabled={!authContext.isLoggedIn||isDisliked} onClick={()=>{
                                handleDisLike(id,likecount,dislikecount)
                                setIsDisliked(true)
                                }} className='flex items-center text-red-500 ring-transparent ring-1 focus:ring-red-500 focus:dark:ring-red-500'>
                                {dislikecount>0&&dislikecount}
                                <svg className='w-4 h-4'>
                                    <use href='#hand-down'></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}
