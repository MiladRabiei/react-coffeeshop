import React from 'react'
import { Link } from 'react-router-dom'
export default function SectionHeader({title,subTitle,btn}) {
  return (
    <>
    <div className='flex items-center justify-between mb-5 md:mb-12'>
              <div>
                <h3 className='section-title'>{title}</h3>
                {subTitle&&<span className='section-subtitle'>{subTitle}</span>}
                
              </div>
              {btn&&btn}
              
            </div>
            </>
  )
}
