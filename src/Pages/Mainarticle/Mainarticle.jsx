import React, { useState } from 'react'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import  {useParams}  from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from 'dompurify';
import useFetch from '../../hooks/useFetch';
export default function Mainarticle() {
  let [mainData,isLoading]=useFetch("/articles")
  let[showLink,setShowLink]=useState(false)
  let params = useParams()
  if(isLoading){
    return "loading..."
  }
  let mainArticle=mainData.find(item=>item.id===params.articleID)
  let addToClipboard=()=>{
    navigator.clipboard.writeText(window.location.href)
    toast.success("با موفقیت کپی شد",{
    })
  }
  return (
    <section className="product my-8 md:mt-40">
      <div className="container">
        <BreadCrumb
          links={
            [
              { id: 1, to: "/Home", title: "صفحه اصلی" },
              { id: 2, to: "/blog", title: "بلاگ " },
              { id: 3, to: `/article-info/${params.articleID}`, title: "مقاله" },
            ]
          }
        />
        <div className="w-full  flex flex-col lg:flex-row gap-4 gap-y-8   my-8 text-zinc-700 dark:text-white child:p-4 child:shadow-normal child:rounded-lg child:bg-white child:dark:bg-zinc-700">
          {/*article-detail */}
          <div className='lg:w-3/4 flex flex-col  gap-y-8 '>

            <div className='flex flex-col  gap-5 p-2'>
              {/* title */}
              <h1 className='w-full font-MorabbaMedium text-3xl border-b border-gray-300 dark:border-gray-200 pb-5 '>{mainArticle.title}</h1>
              {/* info */}
              <div className="flex items-center child:flex child:items-center gap-x-3 child:gap-x-1 my-4">
                <span>
                  <svg className='w-5 h-5'>
                    <use href="#person"></use>
                  </svg>
                  {mainArticle.author}
                </span>
                <span >
                  <svg className='w-5 h-5'>
                    <use href='#calender'></use>
                  </svg>
                  {mainArticle.date} 
                </span>
              </div>
              {/* cover */}
              <img className='w-full h-full  rounded-lg' src={import.meta.env.BASE_URL + mainArticle.src} alt="" />
              {/* summary */}
              <p className='text-justify'>
                {mainArticle.description}
              </p>
              <div className="article" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(mainArticle.body)}}>

              </div>
            </div>



          </div>
          {/* article-link */}

          <div className={`w-full lg:w-1/4   gap-y-6 overflow-hidden ${showLink?"h-fit":"h-[80px]"} transition-all`}>
                  <div onClick={()=>setShowLink(prev=>!prev)} className='flex items-center w-full border-b border-gray-300 dark:border-gray-200 pb-6 pt-3 cursor-pointer'>
                  <span className='flex items-center gap-x-2 flex-grow text-xl'>
                    <svg className='w-5 h-5'>
                      <use href="#share"></use>
                    </svg>
                    اشتراک گذاری مطلب
                  </span>
                  <span className={`flex items-center transition-all ${showLink?"rotate-180":"rotate-360"}`}>
                    <svg className="w-6 h-6">
                      <use href='#arrow-mini'></use>
                    </svg>
                  </span>
                  
                  </div>
                
                  <div className='py-3'>
                  <ToastContainer
                   position="top-right" 
                   autoClose={2000} 
                   closeOnClick={true} 
                   closeButton={false}
                    className={"font-MorabbaMedium text-lg"}
                    />
                  <button onClick={addToClipboard} className=' w-full border-2 border-dashed border-orange-300 bg-orange-300/30 p-3 rounded-lg'>
                    <span className='flex  justify-between gap-x-2 '>
                      <svg className="w-5 h-5 flex-shrink-0">
                        <use href='#clipboard'></use>
                      </svg>
                      <span className='line-clamp-1'>{window.location.href}</span>
                    </span>
                  </button>
                  </div>
                
          </div>
        </div>
      </div>
    </section>
  )
}
