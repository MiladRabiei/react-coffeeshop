import React, { useRef, useEffect,useState, useMemo } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import ProductsCategory from '../../Components/ProductsCategory/ProductsCategory';
import Product from '../../Components/Product/Product';
import moment from 'jalali-moment';
import useFetch from '../../hooks/useFetch';
import CircleSpinner from '../../Components/CircleSpinner/CircleSpinner';
import Typewriter from 'typewriter-effect'
import Article from '../../Components/Article/Article';

export default function Home() {
  let [mainData, loading] = useFetch("/products")
  let [articlesData,isLoading]=useFetch("/articles")
  let [productLength,setProductLength]=useState()
  let [articlesLength,setArticleLength]=useState()
  let [swiperProducrs,setSwiperProducts]=useState()
  let [products, setProducts] = useState([])
  let [randomNumbers, setRandomNumbers] = useState([])
  let [aticleRandomNum,setArticleRandomNum]=useState()
  let [articles,setArticles]=useState()
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const swiperRef = useRef(null);
  const persianDate = moment().locale("fa").format('jMMMM jD jYYYY');
  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      if (nextButtonRef.current && prevButtonRef.current) {
        swiper.params.navigation.nextEl = nextButtonRef.current;
        swiper.params.navigation.prevEl = prevButtonRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, []);


  useEffect(() => {
    setProductLength(mainData?.length);
    setArticleLength(articlesData?.length);
    setSwiperProducts(mainData.slice(0,8))
  }, [mainData, articlesData]);

  useEffect(() => {
    if(!productLength) return
    let numArray= new Set()
    while ( numArray.size < 8) {
      numArray.add(Math.floor(Math.random() * (productLength)))
    }

    setRandomNumbers([...numArray])
    
  }, [productLength]);

  useEffect(() => {
    if(!articlesLength) return
    let articleIndex = new Set()
    while (articleIndex.size < 4) {
      articleIndex.add(Math.floor(Math.random() * (articlesLength)))
    }
    setArticleRandomNum([...articleIndex])
  }, [articlesLength]);

  useEffect(() => {
    if(loading)return;
    let productArray = randomNumbers?.map(num =>mainData[num])
    setProducts(productArray)
  }, [mainData, randomNumbers,loading])
  useEffect(() => {
    if(isLoading)return;
    let articleArray = aticleRandomNum?.map(num =>articlesData[num])
    console.log(articleArray);
    setArticles(articleArray)
  }, [articlesData, aticleRandomNum,isLoading])


  return (
    <>
      <main >
        {/* head */}
        <section className=" Home bg-Mobile h-[200px] xs:h-auto xs:aspect-[2/1] md:aspect-auto bg-no-repeat bg-cover bg-[center_top]  md:bg-Desktop " >
          <div className="container relative overflow-y-hidden h-full md:min-h-screen flex justify-end items-center">

            <div className='text-white'>
              <h2 className='font-MorabbaBold text-2xl md:text-6xl/[62px] mb-0.5 md:mb-2'>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString('قهوه عربیکا تانزانیا')
                      .start()
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString('قهوه کلمبیا کاتورا')
                      .start()
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString('قهوه برزیل بوربون')
                      .start()
                      .pauseFor(2500)
                      .deleteAll()
                      
                  }}
                  options={{
                    loop:true,
                  }}
                />
              </h2>
              <span className='font-MorabbaLight text-xl md:text-5xl/[64px]'>
              <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString("یک فنجان بالانس!")
                      .start()
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString('یک فنجان انرژی!')
                      .start()
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString('یک فنجان آرامش!')
                      .start()
                      .pauseFor(2500)
                      .deleteAll()
                      
                  }}
                  options={{
                    loop:true,
                  }}
                />
              </span>
              <span className='block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-8'></span>
              <p className='text-xs max-w-[201px] md:max-w-[460px] md:text-2xl'>قطعا نام آشنای عربیکارا شنیده اید.عربیکا یکی از گونه های قهوه است که در نواحی مختلف کمربند قهوه کشن میشود.</p>
            </div>
            {/* circle */}
            <div className='circle circle--main circle--lg'>
              <div className='circle circle--md'>
                <div className='circle circle--sm'></div>
              </div>
            </div>
          </div>
          {/* curve */}
          <svg className='hidden md:block md:absolute bottom-0 right-0 left-0 mx-auto text-gray-100 dark:text-zinc-800 w-[100px] h-[22px]'>
            <use href='#curve'></use>
          </svg>

          {/* Arrow circle */}
          <div className='absolute bottom-0 right-0 left-0 mx-auto translate-y-2/4 hidden md:flex justify-center items-center w-[30px] h-[30px] border-2 rounded-full border-orange-300'>
            <svg className='w-5 h-5 text-zinc-700 dark:text-white'>
              <use href='#arrow-mini'></use>
            </svg>
          </div>
        </section>
        {/* products */}
        <section className='lg:bg-Products-white lg:dark:bg-Products-dark bg-[length:100%] bg-no-repeat pt-8 md:pt-10 lg:pt-48 pb-20 '>
          {/* bg-[length:100%]=bg-cover */}
          <div className="container ">
            {/* section head */}
            <SectionHeader
              title="جدید ترین محصولات"
              subTitle="فراوری شده از دانه قهوه"
              btn={
                <Link to={"/store"} className="section-link ">
                  <span className='hidden md:inline-block'>مشاهده همه محصولات</span>
                  <span className='inlin-block md:hidden'>مشاهده همه </span>
                  <svg className='w-5 h-5'>
                    <use href='#arrow-mini-left'></use>
                  </svg>
                </Link>
              }
            />
            {/* section body */}
            <div className={`${loading && "flex-center mt-20"} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 `}>
              {loading ? (
                <div >
                  <CircleSpinner />
                </div>
              ) : (
                products.map(item => (
                  <div key={item.id}>
                    <Product
                      id={item.id}
                      name={item.name}
                      off={item.off}
                      src={item.src}
                      count={item.count}
                      price={item.price}
                    />
                  </div>
                ))
              )}




            </div>
          </div>
        </section>
        {/* category */}
        <section className="category-banner mt-8 mb-10 md:my-20">
          <div className="container">
            <div className='grid grid-cols-1 md:grid-cols-2 text-white gap-5'>
              <div className='flex flex-col justify-center bg-category-right bg-no-repeat bg-cover pr-7 md:pr-12 rounded-2xl h-[142px] md:h-[248px]'>
                <h5 className='font-DanaDemiBold text-2xl/6 md:text-4xl/6 mb-4 md:mb-7'>انواع قهوه</h5>
                <span className='md:font-DanaMedium md:text-xl/6'>ترکیبی و تک خاستگاه</span>
              </div>
              <div className='flex flex-col justify-center bg-category-left bg-no-repeat bg-cover pr-7 md:pr-12  rounded-2xl h-[142px] md:h-[248px]'>
                <h5 className='font-DanaDemiBold text-2xl/6 md:text-4xl/6 mb-4 md:mb-7'>پودر های فوری</h5>
                <span className='md:font-DanaMedium md:text-xl/6'>نسکافه ، هات چاکلت ، ماسالا</span>
              </div>
            </div>
          </div>
        </section>
        {/* products-category */}
        <section className="products-category mb-10 md:mb-20 ">
          <div className="container">
            <div className="flex-center gap-y-6 gap-x-[29px] md:gap-[65px] flex-wrap">
              <ProductsCategory
                title="قهوه دمی و اسپرسو"
                src={import.meta.env.BASE_URL + "/images/categories/category1.png"}
              />
              <ProductsCategory
                title="قهوه دمی و اسپرسو"
                src={import.meta.env.BASE_URL + "/images/categories/category2.png"}
              />
              <ProductsCategory
                title="قهوه دمی و اسپرسو"
                src={import.meta.env.BASE_URL + "/images/categories/category3.png"}
              />
              <ProductsCategory
                title="قهوه دمی و اسپرسو"
                src={import.meta.env.BASE_URL + "/images/categories/category4.png"}
              />
              <ProductsCategory
                title="قهوه دمی و اسپرسو"
                src={import.meta.env.BASE_URL + "/images/categories/category5.png"}
              />
            </div>
          </div>
        </section>
        {/* best-selling-products */}
        <section className="best-selling mb-8 md:mb-20">
          <div className="container">
            {/* section-head */}
            <SectionHeader
              title="محصولات پر فروش"
              subTitle="پیشنهاد قهوه خور ها ..."
              btn={
                <div className='flex gap-x-3 md:gap-x-[18px]'>
                  <span ref={nextButtonRef} className=' flex-center w-9 h-9 md:w-10 md:h-10 hover:bg-gray-300 dark:hover:bg-white dark:hover:text-zinc-700 text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-full transition-all'>
                    <svg className='w-5 h-5 md:w-[26px] md:h-[26px]'>
                      <use href='#arrow-mini-right'></use>
                    </svg>
                  </span>
                  <span ref={prevButtonRef} className=' flex-center w-9 h-9 md:w-10 md:h-10 hover:bg-gray-300 dark:hover:bg-white dark:hover:text-zinc-700 text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-full transition-all'>
                    <svg className='w-5 h-5 md:w-[26px] md:h-[26px]'>
                      <use href='#arrow-mini-left'></use>
                    </svg>
                  </span>
                </div>
              }
            />
            {/* slider section */}
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay]}
              spaceBetween={14}
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 14
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20
                },
              }}
              navigation={false}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}

              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
            >
              {swiperProducrs?.map(item=>(
                <SwiperSlide key={item.id}>
                <Product
                      id={item.id}
                      name={item.name}
                      off={item.off}
                      src={item.src}
                      count={item.count}
                      price={item.price}
                    />
              </SwiperSlide>
              ))}
              
              
            </Swiper>
          </div>
        </section>
        {/* coffee club */}
        <section className="coffee-club mb-8 md:mb-20">
          <div className="container">
            <div className='flex flex-wrap lg:flex-nowrap items-center lg:gap-x-4 xl:gap-x-24 gap-y-9 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white lg:h-36 py-8 lg:py-0 px-3 lg:px-5 xl:px-11 rounded-2xl'>
              <div className='flex items-center md:shrink-0 gap-x-3 lg:gap-x-4 md:gap-x-6'>
                <img src={import.meta.env.BASE_URL + "/images/club/diamond.png"} className='w-[87px] lg:w-[100px] xl:w-[110px]' alt="coffe club" />
                <div>
                  <h4 className='font-MorabbaBold text-2xl md:text-5xl mb-2'>کافی کلاب</h4>
                  <p className='font-MorabbaLight text-lg md:text-2xl'>میدونستی میتونی با امتیاز هات قهوه بگیری ؟</p>
                </div>
              </div>
              <div className='flex justify-between  items-center w-full'>
                <div className='flex gap-x-1 xs:gap-x-2 lg:gap-x-3 xl:gap-x-5'>
                  <div className='w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl'>
                    <svg className='w-10 h-10 md:w-12 md:h-12 mb-1 md:mb-1.5 mx-auto'>
                      <use href='#activity'></use>
                    </svg>
                    <span className='text-xs md:text-sm'>چرخ و بخت</span>
                  </div>
                  <div className='w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl'>
                    <svg className='w-10 h-10 md:w-12 md:h-12 mb-1 md:mb-1.5 mx-auto'>
                      <use href='#discovery'></use>
                    </svg>
                    <span className='text-xs md:text-sm'>ماموریت ها</span>
                  </div>
                  <div className='w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl'>
                    <svg className='w-10 h-10 md:w-12 md:h-12 mb-1 md:mb-1.5 mx-auto'>
                      <use href='#ticket-star'></use>
                    </svg>
                    <span className='text-xs md:text-sm'>جایزه ها</span>
                  </div>
                </div>
                <div className='flex flex-col px-2 xs:px-0'>
                  <span className='md:mb-1 font-DanaDemiBold text-2xl md:text-3xl'>542</span>
                  <span className=' text-xs md:text-sm'>امتیـــــــاز شما</span>
                  <NavLink className="flex justify-center items-center -mr-1.5 mt-1 md:mt-2  w-[90px] h-[26px] md:w-[110px] md:h-8 bg-gradient-to-r from-orange-200 to-orange-300 font-DanaMedium text-xs md:text-sm rounded-full">
                    دریافت جایزه
                    <svg className='w-5 h-5 md:w-6 md:h-6'>
                      <use href='#arrow-mini-left'></use>
                    </svg>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* blogs section */}
        <section className="blogs mb-8 md:mb-28">
          <div className="container">
            {/* section head */}
            <SectionHeader
              title="مطالب خواندنی"
              btn={
                <Link to={'/blog'} className="section-link ">
                  <span className='hidden md:inline-block'>مشاهده همه مطالب</span>
                  <span className='inlin-block md:hidden'>مشاهده همه </span>
                  <svg className='w-5 h-5'>
                    <use href='#arrow-mini-left'></use>
                  </svg>
                </Link>
              }
            />
            {/* section body */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
              {/* section-item */}
              {articles?.map(item=>(
                item.id&&(
                  <Article
                key={item?.id}
                id={item?.id}
                title={item?.title}
                src={item?.src}
                date={item.date}
                />
                )
              ))}
            </div>
          </div>
        </section>
        {/* contact section */}
        <section className="contact-us mb-16 md:mb-28">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center  lg:items-start gap-y-8 lg:gap-x-5">
              <img src={import.meta.env.BASE_URL + "/images/contact.png"} className="w-[296px] shrink-0" alt="contact" />
              <div className='text-zinc-700 dark:text-white'>
                <h3 className='font-MorabbaMedium text-2xl md:text-5xl mb-0.5 md:mb-1.5'>یکی از بهترین قهوه ها !</h3>
                <span className='font-MorabbaLight text-lg md:text-3xl/[48px]'>کیفیت قهوه را از ما بخواهید ...</span>
                <div className='flex gap-x-2.5 my-5 md:my-6'>
                  <span className='inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full'></span>
                  <span className='inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full'></span>
                  <span className='inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full'></span>
                </div>
                <p className='text-2xl'>
                  فضای گرم و دنج ما را احساس کنید، جایی که همه می توانند قهوه معطری پیدا کنند و دسرهای خوشمزه ما را که کاملاً با قهوه داغ همراه شده است، امتحان کنند. فضای داخلی شیک و کارکنان خوش برخورد ما روز شما را می سازد!

                </p>
                <NavLink className="inline-flex justify-center items-center h-[50px] md:h-[60px] mt-5 px-6 border md:border-2 border-orange-300 gap-x-2 md:text-xl tracking-tightest text-orange-300 rounded-full">
                  <svg className='w-5 h-5 md:w-8 md:h-8'>
                    <use href='#phone'></use>
                  </svg>
                  ثبت سفارش تلفنی
                </NavLink>
              </div>
            </div>
          </div>
        </section>
        {/* services section */}
        <section className="services mb-12 md:mb-36">
          <div className="container">
            <div className="flex items-center justify-between gap-y-11 flex-wrap child:w-1/2 lg:child:w-auto  text-zinc-700 dark:text-white">
              <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center sm:text-right">
                <svg className='dark:hidden' width="66" height="73" viewBox="0 0 66 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_862_573)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M55.2975 53.8429C57.7465 53.8429 60.0952 52.8716 61.8269 51.1427C63.5585 49.4139 64.5314 47.069 64.5314 44.6241C64.5314 42.1791 63.5585 39.8343 61.8269 38.1054C60.0952 36.3765 57.7465 35.4053 55.2975 35.4053V53.8429Z" fill="#FDBA74" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M56.7643 52.2348V37.0095C58.5368 37.3503 60.1351 38.2968 61.2845 39.6863C62.4339 41.0759 63.0626 42.8218 63.0626 44.624C63.0626 46.4261 62.4339 48.172 61.2845 49.5616C60.1351 50.9512 58.5368 51.8977 56.7643 52.2385V52.2348ZM57.5032 8.47917C54.8257 5.79116 51.6424 3.65805 48.1364 2.20247C44.6304 0.74689 40.8708 -0.00244141 37.0737 -0.00244141C33.2766 -0.00244141 29.517 0.74689 26.0109 2.20247C22.5049 3.65805 19.3217 5.79116 16.6442 8.47917C14.5925 10.523 12.8568 12.8603 11.4941 15.4142C10.6315 17.7652 13.414 18.3393 14.0891 16.7768C16.797 11.649 21.1468 7.57426 26.4449 5.20256C31.7429 2.83086 37.6839 2.29884 43.3201 3.69139C48.9564 5.08393 53.9631 8.3208 57.5418 12.8857C61.1204 17.4505 63.0647 23.0804 63.0646 28.8772V37.282C62.0669 36.2255 60.8634 35.3839 59.5281 34.8087C58.1927 34.2335 56.7537 33.9369 55.2993 33.9371C54.9098 33.9371 54.5363 34.0916 54.2609 34.3666C53.9855 34.6416 53.8307 35.0145 53.8307 35.4034V53.8428C53.8307 54.0353 53.8687 54.226 53.9425 54.4039C54.0163 54.5817 54.1245 54.7434 54.2609 54.8795C54.3972 55.0157 54.5591 55.1237 54.7373 55.1974C54.9155 55.2711 55.1065 55.309 55.2993 55.309C58.1082 55.3051 60.8031 54.2 62.8038 52.2318C64.8045 50.2635 65.951 47.5896 65.9963 44.7857C65.9963 44.7675 65.9963 39.4647 65.9963 28.8772C66.0019 25.0858 65.2542 21.331 63.7967 17.83C62.3392 14.3291 60.2007 11.1514 57.505 8.48099L57.5032 8.47917Z" fill="#3F3F46" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M63.3157 53.6885C62.9882 53.6884 62.6707 53.8017 62.4174 54.009C62.1641 54.2164 61.9907 54.5051 61.9267 54.8258C61.8627 55.1465 61.9121 55.4795 62.0664 55.768C62.2207 56.0564 62.4705 56.2825 62.7731 56.4078C63.0757 56.533 63.4124 56.5496 63.7259 56.4548C64.0394 56.3599 64.3102 56.1595 64.4923 55.8876C64.6743 55.6158 64.7563 55.2893 64.7243 54.9638C64.6923 54.6383 64.5482 54.334 64.3166 54.1027C64.0503 53.8389 63.6909 53.6902 63.3157 53.6885Z" fill="#3F3F46" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M42.1183 67.7146L44.202 67.2731L44.6442 69.3534L42.5605 69.7949L42.1183 67.7146ZM62.5205 58.3014C62.1826 58.109 61.782 58.0584 61.4067 58.1606C61.0314 58.2627 60.712 58.5094 60.5187 58.8464C59.1194 61.2737 57.2478 63.3968 55.0141 65.0908C52.7804 66.7848 50.2297 68.0155 47.5123 68.7102L46.7735 65.2382C46.7334 65.0498 46.6566 64.8711 46.5475 64.7124C46.4383 64.5537 46.2988 64.4179 46.1371 64.313C45.9754 64.208 45.7945 64.1359 45.6049 64.1008C45.4153 64.0656 45.2205 64.0681 45.0319 64.1081L40.0764 65.1601C39.6957 65.2411 39.3628 65.4699 39.1509 65.7959C38.939 66.1219 38.8654 66.5186 38.9463 66.8988L40 71.8461C40.04 72.0345 40.1168 72.2132 40.226 72.3719C40.3352 72.5307 40.4746 72.6664 40.6363 72.7713C40.7981 72.8763 40.9789 72.9484 41.1686 72.9835C41.3582 73.0187 41.5529 73.0162 41.7416 72.9762L46.697 71.9243C50.1009 71.2776 53.3249 69.9056 56.1493 67.9017C58.9736 65.8978 61.3317 63.3093 63.0628 60.3127C63.1604 60.1453 63.2237 59.9602 63.2493 59.7683C63.2748 59.5763 63.262 59.3812 63.2115 59.1942C63.1611 59.0072 63.0741 58.832 62.9555 58.6787C62.8369 58.5255 62.689 58.3973 62.5205 58.3014Z" fill="#3F3F46" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.98453 55.7978C3.66255 55.7978 2.39472 55.2735 1.45994 54.3402C0.525155 53.407 0 52.1412 0 50.8214V24.7293C0 24.0758 0.128929 23.4287 0.379425 22.8249C0.629921 22.2212 0.997079 21.6726 1.45994 21.2105C1.92279 20.7484 2.47228 20.3818 3.07703 20.1317C3.68179 19.8816 4.32995 19.7529 4.98453 19.7529H40.8881C41.5427 19.7529 42.1908 19.8816 42.7956 20.1317C43.4003 20.3818 43.9498 20.7484 44.4127 21.2105C44.8755 21.6726 45.2427 22.2212 45.4932 22.8249C45.7437 23.4287 45.8726 24.0758 45.8726 24.7293V57.5275C45.8749 58.1836 45.673 58.8243 45.2948 59.3609C44.9166 59.8975 44.3808 60.3036 43.7614 60.5231C43.142 60.7425 42.4696 60.7644 41.8372 60.5858C41.2048 60.4072 40.6436 60.0369 40.2311 59.526L37.2029 55.8014L4.98453 55.7978ZM4.98453 22.4655C4.68654 22.465 4.39138 22.5233 4.11595 22.6368C3.84052 22.7504 3.59024 22.9171 3.37945 23.1274C3.16865 23.3377 3.00147 23.5874 2.88749 23.8623C2.7735 24.1372 2.71496 24.4318 2.7152 24.7293V50.8232C2.7152 51.4231 2.9539 51.9985 3.3788 52.4227C3.8037 52.8469 4.37999 53.0852 4.98089 53.0852H38.5041L42.3476 57.8091C42.4067 57.8814 42.4867 57.9338 42.5767 57.9589C42.6668 57.9841 42.7624 57.9808 42.8505 57.9495C42.9386 57.9183 43.0149 57.8606 43.0688 57.7844C43.1228 57.7082 43.1518 57.6172 43.152 57.5238V24.7293C43.152 24.1294 42.9133 23.5541 42.4884 23.1299C42.0635 22.7057 41.4872 22.4673 40.8863 22.4673L4.98453 22.4655Z" fill="#0D9488" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31.2867 36.3644H40.4259V38.7373L35.6342 50.5651H32.6806L37.3321 39.0425H31.2867V36.3644ZM27.6852 36.1119V38.7082H26.1693V41.1228H23.3558V38.7082H16.6643V36.1101L21.5378 26.6369H24.5296L19.6761 36.1101H23.3558V32.7434H26.1656V36.1119H27.6852ZM5.69066 41.121V39.0316L10.5223 34.0407C11.3909 33.3231 11.9664 32.313 12.1402 31.2009C12.1552 30.9554 12.118 30.7094 12.031 30.4793C11.9439 30.2491 11.8091 30.04 11.6353 29.8656C11.4615 29.6912 11.2527 29.5556 11.0226 29.4675C10.7925 29.3795 10.5463 29.3412 10.3003 29.355C9.78397 29.3623 9.28187 29.5251 8.85975 29.822C8.43763 30.119 8.11514 30.5362 7.93451 31.0192L5.58875 29.6402C5.98057 28.7331 6.63421 27.9632 7.46625 27.4286C8.2983 26.894 9.27101 26.619 10.2603 26.6387C10.8652 26.6062 11.4703 26.6978 12.0384 26.9079C12.6064 27.118 13.1253 27.4422 13.5629 27.8604C14.0006 28.2785 14.3477 28.7819 14.5828 29.3392C14.8179 29.8966 14.9361 30.4962 14.93 31.101C14.8624 31.974 14.6221 32.825 14.2229 33.6047C13.8236 34.3843 13.2735 35.0772 12.6042 35.6431L9.83442 38.4266H15.152V41.1246L5.69066 41.121Z" fill="#3F3F46" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M34.3803 27.1387L21.7579 50.5654H22.9809L35.5978 27.1405L34.3803 27.1387Z" fill="#EDB56A" />
                  </g>
                  <defs>
                    <clipPath id="clip0_862_573">
                      <rect width="66" height="73" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg className=' hidden dark:inline-block' width="66" height="73" viewBox="0 0 66 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_845)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M55.2976 53.8429C57.7466 53.8429 60.0952 52.8716 61.8269 51.1427C63.5586 49.4139 64.5315 47.069 64.5315 44.6241C64.5315 42.1791 63.5586 39.8343 61.8269 38.1054C60.0952 36.3765 57.7466 35.4053 55.2976 35.4053V53.8429Z" fill="#FDBA74" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M56.7644 52.235V37.0096C58.5369 37.3504 60.1352 38.2969 61.2846 39.6865C62.434 41.0761 63.0627 42.8219 63.0627 44.6241C63.0627 46.4263 62.434 48.1721 61.2846 49.5617C60.1352 50.9513 58.5369 51.8978 56.7644 52.2386V52.235ZM57.5032 8.47929C54.8258 5.79129 51.6425 3.65817 48.1365 2.20259C44.6305 0.747012 40.8708 -0.00231934 37.0737 -0.00231934C33.2767 -0.00231934 29.517 0.747012 26.011 2.20259C22.505 3.65817 19.3217 5.79129 16.6443 8.47929C14.5925 10.5231 12.8568 12.8604 11.4941 15.4143C10.6315 17.7653 13.414 18.3394 14.0892 16.7769C16.797 11.6491 21.1469 7.57438 26.4449 5.20268C31.743 2.83098 37.684 2.29897 43.3202 3.69151C48.9564 5.08405 53.9632 8.32092 57.5418 12.8858C61.1205 17.4506 63.0648 23.0805 63.0646 28.8773V37.2821C62.067 36.2257 60.8635 35.384 59.5281 34.8088C58.1928 34.2336 56.7537 33.937 55.2994 33.9373C54.9099 33.9373 54.5364 34.0917 54.2609 34.3667C53.9855 34.6417 53.8308 35.0146 53.8308 35.4035V53.8429C53.8308 54.0354 53.8688 54.2261 53.9426 54.404C54.0164 54.5819 54.1246 54.7435 54.2609 54.8797C54.3973 55.0158 54.5592 55.1238 54.7374 55.1975C54.9156 55.2712 55.1065 55.3091 55.2994 55.3091C58.1082 55.3052 60.8032 54.2001 62.8039 52.2319C64.8046 50.2636 65.9511 47.5897 65.9964 44.7858C65.9964 44.7676 65.9964 39.4648 65.9964 28.8773C66.0019 25.0859 65.2543 21.3311 63.7968 17.8302C62.3392 14.3292 60.2007 11.1515 57.505 8.48111L57.5032 8.47929Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M63.3157 53.6885C62.9882 53.6884 62.6707 53.8017 62.4174 54.009C62.1641 54.2164 61.9907 54.5051 61.9267 54.8258C61.8627 55.1465 61.9121 55.4795 62.0664 55.768C62.2207 56.0564 62.4705 56.2825 62.7731 56.4078C63.0757 56.533 63.4124 56.5496 63.7259 56.4548C64.0394 56.3599 64.3102 56.1595 64.4923 55.8876C64.6743 55.6158 64.7563 55.2893 64.7243 54.9638C64.6923 54.6383 64.5482 54.334 64.3166 54.1027C64.0503 53.8389 63.6909 53.6902 63.3157 53.6885Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M42.1184 67.7147L44.2021 67.2732L44.6443 69.3535L42.5606 69.795L42.1184 67.7147ZM62.5206 58.3015C62.1826 58.1091 61.782 58.0585 61.4067 58.1607C61.0314 58.2629 60.7121 58.5095 60.5187 58.8466C59.1195 61.2738 57.2479 63.3969 55.0142 65.091C52.7805 66.785 50.2298 68.0156 47.5124 68.7103L46.7735 65.2383C46.7335 65.0499 46.6567 64.8713 46.5475 64.7125C46.4383 64.5538 46.2989 64.4181 46.1372 64.3131C45.9755 64.2082 45.7946 64.1361 45.605 64.1009C45.4153 64.0657 45.2206 64.0682 45.0319 64.1082L40.0765 65.1602C39.6958 65.2413 39.3629 65.47 39.151 65.796C38.939 66.1221 38.8655 66.5187 38.9464 66.8989L40.0001 71.8463C40.0401 72.0346 40.1169 72.2133 40.2261 72.3721C40.3352 72.5308 40.4747 72.6665 40.6364 72.7715C40.7981 72.8764 40.979 72.9485 41.1686 72.9837C41.3583 73.0188 41.553 73.0163 41.7417 72.9764L46.6971 71.9244C50.1009 71.2778 53.325 69.9057 56.1493 67.9018C58.9737 65.8979 61.3318 63.3094 63.0629 60.3128C63.1604 60.1454 63.2238 59.9604 63.2493 59.7684C63.2748 59.5764 63.262 59.3813 63.2116 59.1943C63.1612 59.0073 63.0742 58.8321 62.9555 58.6789C62.8369 58.5256 62.6891 58.3974 62.5206 58.3015Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.98453 55.7978C3.66255 55.7978 2.39472 55.2735 1.45994 54.3402C0.525155 53.407 0 52.1412 0 50.8214V24.7293C0 24.0758 0.128929 23.4287 0.379425 22.8249C0.629921 22.2212 0.997079 21.6726 1.45994 21.2105C1.92279 20.7484 2.47228 20.3818 3.07703 20.1317C3.68179 19.8816 4.32995 19.7529 4.98453 19.7529H40.8881C41.5427 19.7529 42.1908 19.8816 42.7956 20.1317C43.4003 20.3818 43.9498 20.7484 44.4127 21.2105C44.8755 21.6726 45.2427 22.2212 45.4932 22.8249C45.7437 23.4287 45.8726 24.0758 45.8726 24.7293V57.5275C45.8749 58.1836 45.673 58.8243 45.2948 59.3609C44.9166 59.8975 44.3808 60.3036 43.7614 60.5231C43.142 60.7425 42.4696 60.7644 41.8372 60.5858C41.2048 60.4072 40.6436 60.0369 40.2311 59.526L37.2029 55.8014L4.98453 55.7978ZM4.98453 22.4655C4.68654 22.465 4.39138 22.5233 4.11595 22.6368C3.84052 22.7504 3.59024 22.9171 3.37945 23.1274C3.16865 23.3377 3.00147 23.5874 2.88749 23.8623C2.7735 24.1372 2.71496 24.4318 2.7152 24.7293V50.8232C2.7152 51.4231 2.9539 51.9985 3.3788 52.4227C3.8037 52.8469 4.37999 53.0852 4.98089 53.0852H38.5041L42.3476 57.8091C42.4067 57.8814 42.4867 57.9338 42.5767 57.9589C42.6668 57.9841 42.7624 57.9808 42.8505 57.9495C42.9386 57.9183 43.0149 57.8606 43.0688 57.7844C43.1228 57.7082 43.1518 57.6172 43.152 57.5238V24.7293C43.152 24.1294 42.9133 23.5541 42.4884 23.1299C42.0635 22.7057 41.4872 22.4673 40.8863 22.4673L4.98453 22.4655Z" fill="#10B981" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31.2865 36.3646H40.4258V38.7374L35.6341 50.5652H32.6805L37.332 39.0426H31.2865V36.3646ZM27.6851 36.112V38.7083H26.1692V41.1229H23.3557V38.7083H16.6641V36.1102L21.5377 26.637H24.5295L19.676 36.1102H23.3557V32.7435H26.1655V36.112H27.6851ZM5.69053 41.1211V39.0317L10.5222 34.0408C11.3908 33.3233 11.9663 32.3131 12.14 31.201C12.1551 30.9555 12.1178 30.7095 12.0308 30.4794C11.9438 30.2492 11.809 30.0401 11.6352 29.8657C11.4614 29.6913 11.2525 29.5557 11.0224 29.4677C10.7923 29.3797 10.5462 29.3413 10.3002 29.3551C9.78384 29.3624 9.28175 29.5252 8.85963 29.8221C8.4375 30.1191 8.11502 30.5364 7.93439 31.0193L5.58862 29.6403C5.98045 28.7332 6.63409 27.9633 7.46613 27.4287C8.29817 26.8941 9.27089 26.6191 10.2601 26.6389C10.865 26.6063 11.4702 26.6979 12.0383 26.908C12.6063 27.1181 13.1252 27.4423 13.5628 27.8605C14.0004 28.2787 14.3475 28.782 14.5827 29.3394C14.8178 29.8967 14.9359 30.4963 14.9298 31.1011C14.8623 31.9741 14.622 32.8251 14.2227 33.6048C13.8235 34.3845 13.2734 35.0773 12.6041 35.6433L9.8343 38.4267H15.1519V41.1248L5.69053 41.1211Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M34.3804 27.1385L21.7581 50.5653H22.981L35.5979 27.1404L34.3804 27.1385Z" fill="#EDB56A" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_845">
                      <rect width="66" height="73" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <div>
                  <h5 className='font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5'>پشتیبانی شبانه روزی</h5>
                  <span className='text-xs md:text-sm/6'>7 روز هفته ، 24 ساعته</span>
                </div>
              </div>
              <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center sm:text-right">
                <svg className='dark:hidden' width="109" height="73" viewBox="0 0 109 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_862_604)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M59.5095 8.66211L92.4431 18.9995V35.1861L81.547 38.7482V23.3623L47.2621 12.3864L59.5095 8.66211Z" fill="#FDBA74" />
                    <path d="M61.0774 8.62312L94.2237 19.2602C94.5708 19.3717 94.8738 19.5906 95.0894 19.8857C95.3049 20.1807 95.422 20.5367 95.4237 20.9027V34.948C95.4254 35.3079 95.3155 35.6594 95.1093 35.9537C94.903 36.2481 94.6106 36.4706 94.2727 36.5904L91.0325 37.7402C90.6049 37.8785 90.1404 37.8439 89.7378 37.6437C89.3352 37.4435 89.0262 37.0934 88.8766 36.668C88.727 36.2425 88.7485 35.7753 88.9365 35.3655C89.1246 34.9557 89.4643 34.6358 89.8836 34.4737L91.9729 33.7325V22.1736L55.0631 10.3292C54.7194 10.2171 54.4194 9.99934 54.2055 9.70676C53.9916 9.41418 53.8746 9.06153 53.871 8.69858C53.8674 8.33562 53.9774 7.98069 54.1854 7.68388C54.3934 7.38706 54.689 7.16334 55.0304 7.04429L67.1735 2.86828C67.5221 2.74879 67.8997 2.74447 68.2509 2.85596L106.888 15.1006C107.236 15.211 107.541 15.4295 107.757 15.7246C107.974 16.0198 108.092 16.3764 108.094 16.7431V58.9918C108.092 59.3583 107.975 59.7147 107.758 60.0098C107.542 60.3049 107.238 60.5236 106.89 60.6343L68.2509 72.9241C67.9104 73.033 67.5447 73.033 67.2042 72.9241L29.0494 60.6425C28.7027 60.5307 28.4001 60.3116 28.1849 60.0166C27.9698 59.7216 27.853 59.3657 27.8515 59V53.2739C27.8435 53.0415 27.8822 52.8098 27.9653 52.5927C28.0484 52.3756 28.1741 52.1775 28.335 52.0103C28.4959 51.843 28.6887 51.71 28.9019 51.6191C29.1151 51.5283 29.3443 51.4815 29.5759 51.4815C29.8074 51.4815 30.0366 51.5283 30.2498 51.6191C30.463 51.71 30.6558 51.843 30.8167 52.0103C30.9776 52.1775 31.1033 52.3756 31.1864 52.5927C31.2695 52.8098 31.3082 53.0415 31.3002 53.2739V57.7312L67.7337 69.4524L104.643 57.7312V18.0181L67.7541 6.32775L61.0774 8.62312Z" fill="#3F3F46" />
                    <path d="M105.848 15.3264C106.28 15.1994 106.746 15.2476 107.144 15.4608C107.542 15.6739 107.841 16.0351 107.977 16.467C108.113 16.8989 108.075 17.3671 107.871 17.7713C107.668 18.1756 107.315 18.4838 106.888 18.6299L68.2509 30.9053C67.9117 31.0135 67.5475 31.0135 67.2083 30.9053L37.7234 21.4857C37.5013 21.4221 37.2942 21.3144 37.1143 21.169C36.9344 21.0235 36.7855 20.8433 36.6763 20.6389C36.567 20.4346 36.4997 20.2103 36.4784 19.9794C36.4571 19.7484 36.4821 19.5155 36.5521 19.2945C36.622 19.0735 36.7354 18.8688 36.8856 18.6926C37.0357 18.5164 37.2196 18.3722 37.4262 18.2687C37.6329 18.1652 37.8581 18.1044 38.0886 18.0899C38.3191 18.0754 38.5501 18.1075 38.768 18.1843L67.7316 27.4356L105.848 15.3264Z" fill="#3F3F46" />
                    <path d="M84.9466 36.0071C85.372 35.8927 85.8248 35.946 86.2123 36.1561C86.5998 36.3662 86.8927 36.7171 87.0309 37.137C87.1692 37.5569 87.1423 38.014 86.9558 38.4146C86.7694 38.8153 86.4375 39.1292 86.0281 39.292L81.7739 40.7025C81.515 40.7881 81.2396 40.8109 80.9702 40.7691C80.7008 40.7272 80.4452 40.6218 80.2242 40.4615C80.0032 40.3013 79.8231 40.0907 79.6988 39.8471C79.5744 39.6035 79.5093 39.3338 79.5088 39.06V26.2815L42.599 14.4372C42.2558 14.3235 41.9569 14.1044 41.7443 13.8109C41.5317 13.5174 41.4162 13.1643 41.4142 12.8014C41.4122 12.4384 41.5237 12.084 41.733 11.7881C41.9422 11.4922 42.2387 11.2698 42.5806 11.1523L57.0706 6.33363C57.4965 6.21736 57.9506 6.26942 58.3394 6.4791C58.7282 6.68878 59.0223 7.04013 59.161 7.46089C59.2998 7.88165 59.2728 8.33982 59.0855 8.74116C58.8982 9.14251 58.5649 9.45651 58.1541 9.61858L48.6992 12.768L81.7596 23.3764C82.1067 23.4878 82.4097 23.7068 82.6253 24.0018C82.8409 24.2969 82.9579 24.6529 82.9596 25.0189V36.6661L84.9466 36.0071Z" fill="#3F3F46" />
                    <path d="M31.2921 18.3114V26.6593C31.2767 27.1083 31.0882 27.5337 30.7665 27.8459C30.4448 28.158 30.015 28.3325 29.5677 28.3325C29.1204 28.3325 28.6905 28.158 28.3688 27.8459C28.0471 27.5337 27.8587 27.1083 27.8433 26.6593V17.0488C27.8434 16.68 27.9606 16.3209 28.1779 16.0237C28.3952 15.7264 28.7012 15.5066 29.0515 15.396L42.7483 11.0845C43.1817 10.9575 43.6473 11.0061 44.0454 11.22C44.4435 11.4339 44.7423 11.7959 44.8776 12.2284C45.013 12.6609 44.9741 13.1295 44.7694 13.5336C44.5647 13.9377 44.2105 14.2452 43.7827 14.39L31.2921 18.3114Z" fill="#3F3F46" />
                    <path d="M45.8577 30.4888C46.3153 30.4888 46.7541 30.6713 47.0777 30.9963C47.4013 31.3213 47.583 31.762 47.583 32.2216C47.583 32.6812 47.4013 33.1219 47.0777 33.4469C46.7541 33.7718 46.3153 33.9544 45.8577 33.9544H14.8436C14.6122 33.9624 14.3815 33.9235 14.1653 33.8401C13.9492 33.7567 13.7519 33.6304 13.5854 33.4688C13.4189 33.3072 13.2864 33.1136 13.1959 32.8995C13.1055 32.6854 13.0589 32.4552 13.0589 32.2226C13.0589 31.99 13.1055 31.7598 13.1959 31.5457C13.2864 31.3316 13.4189 31.138 13.5854 30.9764C13.7519 30.8148 13.9492 30.6885 14.1653 30.6051C14.3815 30.5217 14.6122 30.4828 14.8436 30.4908L45.8577 30.4888Z" fill="#0D9488" />
                    <path d="M28.6099 38.1119C29.0569 38.1273 29.4805 38.3166 29.7914 38.6396C30.1022 38.9627 30.2759 39.3944 30.2759 39.8437C30.2759 40.2929 30.1022 40.7246 29.7914 41.0477C29.4805 41.3708 29.0569 41.56 28.6099 41.5754H1.72535C1.49391 41.5835 1.26323 41.5446 1.04706 41.4612C0.830893 41.3777 0.63366 41.2515 0.467114 41.0898C0.300569 40.9282 0.16812 40.7346 0.0776606 40.5205C-0.0127989 40.3064 -0.0594177 40.0762 -0.0594177 39.8437C-0.0594177 39.6111 -0.0127989 39.3809 0.0776606 39.1668C0.16812 38.9527 0.300569 38.7591 0.467114 38.5975C0.63366 38.4359 0.830893 38.3096 1.04706 38.2262C1.26323 38.1427 1.49391 38.1039 1.72535 38.1119H28.6099Z" fill="#0D9488" />
                    <path d="M9.66133 33.9544C10.6142 33.9544 11.3867 33.1786 11.3867 32.2216C11.3867 31.2646 10.6142 30.4888 9.66133 30.4888C8.70843 30.4888 7.93594 31.2646 7.93594 32.2216C7.93594 33.1786 8.70843 33.9544 9.66133 33.9544Z" fill="#0D9488" />
                    <path d="M14.49 49.1985C15.4429 49.1985 16.2154 48.4227 16.2154 47.4657C16.2154 46.5087 15.4429 45.7329 14.49 45.7329C13.5371 45.7329 12.7646 46.5087 12.7646 47.4657C12.7646 48.4227 13.5371 49.1985 14.49 49.1985Z" fill="#0D9488" />
                    <path d="M36.8893 45.733C37.3364 45.7484 37.76 45.9376 38.0708 46.2607C38.3816 46.5838 38.5553 47.0155 38.5553 47.4648C38.5553 47.914 38.3816 48.3457 38.0708 48.6688C37.76 48.9919 37.3364 49.1811 36.8893 49.1965H19.6641C19.4326 49.2045 19.202 49.1657 18.9858 49.0822C18.7696 48.9988 18.5724 48.8725 18.4058 48.7109C18.2393 48.5493 18.1068 48.3557 18.0164 48.1416C17.9259 47.9275 17.8793 47.6973 17.8793 47.4648C17.8793 47.2322 17.9259 47.002 18.0164 46.7879C18.1068 46.5738 18.2393 46.3802 18.4058 46.2186C18.5724 46.057 18.7696 45.9307 18.9858 45.8473C19.202 45.7638 19.4326 45.725 19.6641 45.733H36.8893Z" fill="#0D9488" />
                    <path d="M54.1391 0C54.5967 0 55.0356 0.182564 55.3591 0.50753C55.6827 0.832496 55.8645 1.27324 55.8645 1.73282C55.8645 2.19239 55.6827 2.63314 55.3591 2.9581C55.0356 3.28307 54.5967 3.46563 54.1391 3.46563H27.2546C26.797 3.46563 26.3581 3.28307 26.0345 2.9581C25.711 2.63314 25.5292 2.19239 25.5292 1.73282C25.5292 1.27324 25.711 0.832496 26.0345 0.50753C26.3581 0.182564 26.797 0 27.2546 0H54.1391Z" fill="#0D9488" />
                    <path d="M27.23 8.31494C27.6876 8.31494 28.1265 8.49751 28.4501 8.82247C28.7736 9.14744 28.9554 9.58819 28.9554 10.0478C28.9554 10.5073 28.7736 10.9481 28.4501 11.273C28.1265 11.598 27.6876 11.7806 27.23 11.7806H14.1465C13.9151 11.7886 13.6844 11.7497 13.4682 11.6663C13.2521 11.5829 13.0548 11.4566 12.8883 11.295C12.7217 11.1334 12.5893 10.9398 12.4988 10.7257C12.4084 10.5116 12.3618 10.2814 12.3618 10.0488C12.3618 9.81621 12.4084 9.58601 12.4988 9.37191C12.5893 9.15781 12.7217 8.96419 12.8883 8.80259C13.0548 8.64099 13.2521 8.51471 13.4682 8.43129C13.6844 8.34786 13.9151 8.30899 14.1465 8.31699L27.23 8.31494Z" fill="#0D9488" />
                    <path d="M69.686 71.1109C69.6706 71.5599 69.4822 71.9853 69.1605 72.2975C68.8388 72.6096 68.4089 72.7841 67.9616 72.7841C67.5143 72.7841 67.0845 72.6096 66.7628 72.2975C66.4411 71.9853 66.2526 71.5599 66.2372 71.1109V62.5434C66.2372 62.0838 66.419 61.643 66.7426 61.3181C67.0662 60.9931 67.505 60.8105 67.9626 60.8105C68.4202 60.8105 68.8591 60.9931 69.1827 61.3181C69.5062 61.643 69.688 62.0838 69.688 62.5434L69.686 71.1109Z" fill="#3F3F46" />
                    <path d="M69.6859 55.5814C69.6939 55.8138 69.6552 56.0455 69.5721 56.2626C69.4891 56.4797 69.3633 56.6778 69.2024 56.845C69.0415 57.0123 68.8487 57.1453 68.6356 57.2361C68.4224 57.327 68.1932 57.3738 67.9616 57.3738C67.73 57.3738 67.5008 57.327 67.2876 57.2361C67.0744 57.1453 66.8817 57.0123 66.7207 56.845C66.5598 56.6778 66.4341 56.4797 66.351 56.2626C66.268 56.0455 66.2293 55.8138 66.2372 55.5814V30.8354C66.2372 30.3758 66.419 29.935 66.7426 29.6101C67.0662 29.2851 67.505 29.1025 67.9626 29.1025C68.4202 29.1025 68.8591 29.2851 69.1826 29.6101C69.5062 29.935 69.688 30.3758 69.688 30.8354L69.6859 55.5814Z" fill="#3F3F46" />
                  </g>
                  <defs>
                    <clipPath id="clip0_862_604">
                      <rect width="108.092" height="73" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg className='hidden dark:inline-block' width="109" height="73" viewBox="0 0 109 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_876)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M59.5096 8.66199L92.4432 18.9993V35.186L81.5471 38.7481V23.3622L47.2622 12.3863L59.5096 8.66199Z" fill="#FDBA74" />
                    <path d="M61.0776 8.623L94.2238 19.2601C94.5709 19.3715 94.8739 19.5905 95.0895 19.8855C95.3051 20.1806 95.4221 20.5366 95.4238 20.9026V34.9478C95.4255 35.3078 95.3157 35.6593 95.1094 35.9536C94.9032 36.248 94.6108 36.4705 94.2728 36.5903L91.0326 37.7401C90.605 37.8784 90.1405 37.8438 89.7379 37.6436C89.3353 37.4433 89.0264 37.0933 88.8767 36.6679C88.7271 36.2424 88.7486 35.7751 88.9366 35.3654C89.1247 34.9556 89.4645 34.6357 89.8837 34.4736L91.973 33.7324V22.1735L55.0632 10.3291C54.7195 10.217 54.4195 9.99922 54.2056 9.70663C53.9918 9.41405 53.8747 9.06141 53.8711 8.69845C53.8675 8.3355 53.9775 7.98057 54.1855 7.68375C54.3935 7.38693 54.6891 7.16321 55.0305 7.04416L67.1737 2.86816C67.5223 2.74867 67.8998 2.74435 68.251 2.85584L106.888 15.1005C107.236 15.2109 107.541 15.4294 107.758 15.7245C107.974 16.0197 108.092 16.3763 108.094 16.743V58.9917C108.092 59.3582 107.975 59.7146 107.758 60.0097C107.542 60.3048 107.238 60.5234 106.89 60.6342L68.251 72.924C67.9105 73.0329 67.5448 73.0329 67.2043 72.924L29.0496 60.6424C28.7029 60.5306 28.4002 60.3115 28.1851 60.0165C27.9699 59.7214 27.8532 59.3656 27.8516 58.9999V53.2738C27.8436 53.0414 27.8823 52.8097 27.9654 52.5926C28.0485 52.3755 28.1742 52.1774 28.3351 52.0102C28.496 51.8429 28.6888 51.7099 28.902 51.619C29.1152 51.5282 29.3444 51.4814 29.576 51.4814C29.8076 51.4814 30.0368 51.5282 30.2499 51.619C30.4631 51.7099 30.6559 51.8429 30.8168 52.0102C30.9777 52.1774 31.1035 52.3755 31.1865 52.5926C31.2696 52.8097 31.3083 53.0414 31.3003 53.2738V57.7311L67.7338 69.4522L104.644 57.7311V18.018L67.7542 6.32763L61.0776 8.623Z" fill="white" />
                    <path d="M105.848 15.3264C106.281 15.1994 106.746 15.2476 107.144 15.4608C107.542 15.6739 107.841 16.0351 107.977 16.467C108.113 16.8989 108.075 17.3671 107.872 17.7713C107.668 18.1756 107.315 18.4838 106.888 18.6299L68.251 30.9053C67.9118 31.0135 67.5476 31.0135 67.2084 30.9053L37.7235 21.4857C37.5015 21.4221 37.2943 21.3144 37.1145 21.169C36.9346 21.0235 36.7856 20.8433 36.6764 20.6389C36.5672 20.4346 36.4999 20.2103 36.4786 19.9794C36.4572 19.7484 36.4823 19.5155 36.5522 19.2945C36.6222 19.0735 36.7356 18.8688 36.8857 18.6926C37.0359 18.5164 37.2197 18.3722 37.4264 18.2687C37.633 18.1652 37.8583 18.1044 38.0888 18.0899C38.3192 18.0754 38.5503 18.1075 38.7682 18.1843L67.7318 27.4356L105.848 15.3264Z" fill="white" />
                    <path d="M84.9468 36.0073C85.3721 35.893 85.8249 35.9463 86.2124 36.1564C86.5999 36.3664 86.8928 36.7174 87.031 37.1373C87.1693 37.5571 87.1424 38.0142 86.956 38.4149C86.7695 38.8155 86.4376 39.1294 86.0282 39.2923L81.774 40.7028C81.5151 40.7884 81.2397 40.8112 80.9703 40.7693C80.7009 40.7274 80.4453 40.622 80.2243 40.4618C80.0033 40.3015 79.8233 40.091 79.6989 39.8474C79.5746 39.6038 79.5095 39.334 79.5089 39.0603V26.2818L42.5992 14.4375C42.256 14.3237 41.957 14.1047 41.7444 13.8112C41.5318 13.5177 41.4164 13.1646 41.4143 12.8016C41.4123 12.4387 41.5238 12.0843 41.7331 11.7884C41.9424 11.4925 42.2389 11.2701 42.5808 11.1525L57.0707 6.33387C57.4966 6.21761 57.9507 6.26967 58.3395 6.47935C58.7283 6.68902 59.0224 7.04038 59.1612 7.46113C59.2999 7.88189 59.2729 8.34006 59.0856 8.74141C58.8983 9.14275 58.565 9.45675 58.1542 9.61883L48.6993 12.7683L81.7597 23.3766C82.1068 23.4881 82.4099 23.707 82.6254 24.0021C82.841 24.2971 82.958 24.6532 82.9597 25.0191V36.6664L84.9468 36.0073Z" fill="white" />
                    <path d="M31.2922 18.3115V26.6594C31.2768 27.1084 31.0884 27.5339 30.7667 27.846C30.445 28.1582 30.0152 28.3326 29.5679 28.3326C29.1206 28.3326 28.6907 28.1582 28.369 27.846C28.0473 27.5339 27.8589 27.1084 27.8435 26.6594V17.0489C27.8436 16.6801 27.9608 16.321 28.1781 16.0238C28.3954 15.7266 28.7014 15.5067 29.0517 15.3961L42.7485 11.0846C43.1818 10.9576 43.6475 11.0063 44.0456 11.2201C44.4437 11.434 44.7424 11.796 44.8778 12.2285C45.0131 12.6611 44.9743 13.1297 44.7696 13.5338C44.5649 13.9379 44.2107 14.2453 43.7829 14.3901L31.2922 18.3115Z" fill="white" />
                    <path d="M45.8576 30.4885C46.3152 30.4885 46.7541 30.6711 47.0777 30.9961C47.4012 31.321 47.583 31.7618 47.583 32.2213C47.583 32.6809 47.4012 33.1217 47.0777 33.4466C46.7541 33.7716 46.3152 33.9542 45.8576 33.9542H14.8436C14.6122 33.9622 14.3815 33.9233 14.1653 33.8399C13.9491 33.7564 13.7519 33.6302 13.5854 33.4686C13.4188 33.307 13.2864 33.1133 13.1959 32.8992C13.1055 32.6851 13.0588 32.4549 13.0588 32.2224C13.0588 31.9898 13.1055 31.7596 13.1959 31.5455C13.2864 31.3314 13.4188 31.1378 13.5854 30.9762C13.7519 30.8146 13.9491 30.6883 14.1653 30.6049C14.3815 30.5214 14.6122 30.4826 14.8436 30.4906L45.8576 30.4885Z" fill="#10B981" />
                    <path d="M28.61 38.1116C29.057 38.1271 29.4806 38.3163 29.7914 38.6394C30.1023 38.9625 30.276 39.3942 30.276 39.8434C30.276 40.2927 30.1023 40.7243 29.7914 41.0474C29.4806 41.3705 29.057 41.5597 28.61 41.5752H1.72544C1.494 41.5832 1.26332 41.5443 1.04715 41.4609C0.830985 41.3775 0.633751 41.2512 0.467206 41.0896C0.300661 40.928 0.168212 40.7344 0.0777521 40.5203C-0.0127074 40.3062 -0.0593262 40.076 -0.0593262 39.8434C-0.0593262 39.6108 -0.0127074 39.3806 0.0777521 39.1665C0.168212 38.9524 0.300661 38.7588 0.467206 38.5972C0.633751 38.4356 0.830985 38.3093 1.04715 38.2259C1.26332 38.1425 1.494 38.1036 1.72544 38.1116H28.61Z" fill="#10B981" />
                    <path d="M9.66142 33.9542C10.6143 33.9542 11.3868 33.1783 11.3868 32.2213C11.3868 31.2643 10.6143 30.4885 9.66142 30.4885C8.70852 30.4885 7.93604 31.2643 7.93604 32.2213C7.93604 33.1783 8.70852 33.9542 9.66142 33.9542Z" fill="#10B981" />
                    <path d="M14.49 49.1984C15.4429 49.1984 16.2154 48.4226 16.2154 47.4656C16.2154 46.5086 15.4429 45.7328 14.49 45.7328C13.5371 45.7328 12.7646 46.5086 12.7646 47.4656C12.7646 48.4226 13.5371 49.1984 14.49 49.1984Z" fill="#10B981" />
                    <path d="M36.8894 45.7328C37.3365 45.7483 37.7601 45.9375 38.0709 46.2606C38.3817 46.5837 38.5554 47.0154 38.5554 47.4646C38.5554 47.9139 38.3817 48.3456 38.0709 48.6686C37.7601 48.9917 37.3365 49.181 36.8894 49.1964H19.6642C19.4327 49.2044 19.202 49.1656 18.9859 49.0821C18.7697 48.9987 18.5725 48.8724 18.4059 48.7108C18.2394 48.5492 18.1069 48.3556 18.0165 48.1415C17.926 47.9274 17.8794 47.6972 17.8794 47.4646C17.8794 47.2321 17.926 47.0019 18.0165 46.7878C18.1069 46.5737 18.2394 46.38 18.4059 46.2184C18.5725 46.0568 18.7697 45.9306 18.9859 45.8471C19.202 45.7637 19.4327 45.7248 19.6642 45.7328H36.8894Z" fill="#10B981" />
                    <path d="M54.1392 0C54.5968 0 55.0357 0.182564 55.3593 0.50753C55.6828 0.832496 55.8646 1.27324 55.8646 1.73282C55.8646 2.19239 55.6828 2.63314 55.3593 2.9581C55.0357 3.28307 54.5968 3.46563 54.1392 3.46563H27.2547C26.7971 3.46563 26.3582 3.28307 26.0347 2.9581C25.7111 2.63314 25.5293 2.19239 25.5293 1.73282C25.5293 1.27324 25.7111 0.832496 26.0347 0.50753C26.3582 0.182564 26.7971 0 27.2547 0H54.1392Z" fill="#10B981" />
                    <path d="M27.2301 8.31506C27.6877 8.31506 28.1265 8.49763 28.4501 8.82259C28.7737 9.14756 28.9555 9.58831 28.9555 10.0479C28.9555 10.5075 28.7737 10.9482 28.4501 11.2732C28.1265 11.5981 27.6877 11.7807 27.2301 11.7807H14.1466C13.9151 11.7887 13.6845 11.7498 13.4683 11.6664C13.2521 11.583 13.0549 11.4567 12.8883 11.2951C12.7218 11.1335 12.5894 10.9399 12.4989 10.7258C12.4084 10.5117 12.3618 10.2815 12.3618 10.0489C12.3618 9.81633 12.4084 9.58613 12.4989 9.37203C12.5894 9.15793 12.7218 8.96431 12.8883 8.80271C13.0549 8.64111 13.2521 8.51483 13.4683 8.43141C13.6845 8.34798 13.9151 8.30911 14.1466 8.31712L27.2301 8.31506Z" fill="#10B981" />
                    <path d="M69.686 71.1112C69.6706 71.5602 69.4822 71.9856 69.1605 72.2977C68.8388 72.6099 68.409 72.7844 67.9617 72.7844C67.5143 72.7844 67.0845 72.6099 66.7628 72.2977C66.4411 71.9856 66.2527 71.5602 66.2373 71.1112V62.5436C66.2373 62.084 66.4191 61.6433 66.7427 61.3183C67.0662 60.9934 67.5051 60.8108 67.9627 60.8108C68.4203 60.8108 68.8591 60.9934 69.1827 61.3183C69.5063 61.6433 69.6881 62.084 69.6881 62.5436L69.686 71.1112Z" fill="white" />
                    <path d="M69.6861 55.5815C69.694 55.8139 69.6553 56.0456 69.5723 56.2627C69.4892 56.4798 69.3635 56.6779 69.2026 56.8451C69.0416 57.0124 68.8489 57.1454 68.6357 57.2363C68.4225 57.3271 68.1933 57.3739 67.9617 57.3739C67.7301 57.3739 67.5009 57.3271 67.2877 57.2363C67.0746 57.1454 66.8818 57.0124 66.7209 56.8451C66.56 56.6779 66.4342 56.4798 66.3512 56.2627C66.2681 56.0456 66.2294 55.8139 66.2374 55.5815V30.8355C66.2374 30.3759 66.4191 29.9352 66.7427 29.6102C67.0663 29.2852 67.5051 29.1027 67.9627 29.1027C68.4203 29.1027 68.8592 29.2852 69.1828 29.6102C69.5063 29.9352 69.6881 30.3759 69.6881 30.8355L69.6861 55.5815Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_876">
                      <rect width="108.092" height="73" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <div>
                  <h5 className='font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5'>امکان تحویل اکسپرس</h5>
                  <span className='text-xs md:text-sm/6'>ارسال بسته با سرعت باد</span>
                </div>
              </div>
              <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center sm:text-right">
                <svg className='dark:hidden' width="52" height="73" viewBox="0 0 52 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.05 8.5V1.5H21.55V8.5L17.05 18L16.55 30H24.55V18L29.05 8.5Z" fill="#0D9488" />
                  <path d="M50.2009 16.1646L46.2333 8.22953V1.21667C46.2333 0.544762 45.6886 0 45.0167 0H6.08333C5.41143 0 4.86667 0.544762 4.86667 1.21667V8.22953L0.899117 16.1646C0.308882 17.3478 0.00121667 18.6518 0 19.974V71.7833C0 72.4552 0.544763 73 1.21667 73H49.8833C50.5552 73 51.1 72.4552 51.1 71.7833V19.974C51.0988 18.6518 50.7911 17.3478 50.2009 16.1646ZM30.4167 2.43333H43.8V7.3H30.4167V2.43333ZM23.0108 9.0155C23.0181 9.0009 23.0279 8.96197 23.0388 8.9352C23.0821 8.8181 23.1071 8.69491 23.113 8.5702C23.113 8.55317 23.1228 8.53978 23.1228 8.52275V2.43333H27.9894L27.9833 8.22953L24.0158 16.1646C23.4256 17.3478 23.1179 18.6518 23.1167 19.974V29.2H18.25V19.974C18.2515 19.0294 18.4713 18.0979 18.8924 17.2523L22.995 9.06052C23.0023 9.04592 23.0035 9.0301 23.0108 9.0155ZM7.3 2.43333H20.6833V7.3H7.3V2.43333ZM38.9333 19.974V70.5667H2.43333V19.974C2.43485 19.0294 2.65461 18.0979 3.07573 17.2523L6.83523 9.73333H19.9314L16.7158 16.1646C16.1256 17.3478 15.8179 18.6518 15.8167 19.974V30.4167C15.8167 31.0886 16.3614 31.6333 17.0333 31.6333H24.3333C25.0052 31.6333 25.55 31.0886 25.55 30.4167V19.974C25.5515 19.0294 25.7713 18.0979 26.1924 17.2523L29.9519 9.73333H43.0481L39.8325 16.1646C39.2422 17.3478 38.9346 18.6518 38.9333 19.974ZM48.6667 70.5667H41.3667V19.974C41.3682 19.0294 41.588 18.0979 42.0091 17.2523L45.0167 11.2371L48.0243 17.2523C48.4454 18.0979 48.6652 19.0294 48.6667 19.974V70.5667Z" fill="#3F3F46" />
                  <path d="M30.05 47.5L29.55 43.5L27.55 40.5H23.05L16.05 43.5L11.55 50L12.05 57L16.55 59L21.55 58L27.55 53L30.05 47.5Z" fill="#FDBA74" />
                  <path d="M22.265 39.5659C19.3649 40.227 16.7206 41.7195 14.6559 43.8607C12.5173 45.9246 11.0266 48.5671 10.366 51.4649C9.70029 53.9429 10.3468 56.5895 12.0802 58.4814C13.4184 59.7706 15.2211 60.464 17.0783 60.4037C17.7578 60.4031 18.4357 60.3352 19.1016 60.2006C22.0017 59.5395 24.646 58.0469 26.7107 55.9057C28.8493 53.8418 30.34 51.1994 31.0006 48.3016C31.6663 45.8235 31.0198 43.177 29.2863 41.285C27.3949 39.547 24.7454 38.8982 22.265 39.5659ZM12.7506 51.9516C13.3185 49.5228 14.5799 47.3113 16.3812 45.586C18.1072 43.7821 20.3206 42.519 22.7516 41.9506C23.2555 41.8481 23.768 41.7951 24.2822 41.7924C25.2621 41.7658 26.2263 42.0415 27.044 42.582C26.5093 42.9966 25.9283 43.3476 25.3127 43.6283C22.816 44.8347 20.8007 46.8499 19.5944 49.3467C19.1389 50.3617 18.4896 51.2778 17.683 52.044C16.916 52.8507 15.9996 53.5002 14.9844 53.9566C14.2344 54.3043 13.5247 54.7335 12.8686 55.2366C12.5418 54.1709 12.5011 53.0379 12.7506 51.9516ZM28.616 47.8149C28.0481 50.2437 26.7867 52.4551 24.9854 54.1805C23.2594 55.9844 21.046 57.2474 18.615 57.8159C17.1562 58.1979 15.6048 57.9724 14.3153 57.1905C14.8524 56.7728 15.4363 56.4187 16.0551 56.1357C17.308 55.5608 18.4417 54.7555 19.3973 53.762C20.394 52.8075 21.2017 51.6736 21.7783 50.4198C22.7468 48.4048 24.3721 46.7795 26.387 45.811C27.1356 45.4629 27.8435 45.0333 28.4979 44.5299C28.8248 45.5955 28.8655 46.7286 28.616 47.8149Z" fill="#3F3F46" />
                </svg>
                <svg className='hidden dark:inline-block' width="52" height="73" viewBox="0 0 52 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.05 8.5V1.5H21.55V8.5L17.05 18L16.55 30H24.55V18L29.05 8.5Z" fill="#10B981" />
                  <path d="M50.2009 16.1646L46.2333 8.22953V1.21667C46.2333 0.544762 45.6886 0 45.0167 0H6.08333C5.41143 0 4.86667 0.544762 4.86667 1.21667V8.22953L0.899117 16.1646C0.308882 17.3478 0.00121667 18.6518 0 19.974V71.7833C0 72.4552 0.544763 73 1.21667 73H49.8833C50.5552 73 51.1 72.4552 51.1 71.7833V19.974C51.0988 18.6518 50.7911 17.3478 50.2009 16.1646ZM30.4167 2.43333H43.8V7.3H30.4167V2.43333ZM23.0108 9.0155C23.0181 9.0009 23.0279 8.96197 23.0388 8.9352C23.0821 8.8181 23.1071 8.69491 23.113 8.5702C23.113 8.55317 23.1228 8.53978 23.1228 8.52275V2.43333H27.9894L27.9833 8.22953L24.0158 16.1646C23.4256 17.3478 23.1179 18.6518 23.1167 19.974V29.2H18.25V19.974C18.2515 19.0294 18.4713 18.0979 18.8924 17.2523L22.995 9.06052C23.0023 9.04592 23.0035 9.0301 23.0108 9.0155ZM7.3 2.43333H20.6833V7.3H7.3V2.43333ZM38.9333 19.974V70.5667H2.43333V19.974C2.43485 19.0294 2.65461 18.0979 3.07573 17.2523L6.83523 9.73333H19.9314L16.7158 16.1646C16.1256 17.3478 15.8179 18.6518 15.8167 19.974V30.4167C15.8167 31.0886 16.3614 31.6333 17.0333 31.6333H24.3333C25.0052 31.6333 25.55 31.0886 25.55 30.4167V19.974C25.5515 19.0294 25.7713 18.0979 26.1924 17.2523L29.9519 9.73333H43.0481L39.8325 16.1646C39.2422 17.3478 38.9346 18.6518 38.9333 19.974ZM48.6667 70.5667H41.3667V19.974C41.3682 19.0294 41.588 18.0979 42.0091 17.2523L45.0167 11.2371L48.0243 17.2523C48.4454 18.0979 48.6651 19.0294 48.6667 19.974V70.5667Z" fill="white" />
                  <path d="M30.05 47.5L29.55 43.5L27.55 40.5H23.05L16.05 43.5L11.55 50L12.05 57L16.55 59L21.55 58L27.55 53L30.05 47.5Z" fill="#FDBA74" />
                  <path d="M22.265 39.5659C19.3649 40.227 16.7206 41.7195 14.6559 43.8607C12.5173 45.9246 11.0266 48.5671 10.366 51.4649C9.70029 53.9429 10.3468 56.5895 12.0802 58.4814C13.4184 59.7706 15.2211 60.464 17.0783 60.4037C17.7578 60.4031 18.4357 60.3352 19.1016 60.2006C22.0017 59.5395 24.646 58.0469 26.7107 55.9057C28.8493 53.8418 30.34 51.1994 31.0006 48.3016C31.6663 45.8235 31.0198 43.177 29.2863 41.285C27.3949 39.547 24.7454 38.8982 22.265 39.5659ZM12.7506 51.9516C13.3185 49.5228 14.5799 47.3113 16.3812 45.586C18.1072 43.7821 20.3206 42.519 22.7516 41.9506C23.2555 41.8481 23.768 41.7951 24.2822 41.7924C25.2621 41.7658 26.2263 42.0415 27.044 42.582C26.5093 42.9966 25.9283 43.3476 25.3127 43.6283C22.816 44.8347 20.8007 46.8499 19.5944 49.3467C19.1389 50.3617 18.4896 51.2778 17.683 52.044C16.916 52.8507 15.9996 53.5002 14.9844 53.9566C14.2344 54.3043 13.5247 54.7335 12.8686 55.2366C12.5418 54.1709 12.5011 53.0379 12.7506 51.9516ZM28.616 47.8149C28.0481 50.2437 26.7867 52.4551 24.9854 54.1805C23.2594 55.9844 21.046 57.2474 18.615 57.8159C17.1562 58.1979 15.6048 57.9724 14.3153 57.1905C14.8524 56.7728 15.4363 56.4187 16.0551 56.1357C17.308 55.5608 18.4417 54.7555 19.3973 53.762C20.394 52.8075 21.2017 51.6736 21.7783 50.4198C22.7468 48.4048 24.3721 46.7795 26.387 45.811C27.1356 45.4629 27.8435 45.0333 28.4979 44.5299C28.8248 45.5955 28.8655 46.7286 28.616 47.8149Z" fill="white" />
                </svg>

                <div>
                  <h5 className='font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5'>رست تخصصی</h5>
                  <span className='text-xs md:text-sm/6'>تازه برشته شده و با کیفیت</span>
                </div>
              </div>
              <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center sm:text-right">
                <svg className='dark:hidden' width="76" height="73" viewBox="0 0 76 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9999 35.5L10.4999 33V64.5L11.4999 68L16.4999 72H52.0002L55.0002 70.5L58.0002 67V34.5L45.0002 31.5L35.0002 33L20.0002 35.5H18.9999Z" fill="#FDBA74" />
                  <path d="M11.4999 10V3.5L13.9999 1H51.0002L56.0002 2V10H11.4999Z" fill="#0D9488" />
                  <path d="M69.0001 8.57485H57.8V4.37483C57.8 2.0547 55.9201 0.174805 53.5999 0.174805H14.8003C12.4808 0.174805 10.6002 2.0547 10.6002 4.37483V8.57485H2.20018C1.70662 8.57485 1.24929 8.83531 0.997046 9.25982C0.744798 9.68433 0.735228 10.21 0.971069 10.6441L7.32716 22.3254C8.55422 24.5854 9.19817 27.1154 9.20022 29.6864V65.9752C9.20501 69.8389 12.3366 72.9705 16.2003 72.9752H52.1999C56.0643 72.9705 59.1952 69.8389 59.2 65.9752V16.9749H66.2001C66.9732 16.9749 67.6001 17.6018 67.6001 18.3749V43.5751C67.6001 45.8945 69.4807 47.7751 71.8002 47.7751C74.1203 47.7751 76.0002 45.8945 76.0002 43.5751V15.5749C75.9954 11.7105 72.8645 8.57896 69.0001 8.57485ZM13.4002 4.37483C13.4002 3.60168 14.0271 2.97482 14.8003 2.97482L53.5999 2.97482C54.3731 2.97482 55 3.60168 55 4.37483V8.57485H13.4002V4.37483ZM4.55654 11.3749H56.4V32.0147C49.5189 30.4473 50 30.5 44.2373 31.3947L32.3913 33.3614C25.6161 34.4921 18.6824 34.2549 12.0002 32.6635V29.6864C11.9982 26.6478 11.2367 23.6571 9.78538 20.9869L4.55654 11.3749ZM52.1999 70.1752H16.2003C13.8808 70.1752 12.0002 68.2946 12.0002 65.9752V35.525C15.8967 36.4103 19.8794 36.8621 23.875 36.8717C26.8828 36.8703 29.8852 36.6215 32.852 36.1266L44.696 34.1585C50 33.3614 49.6829 33.2678 56.4 34.8811V65.9752C56.4 68.2946 54.5201 70.1752 52.1999 70.1752ZM73.2002 43.5751C73.2002 44.3482 72.5733 44.9751 71.8002 44.9751C71.027 44.9751 70.4001 44.3482 70.4001 43.5751V18.3749C70.4001 16.0548 68.5202 14.1749 66.2001 14.1749H59.2V11.3749H69.0001C71.3203 11.3749 73.2002 13.2548 73.2002 15.5749V43.5751Z" fill="#3F3F46" />
                  <path d="M52.1999 56.1748C51.4268 56.1748 50.7999 56.8017 50.7999 57.5748V63.1748C50.7999 63.948 50.173 64.5749 49.3999 64.5749H43.7998C43.0267 64.5749 42.3998 65.2017 42.3998 65.9749C42.3998 66.748 43.0267 67.3749 43.7998 67.3749H49.3999C51.72 67.3749 53.5999 65.4943 53.5999 63.1748V57.5748C53.5999 56.8017 52.973 56.1748 52.1999 56.1748Z" fill="#3F3F46" />
                </svg>
                <svg className='hidden dark:inline-block' width="76" height="73" viewBox="0 0 76 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 35.5L10.5 33V64.5L11.5 68L16.5 72H52.0002L55.0002 70.5L58.0002 67V34.5L45.0002 31.5L35.0002 33L20.0002 35.5H19Z" fill="#FDBA74" />
                  <path d="M11.5 10V3.5L14 1H51.0002L56.0002 2V10H11.5Z" fill="#10B981" />
                  <path d="M69.0001 8.57485H57.8V4.37483C57.8 2.0547 55.9201 0.174805 53.5999 0.174805H14.8003C12.4808 0.174805 10.6002 2.0547 10.6002 4.37483V8.57485H2.20018C1.70662 8.57485 1.24929 8.83531 0.997046 9.25982C0.744798 9.68433 0.735228 10.21 0.971069 10.6441L7.32716 22.3254C8.55422 24.5854 9.19817 27.1154 9.20022 29.6864V65.9752C9.20501 69.8389 12.3366 72.9705 16.2003 72.9752H52.1999C56.0643 72.9705 59.1952 69.8389 59.2 65.9752V16.9749H66.2001C66.9732 16.9749 67.6001 17.6018 67.6001 18.3749V43.5751C67.6001 45.8945 69.4807 47.7751 71.8002 47.7751C74.1203 47.7751 76.0002 45.8945 76.0002 43.5751V15.5749C75.9954 11.7105 72.8645 8.57896 69.0001 8.57485ZM13.4002 4.37483C13.4002 3.60168 14.0271 2.97482 14.8003 2.97482L53.5999 2.97482C54.3731 2.97482 55 3.60168 55 4.37483V8.57485H13.4002V4.37483ZM4.55654 11.3749H56.4V32.0147C49.5189 30.4473 50 30.5 44.2373 31.3947L32.3913 33.3614C25.6161 34.4921 18.6824 34.2549 12.0002 32.6635V29.6864C11.9982 26.6478 11.2367 23.6571 9.78538 20.9869L4.55654 11.3749ZM52.1999 70.1752H16.2003C13.8808 70.1752 12.0002 68.2946 12.0002 65.9752V35.525C15.8967 36.4103 19.8794 36.8621 23.875 36.8717C26.8828 36.8703 29.8852 36.6215 32.852 36.1266L44.696 34.1585C50 33.3614 49.6829 33.2678 56.4 34.8811V65.9752C56.4 68.2946 54.5201 70.1752 52.1999 70.1752ZM73.2002 43.5751C73.2002 44.3482 72.5733 44.9751 71.8002 44.9751C71.027 44.9751 70.4001 44.3482 70.4001 43.5751V18.3749C70.4001 16.0548 68.5202 14.1749 66.2001 14.1749H59.2V11.3749H69.0001C71.3203 11.3749 73.2002 13.2548 73.2002 15.5749V43.5751Z" fill="white" />
                  <path d="M52.2 56.1748C51.4268 56.1748 50.8 56.8017 50.8 57.5748V63.1748C50.8 63.948 50.1731 64.5749 49.3999 64.5749H43.7999C43.0268 64.5749 42.3999 65.2017 42.3999 65.9749C42.3999 66.748 43.0268 67.3749 43.7999 67.3749H49.3999C51.7201 67.3749 53.6 65.4943 53.6 63.1748V57.5748C53.6 56.8017 52.9731 56.1748 52.2 56.1748Z" fill="white" />
                </svg>


                <div>
                  <h5 className='font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5'>اکسسوری قهوه</h5>
                  <span className='text-xs md:text-sm/6'>وسایل و ادوات دم آوری</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
