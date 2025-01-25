import React from 'react'
import { Link } from 'react-router-dom'
export default function ProductsCategory({src,title}) {
    return (
        <div className='w-[100px] md:w-[200px] text-center'>
            <Link href="#">
                <img src={src} alt="" />
            </Link>
            <span className='font-DanaDemiBold text-sm md:text-xl mt-1.5 md:mt-2.5 text-zinc-700 dark:text-white'>{title}</span>
        </div>
    )
}
