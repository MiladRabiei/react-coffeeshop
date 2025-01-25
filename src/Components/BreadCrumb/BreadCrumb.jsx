import React from 'react'
import { Link } from 'react-router-dom'
export default function BreadCrumb({links}) {
  return (
    <>
    <div className="breadCrumb flex gap-x-2 text-gray-400 text-sm md:text-base">
              {links.map((link,index)=>(
                <Link to={link.to} key={link.id} className='inline-flex items-center gap-x-2'>
                 {link.title}
                 {links.length!=link.id?(
                    <svg className='w-5 h-5 md:w-6 md:h-6'>
                    <use href='#arrow-mini-left'></use>
                  </svg>
                 ):(null)}
                
              </Link>
              ))}
              
            </div>
    </>
  )
}
