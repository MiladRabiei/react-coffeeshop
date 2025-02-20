import React from 'react'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import { useParams } from 'react-router-dom'

export default function Mainarticle() {
    let params=useParams()
  return (
    <section className="product my-8 md:mt-40">
        <div className="container">
            <BreadCrumb
            links={
                [
                  { id: 1, to: "/Home", title: "صفحه اصلی" },
                  { id: 2, to: "/articles", title: "بلاگ " },
                  { id: 3, to: `/article-info/${params.articleID}`, title: "مقاله" },
                ]
              }
            />
            <div className="w-full flex flex-col lg:flex-row gap-4 gap-y-8   my-8 text-zinc-700 dark:text-white child:p-4 child:shadow-normal child:rounded-lg child:bg-white child:dark:bg-zinc-700">
              {/*article-detail */}
              <div className='lg:w-3/4 flex flex-col  gap-y-8 '>

                <div className='flex flex-col  gap-5 p-2'>
                {/* title */}
                <h1 className='w-full font-MorabbaMedium text-3xl border-b border-gray-300 dark:border-gray-200 pb-5 '>طرز تهیه قهوه دالگونا</h1>
                {/* info */}
                <div className="flex items-center child:flex gap-x-3 child:gap-x-1 my-4">
                    <span>
                        <svg className='w-5 h-5'>
                            <use href="#person"></use>
                        </svg>
                        تیم کافی کلاب
                    </span>
                    <span>
                        <svg className='w-5 h-5'>
                            <use href='#calender'></use>
                        </svg>
                    2 اسفند 1403
                    </span>
                </div>
                {/* cover */}
                <img className='w-full h-full  rounded-lg' src={import.meta.env.BASE_URL + "/images/blogs/blog-4.png"} alt="" />
                {/* summary */}
                <p className='text-justify'>
                به صورت کلاسیک دالگونا یا قهوه فرم گرفته را با قهوه فوری درست می‌کنند. اما دنیای نوشیدنی قهوه، دنیای خلاقیت‌ها و ترکیب طعم‌ها است. بنابراین، در این مطلب به شما یاد می‌دهیم که چطور این نوشیدنی را با انواع قهوه‌های ترک، اسپرسو، کلدبرو، موکا و ماچا تهیه کنیم. علاوه‌ بر اینکه با چند روش تهیه قهوه دالگونا آشنا می‌شوید، با بعضی انواع کمتر شناخته‌شده آن هم آشنا می‌شوید:
                </p>
                <div className="article">

                </div>
                </div>

                
                
              </div>
              {/* article-link */}
            
                <div  className='w-full lg:w-1/4  h-fit flex flex-col gap-y-6'>
            
                </div>
            </div>
        </div>
    </section>
  )
}
