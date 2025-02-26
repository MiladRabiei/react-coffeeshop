import React from 'react';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';
import { useRef,useState,useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import CircleSpinner from '../../Components/CircleSpinner/CircleSpinner';
import Article from '../../Components/Article/Article';
import Product from '../../Components/Product/Product';
import { Link } from 'react-router-dom';

export default function Blog() {
    let [mainData,isLoading ] = useFetch("/articles")
    let [displayArticles, setDisplayArticles] = useState([])
    let [displayFilteredArticles, setDisplayFilteredArticles] = useState([])
    let [displayFilteredArticlesPagination,setDisplayFilteredArticlesPanigation]=useState()
    let [active,setActive]=useState(null)
    let [itemPerPage,setItemPerPage] = useState(4)
    let [pageCount, setPageCount] = useState(1)
    let [currentPage,setCurrentPage]=useState()

    const [filters, setFilters] = useState({
    sortBy:""
  });
    useEffect(() => {
        let sortedProducts=[...mainData]
        if(filters.sortBy==="جدید ترین"){
          sortedProducts=sortedProducts.reverse()
        }else if(filters.sortBy==="قدیمی ترین"){
          sortedProducts
        }

       setDisplayFilteredArticles(sortedProducts);
        
    }, [filters, mainData]);

      // category filter

  let handleCategoryFilter=(filterName)=>{
    setFilters(prevFilters=>({...prevFilters,sortBy:filterName}))
    setActive(filterName)
  }
  useEffect(()=>{
    setCurrentPage(1)
  },[])

  useEffect(() => {
    setPageCount(Math.ceil(mainData.length / itemPerPage))
  }, [mainData, itemPerPage])

  useEffect(()=>{
    let start=currentPage*itemPerPage-itemPerPage
    let end=start+itemPerPage
    setDisplayArticles(mainData.slice(start,end))
  },[currentPage,itemPerPage,mainData]) 

  useEffect(()=>{
    let start=currentPage*itemPerPage-itemPerPage
    let end=start+itemPerPage
    setDisplayFilteredArticlesPanigation(displayFilteredArticles.slice(start,end))
  },[displayFilteredArticles,itemPerPage,currentPage])

  let handleCurrentPage=(pageNum)=>{
    setCurrentPage(pageNum)
  }

  let pagination=()=>{
    const btns=[]
    for(let i=1;i<=pageCount;i++){
      btns.push(<Link to={`/blog/${i}`} onClick={()=>handleCurrentPage(i)} className={`flex-center border dark:text-white  dark:border-gray-100 child:text-center w-10 h-10 rounded-md ${currentPage===i?"bg-orange-300 text-white border-orange-400":"bg-none text-zinc-700 border-zinc-700"}`}>
        <span>{i}</span>
        </Link>)
    }
    return btns
  }
  return (
    <section className="store mt-8 md:mt-40">
    <div className="container">
      <div className="breadCrumb flex gap-x-2 text-gray-400 text-sm md:text-base">
        <BreadCrumb
          links={
            [
              { id: 1, to: "/Home", title: "صفحه اصلی" },
              { id: 2, to: "/blog", title: "بلاگ" },
            
            ]
          }
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4   my-8 text-zinc-700 dark:text-white">
        
        {/* content-section */}
        <div className='left w-full'>
          {/* category */}
          <div className='flex flex-wrap items-center bg-white dark:bg-zinc-700 sm:h-16 gap-x-2 lg:gap-x-8 p-2 sm:px-4  rounded-lg'>
            <span className=' flex items-center font-DanaDemiBold gap-x-2'>
              <svg className='w-5 h-5'>
                <use href='#category'></use>
              </svg>
              مرتب سازی بر اساس :
            </span>
            <div className='flex items-center gap-x-3 lg:gap-x-5 child:text-sm child:lg:text-base cursor-pointer'>
              <span className={`${active==="جدید ترین"?"text-orange-300":""}`} onClick={()=>{handleCategoryFilter("جدید ترین")}}>جدید ترین</span>
              <span className={`${active==="قدیمی ترین"?"text-orange-300":""}`} onClick={()=>{handleCategoryFilter("قدیمی ترین")}}>قدیمی ترین</span>              
            </div>
          </div>
          {isLoading?(
            <div className="flex-center mt-20">
              <CircleSpinner/>
            </div>
          ):(
          <>
          {/* products */}
          <div className='mt-4  grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5  '>
          {(filters.sortBy
            ? displayFilteredArticlesPagination : displayArticles).map(item => (
              <Article
              key={item?.id}
              id={item?.id}
              title={item?.title}
              src={item?.src}
              date={item.date}
              />

            ))}
            
        </div>
        <div className={` my-8 gap-x-2 flex-center`}>
              {pagination()}
            </div>
          </>
          )}
          

        </div>
      </div>
      </div>
      </section>
  )
}
