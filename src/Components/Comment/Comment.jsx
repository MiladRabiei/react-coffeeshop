import React, { useContext, useState } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useLocation } from 'react-router-dom'
export default function Comment({id,title,suggested,content,date,username,userID,productID,isapproved,productName}) {
    let authContext=useContext(AuthContext)
    let location=useLocation()
    let isUserPanelPage=location.pathname==="/userpanel/comments"
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
                    <p className={`text-gray-500 dark:text-gray-200 mb-2 line-clamp-2 ${isUserPanelPage&&"dark:text-gray-400"}`}>{content}</p>
                </div>
                <div className='mt-2 lg:mt-0 flex flex-col justify-between gap-y-2 lg:flex-row lg:items-center'>
                    <div className='flex items-center gap-x-4 text-gray-400 text-sm'>
                        <span>{date}</span>
                        <span>{username}</span>
                    </div>
                    {isUserPanelPage&&
                    <div className='flex items-center gap-x-2 mt-2'>
                    <p className='text-gray-400 text-sm'>{productName}</p>
                    
                </div>}
                </div>
            </li>
        </>
    )
}
