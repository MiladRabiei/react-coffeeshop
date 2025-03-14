import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Product from '../../Components/Product/Product';
import useFetch from '../../hooks/useFetch'
import CircleSpinner from '../../Components/CircleSpinner/CircleSpinner'
import Button from '../../Components/form/Button';
import FilterSection from '../../Components/FilterSection/FilterSection';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';
export default function Store() {
  let [mainData,isLoading ] = useFetch("/products")
  const filterRef = useRef(null);
  const sectionToggleRef = useRef(null)
  const brandToggleRef = useRef(null)
  const coffeinToggleRef = useRef(null)

  let [displayProduct, setDisplayProducts] = useState([])
  let [displayFilteredProducts, setDisplayFilteredProducts] = useState([])
  let [loading, setLoading] = useState(false)
  let [counter, setCounter] = useState(1)
  let productPerLoad = 8
console.log(isLoading);
  // load filtered products
  let[isChecked,setIsChecked]=useState(false)
  let[active,setActive]=useState(null)
  const handleToggleCheckbox=()=>{
    setIsChecked(!isChecked)
  }
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    caffeineLevel: [],
    sortBy:""
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[filterType];
      const isSelected = currentFilters.includes(value);

      return {
        ...prevFilters,
        [filterType]: isSelected
          ? currentFilters.filter((item) => item !== value)
          : [...currentFilters, value],
      };
    });
  };
  useEffect(() => {
    
      const newFilteredProducts = mainData?.filter((product) => {
        const matchesCategory =
          filters.category.length === 0 || filters.category.includes(product.category);
        const matchesBrand =
          filters.brand.length === 0 || filters.brand.includes(product.brand);
        const matchesCaffeineLevel =
          filters.caffeineLevel.length === 0 ||
          filters.caffeineLevel.includes(product.caffeineLevel);
          const matchesAvailability = !isChecked || product.count > 0;
        return matchesCategory && matchesBrand && matchesCaffeineLevel&&matchesAvailability;
      });
        let sortedProducts
        filters.sortBy.length>0?(
        sortedProducts=newFilteredProducts?.length>0?[...newFilteredProducts]:[...mainData]

        ):(
          sortedProducts=[...newFilteredProducts]
        )
      if(filters.sortBy==="محبوب ترین"){
        sortedProducts=sortedProducts.sort((a,b)=>b.reviews-a.reviews||a.id-b.id)
      }else if(filters.sortBy==="پرفروش ترین"){
        sortedProducts=sortedProducts.sort((a,b)=>b.sales-a.sales)
      }else if(filters.sortBy==="ارزان ترین"){
        sortedProducts=sortedProducts.sort((a,b)=>a.price-b.price)
      }else if(filters.sortBy==="گران ترین"){
        sortedProducts=sortedProducts.sort((a,b)=>b.price-a.price)
      }
  
      
     setDisplayFilteredProducts(sortedProducts);
      
  }, [filters, mainData,isChecked]);

  let clearFilters = () => {
    setFilters({ category: [], brand: [], caffeineLevel: [] ,sortBy:""})
    setIsChecked(false)
    setActive("")
  }
  // category filter
  let handleCategoryFilter=(filterName)=>{
    setFilters(prevFilters=>({...prevFilters,sortBy:filterName}))
    setActive(filterName)
  }

  


// load products with more click
useEffect(() => {

    let firstProduct = [...mainData.slice(0, 8)]
  setDisplayProducts([...firstProduct])

}, [mainData])

useEffect(() => {
  if (counter > 1) {
    let start = counter * productPerLoad - productPerLoad
    let end = start + productPerLoad
    if (start < mainData.length) {
      let newProducts = mainData.slice(start, end)
      setDisplayProducts([...displayProduct, ...newProducts])
    }

  }

}, [counter])

useEffect(() => {
  let fetchTimer;
  if (loading) {
    fetchTimer = setTimeout(() => {
      setLoading(false)
      setCounter(prev => prev + 1)

    }, 1000)
  }
  return () => clearTimeout(fetchTimer)
}, [loading])

let loadMoreComponent = () => {
  setLoading(true)
}

useEffect(() => {
  const handleScroll = () => {
    const filterElement = filterRef.current
    // if (filterElement) {
    //   if (window.scrollY > 100 && window.scrollY <= 580) {
    //     filterElement.classList.add("lg:fixed" )
    //     document.querySelector(".left").classList.add("lg:mr-[331px]")
    //   } else {
    //     filterElement.classList.remove("lg:fixed");
    //     document.querySelector(".left").classList.remove("lg:mr-[331px]")
    //   }
    //   if(window.scrollY>580){
    //     filterElement.classList.add("mt-[482px]" )
    //   }else{
    //     filterElement.classList.remove("mt-[482px]" )
    //   }
    // }
  };

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Cleanup event listener on component unmount
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
let toggleFilterMenu = (elem) => {
  elem.classList.toggle("hidden")
}

if(isLoading){
  return <p>...loading</p>
}
console.log(displayFilteredProducts);
return (
  <>
    <main>
      <section className="store mt-8 md:mt-40">
        <div className="container">
          <div className="breadCrumb flex gap-x-2 text-gray-400 text-sm md:text-base">
            <BreadCrumb
              links={
                [
                  { id: 1, to: "/Home", title: "صفحه اصلی" },
                  { id: 2, to: "/Store", title: "فروشگاه " },
                
                ]
              }
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-4   my-8 text-zinc-700 dark:text-white">
            {/* filter section */}
            <div id='filter' ref={filterRef} className='lg:sticky lg:top-[140px] lg:w-1/4 h-fit flex flex-col gap-y-4 p-4 bg-white dark:bg-zinc-700 rounded-lg shadow-normal'>
              {/* filter header*/}
              <div className=' flex justify-between pt-1'>
                <span className='flex items-center font-DanaMedium gap-x-1'>
                  <svg className='w-5 h-5 md:w-5 md:h-5'>
                    <use href='#filter'></use>
                  </svg>
                  فیلترها
                </span>

                <button className='text-orange-300' onClick={clearFilters}>
                  حذف همه
                </button>
              </div>
              {/*filter body  */}
              <div className='w-full mt-3 dark:bg-zinc-600 rounded-lg shadow-normal'>
                <div className='flex justify-between p-3 cursor-pointer' onClick={() => toggleFilterMenu(sectionToggleRef.current)}>
                  <p>دسته بندی</p>
                  <svg className='w-5 h-5 md:w-6 md:h-6'>
                    <use href='#arrow-mini-left'></use>
                  </svg>
                </div>
                <ul ref={sectionToggleRef} className='hidden mx-2 py-2 child:flex child:items-center child:gap-x-2 child:px-2  child:py-1 child:dark:text-gray-200 child:text-gray-600'>

                  <FilterSection
                    title="Category"
                    options={["کپسول قهوه", "دانه قهوه", "قهوه ساز"]}
                    filterType="category"
                    filters={filters.category}
                    onChange={handleFilterChange}

                  />

                </ul>
              </div>
              <div className='w-full dark:bg-zinc-600 rounded-lg shadow-normal' onClick={() => toggleFilterMenu(brandToggleRef.current)}>
                <div className='flex justify-between p-3 cursor-pointer'>
                  <p>برند</p>
                  <svg className='w-5 h-5 md:w-6 md:h-6'>
                    <use href='#arrow-mini-left'></use>
                  </svg>
                </div>
                <ul ref={brandToggleRef} className='hidden mx-2 py-2 child:flex child:items-center child:gap-x-2 child:px-2  child:py-1 child:dark:text-gray-200 child:text-gray-600'>
                  <FilterSection
                    title="brand"
                    options={["بن مانو", "اسپرسو"]}
                    filterType="brand"
                    filters={filters.brand}
                    onChange={handleFilterChange}

                  />

                </ul>
              </div>
              <div className='w-full dark:bg-zinc-600 rounded-lg shadow-normal' onClick={() => toggleFilterMenu(coffeinToggleRef.current)}>
                <div className='flex justify-between p-3 cursor-pointer'>
                  <p>میزان کافئین</p>
                  <svg className='w-5 h-5 md:w-6 md:h-6'>
                    <use href='#arrow-mini-left'></use>
                  </svg>
                </div>
                <ul ref={coffeinToggleRef} className='hidden mx-2 py-2 child:flex child:items-center child:gap-x-2 child:px-2  child:py-1 child:dark:text-gray-200 child:text-gray-600'>
                  <FilterSection
                    title="caffeineLevel"
                    options={["بالا", "متوسط", "کم"]}
                    filterType="caffeineLevel"
                    filters={filters.caffeineLevel}
                    onChange={handleFilterChange}

                  />


                </ul>
              </div>
              <div className="flex my-2 pr-3 w-full flex-col h-auto gap-y-5 child:flex child:items-center child:justify-between child:font-DanaMedium">
                <div className="">
                  <p>فقط کالا های موجود</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                     type="checkbox" 
                     value="" 
                     className="sr-only peer w-5 h-5 "
                       checked={isChecked}
                       onChange={handleToggleCheckbox}
                       />
                    <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39]   peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-6 after:w-6  after:left-0   peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-orange-200">

                    </div>
                  </label>

                </div>
                <div className="">
                  <p>فقط محصولات ویژه</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer w-5 h-5 " />
                    <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39]   peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-6 after:w-6  after:left-0   peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-orange-200">

                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* content-section */}
            <div className='left lg:w-3/4'>
              {/* category */}
              <div className='flex flex-wrap items-center bg-white dark:bg-zinc-700 sm:h-16 gap-x-2 lg:gap-x-8 p-2 sm:px-4  rounded-lg'>
                <span className=' flex items-center font-DanaDemiBold gap-x-2'>
                  <svg className='w-5 h-5'>
                    <use href='#category'></use>
                  </svg>
                  مرتب سازی بر اساس :
                </span>
                <div className='flex items-center gap-x-3 lg:gap-x-5 child:text-sm child:lg:text-base cursor-pointer'>
                  <span className={`${active==="محبوب ترین"?"text-orange-300":""}`} onClick={()=>{handleCategoryFilter("محبوب ترین")}}>محبوب ترین</span>
                  <span className={`${active==="پرفروش ترین"?"text-orange-300":""}`} onClick={()=>{handleCategoryFilter("پرفروش ترین")}}>پرفروش ترین</span>
                  <span className={`${active==="ارزان ترین"?"text-orange-300":""}`} onClick={()=>{handleCategoryFilter("ارزان ترین")}}>ارزان ترین</span>
                  <span className={`${active==="گران ترین"?"text-orange-300":""}`} onClick={()=>{handleCategoryFilter("گران ترین")}}>گران ترین</span>
                  
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
              {(filters.category.length > 0 || filters.brand.length > 0 ||
               filters.caffeineLevel.length>0||isChecked||filters.sortBy
                ? displayFilteredProducts : displayProduct).map(item => (

                  <Product
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    off={item.off}
                    src={item.src}
                    count={item.count}
                    price={item.price}
                  />

                ))}
            </div>
              </>
              )}
              

            </div>
          </div>
          {
            filters.category.length === 0 &&
            filters.brand.length === 0 &&
            filters.caffeineLevel.length === 0 &&
            !isChecked &&!filters.sortBy&&
            (
              loading ? (
                <CircleSpinner />
              ) : (
                <>
                  <div className="flex-center mb-8">
                    <Button
                      type={"submit"}
                      onClick={loadMoreComponent}
                      className={`${displayProduct?.length < mainData?.length ? "flex-center" : "hidden"
                        }  gap-x-1 my-4 text-orange-300 font-DanaMedium`}
                    >
                      مشاهده بیشتر ...
                    </Button>
                  </div>
                </>
              )
            )
          }

        </div>
      </section>
    </main>

  </>
)
}
