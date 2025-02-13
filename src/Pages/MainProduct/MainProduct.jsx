import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import useFetch from '../../hooks/useFetch';
import Comment from '../../Components/Comment/Comment';
import CircleSpinner from '../../Components/CircleSpinner/CircleSpinner';
import apiRequests from '../../services/axios/Configs/configs';

export default function MainProduct() {
  let authContext = useContext(AuthContext)
  console.log(authContext.userInfos.favorites);
  let[count,setCount]=useState(1)
  let params = useParams()
  let [mainData, setMainData] = useFetch("/products")
  let[fetchComments,setFetchComments]=useState([])
  let[fetchLoading,setFetchLoading]=useState(true)
  let[likeCount,setLikeCount]=useState(null)
  let[liked,setLiked]=useState(false)
  let[disLikeCount,setDisLikeCount]=useState(null)
  let[disLiked,setDisliked]=useState(false)
  let[cmID,setCmID]=useState()


// handling shopbasket
  
  let mainProduct = mainData.find(item => +item.id=== +params.ProductID.trim())
  let product=mainData.filter(item=>+item.id===+params.ProductID.trim())
  let productInBasket =authContext.shopBasket&& authContext.shopBasket.filter(item => +item.id == +params.ProductID)
  let isInShopBasket=authContext.shopBasket&&authContext.shopBasket.some(item=>+item.id== +params.ProductID)
  let addToShopBasket=(id,ordercount)=>authContext.addtoshopbox(id,ordercount)
  let removeFromShopBox=(id)=>authContext.removefromshopbox(id)
  let increaseCount=(id)=>authContext.increasecount(id)
  let decreaseCount=(id)=>authContext.decreasecount(id)
  // handling comment logic

  useEffect(()=>{
    setFetchLoading(true)
    apiRequests.get(`/products/${params.ProductID}/`)
    .then(res=>{
      return res.data
    }).then(data=>{
      console.log(data.comments);
      setFetchComments(data.comments||[])
      setFetchLoading(false)
    }).catch(err=>{
      console.log(err);
    setFetchLoading(true)

    })
  },[])

  const handleLike = (ID) => {
    setFetchComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === ID) {
          const userCommentStatus = JSON.parse(localStorage.getItem("userCommentStatus")) || {};
  
          // Check if the user already liked or disliked
          const hasLiked = userCommentStatus[ID]?.liked;
          const hasDisliked = userCommentStatus[ID]?.disliked;
  
          // If the user already liked, do nothing
          if (hasLiked) return comment;
  
          // If user disliked, undo dislike before liking
          if (hasDisliked) {
            comment.dislikecount -= 1;  // Decrease dislike count
            userCommentStatus[ID].disliked = false;  // Remove dislike
          }
  
          // Increase the like count
          comment.likecount += 1;
          userCommentStatus[ID] = { liked: true, disliked: false };
  
          localStorage.setItem("userCommentStatus", JSON.stringify(userCommentStatus)); // Update the status in local storage
          return { ...comment, likecount: comment.likecount, dislikecount: comment.dislikecount };
        }
        return comment;
      })
    );
  };
  
  const handleDisLike = (ID) => {
    setFetchComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === ID) {
          const userCommentStatus = JSON.parse(localStorage.getItem("userCommentStatus")) || {};
  
          // Check if the user already liked or disliked
          const hasLiked = userCommentStatus[ID]?.liked;
          const hasDisliked = userCommentStatus[ID]?.disliked;
  
          // If the user already disliked, do nothing
          if (hasDisliked) return comment;
  
          // If user liked, undo like before disliking
          if (hasLiked) {
            comment.likecount -= 1;  // Decrease like count
            userCommentStatus[ID].liked = false;  // Remove like
          }
  
          // Increase the dislike count
          comment.dislikecount += 1;
          userCommentStatus[ID] = { disliked: true, liked: false };
  
          localStorage.setItem("userCommentStatus", JSON.stringify(userCommentStatus)); // Update the status in local storage
          return { ...comment, likecount: comment.likecount, dislikecount: comment.dislikecount };
        }
        return comment;
      })
    );
  };
  
  // Sync updates to the server
  useEffect(() => {
    if (!fetchComments) return;

    const updatedComments = { comments: fetchComments };
  
      apiRequests.patch(`/products/${params.ProductID}/`, {
        ...updatedComments
      })
        .then((response) => {

          return response.data;
        })
        .then((data) => {
          console.log("Product updated successfully:", data);
        })
        .catch((err) => console.error("Error updating product:", err));
    
  
  }, [fetchComments]);
  
  let addToFavorites=(id)=>{
    authContext.addtofavorites(id)
  }
  


  return (
    <>
      <main>
        <section className="product my-8 md:mt-40">
          <div className="container">
            <BreadCrumb
              links={
                [
                  { id: 1, to: "/Home", title: "صفحه اصلی" },
                  { id: 2, to: "/Store", title: "فروشگاه " },
                  { id: 3, to: `/Product-info/${params.ProductID}`, title: "محصول" },
                ]
              }
            />
            <div className="w-full flex flex-col lg:flex-row gap-4 gap-y-8   my-8 text-zinc-700 dark:text-white child:p-4 child:shadow-normal child:rounded-lg child:bg-white child:dark:bg-zinc-700">
              {/* product-detail */}
              <div className='lg:w-3/4 flex flex-col  gap-y-8'>

                <div className='flex flex-col lg:flex-row gap-5'>

                  {/* right */}
                  <div className='flex  flex-col lg:w-96  gap-y-4'>
                  <div className='gap-x-3 '>
                      <button onClick={()=>addToFavorites(+params.ProductID)} className={`border-2 border-gray-200   dark:border-white/20 rounded-full p-2 ${authContext.userInfos.favorites?.some(item=>item?.id===+params.ProductID)?"fill-red-500 text-red-500":"fill-current text-gray-200 dark:text-gray-400"}`}>
                        <svg className='w-5 h-5 '>
                          <use href='#heart'></use>
                        </svg>
                      </button>
                  </div>
                  {/* swiper */}
                  <div className='mt-2  lg:w-[366px] lg:h-[366px] rounded-lg overflow-hidden'>
                      <Swiper

                        slidesPerView={'auto'}
                        centeredSlides={true}
                        spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <div className='flex-center  '>
                            <img className='lg:w-[366px] lg:h-[366px] md:w-[680px] md:h-[680px] object-cover rounded-lg' src={import.meta.env.BASE_URL+`/images/products/p${params.ProductID}.png`} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className='flex-center '>
                            <img className='lg:w-[366px] lg:h-[366px] md:w-[680px] md:h-[680px] object-cover rounded-lg' src={import.meta.env.BASE_URL+"/images/p-1.webp"} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className='flex-center  '>
                            <img className='lg:w-[366px] lg:h-[366px] md:w-[680px] md:h-[680px] object-cover rounded-lg' src={import.meta.env.BASE_URL+"/images/p-2.webp"} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className='flex-center  '>
                            <img className='lg:w-[366px] lg:h-[366px] md:w-[680px] md:h-[680px] object-cover rounded-lg' src={import.meta.env.BASE_URL+"/images/p-4.webp"} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className='flex-center '>
                            <img className='lg:w-[366px] lg:h-[366px] md:w-[680px] md:h-[680px] object-cover rounded-lg' src={import.meta.env.BASE_URL+"/images/p-5.webp"} alt="" />
                          </div>
                        </SwiperSlide>

                      </Swiper>
                  </div>
                  </div>

                  {/* left */}
                  {mainProduct && (
                    <div className="flex flex-col gap-y-4 w-full">
                      <div className='flex items-start justify-between border-b border-b-gray-200 py-2'>
                        <div className='flex flex-col gap-y-1'>
                          <p className="text-sm text-gray-400">ESPRESSO BEANS GIORNO</p>
                          <h3 className="text-2xl font-MorabbaMedium">{mainProduct.name}</h3>
                        </div>
                        <div className="flex gap-x-1">
                          <p className="font-DanaMedium mt-0.5">5.0</p>
                          <svg className="w-5 h-5 text-yellow-400">
                            <use href="#star"></use>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <span className='flex gap-x-1 text-gray-400'>
                          <svg className='w-5 h-5'>
                            <use href="#list-bullet"></use>
                          </svg>
                          دسته‌بندی :{mainProduct.category}
                        </span>
                      </div>
                      <p className='font-DanaMedium mt-2'>ویژگی های محصول :</p>
                      <div className="grid gap-4 w-full grid-cols-1 xl:grid-cols-2 child:h-12
                      child:rounded-lg child:text-sm child:bg-gray-100 child:dark:bg-zinc-800 child:flex-center">
                        <div>
                          <p className='dark:text-gray-400'>گونه : 50% عربیکا و 50% ربوستا</p>
                        </div>
                        <div>
                          <p className='dark:text-gray-400'>میزان کافئین : متوسط</p>
                        </div>
                        <div>
                          <p className='dark:text-gray-400'>خاستگاه : آمریکای مرکزی و آسیای</p>
                        </div>
                        <div>
                          <p className='dark:text-gray-400'>مواد تشکیل‌دهنده : دانه اسپرسو</p>
                        </div>
                      </div>
                    </div>
                  )
                  }
                </div>

                <div className='grid grid-cols-2 xl:grid-cols-4 gap-x-1 gap-y-2 lg:gap-4 
            child:p-2 child:border child:dark:border-white/20 child:border-gray-200 child:flex-center child:text-gray-400 
             child:rounded-lg child:h-12 child:gap-x-1 child:lg:gap-x-2 
             child:text-sm child:lg:text-base child-hover:text-orange-300'>
                  <span className='flex-center'>
                    <svg className='w-5 h-5'>
                      <use href='#arrow-rounded'></use>
                    </svg>
                    ضمانت بازگشت کالا
                  </span>
                  <span className='flex-center'>
                    <svg className='w-5 h-5'>
                      <use href='#check-badge'></use>
                    </svg>
                    تضمین اصالت کالا
                  </span>
                  <span className='flex-center'>
                    <svg className='w-5 h-5'>
                      <use href='#calender'></use>
                    </svg>
                    پشتیبانی کل هفته
                  </span>
                  <span className='flex-center'>
                    <svg className='w-5 h-5'>
                      <use href='#truck'></use>
                    </svg>
                    ارسال به سراسر ایران
                  </span>
                </div>

                <div>
                  <h2 className='font-MorabbaMedium text-2xl mb-2 pb-1'>معرفی محصول</h2>
                  <p className='text-gray-600 dark:text-gray-300 tracking-tight leading-10 text-justify'>دانه قهوه جیورنو یکی از انواع قهوه اسپرسو بن‌مانو است که
                    از ترکیب مساوی دو گونه قهوه عربیکا و ربوستا با درجه برشته‌کاری مدیوم دارک
                    تهیه شده است. میزان کافئین جیورنو متوسط رو به بالا با طعم‌یاد شکلاتی است. به‌طور معمول، خریداران دانه قهوه مصرف‌‌کنندگان ،قهوه اسپرسو هستند. اما دانه قهوه جیورنو را می‌توان به سایز پودر قهوه ترک، فرانسه و اسپرسو آسیاب کرد
                    با دم‌افزارهای جذوه، فرنچ پرس، موکاپات یا اسپرسوساز برقی قهوه تهیه کرد.
                  </p>
                </div>
              </div>
              {/* product-price */}
              {isInShopBasket?(
                productInBasket.map(item=>(
                <div key={item.id} className='w-full lg:w-1/4 lg:sticky top-5 lg:top-[140px] h-fit flex flex-col gap-y-6'>
                  <div className='flex items-center gap-x-1'>
                    <span className='text-2xl font-DanaDemiBold'>{(item.price).toLocaleString()}</span>
                    <span>تومان</span>
                  </div>
                  <button className='flex items-center justify-between gap-x-1 px-3 py-2 border border-gray-200 dark:border-white/20 rounded-lg'>
                    <svg className='w-5 h-5 text-green-600' onClick={()=>increaseCount(item.id)} >
                      <use href='#plus'></use>
                    </svg>
                    <input type="number" id="customInput" value={item.ordercount} min={1} max={20} name="customInput" readOnly className='custome-input bg-transparent border-none outline-none text-center' />
                    {item.ordercount<2?(
                      <svg className='w-5 h-5 text-red-500' onClick={()=>removeFromShopBox(item.id)}>
                      <use href='#trash'></use>
                    </svg>
                    ):(
                      <svg className='w-5 h-5 text-red-500' onClick={()=>decreaseCount(item.id)}>
                      <use href='#minus'></use>
                    </svg>
                    )}
                    
                  </button>
                  <div className='flex items-center justify-between gap-x-1 py-2 px-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 rounded-lg xl:px-3 text-sm xl:text-base'>
                    <span>مجموع خرید </span>
                    <div className='flex items-center gap-x-1'>
                      <span className=''>
                        {productInBasket.reduce((total,item)=>{
                        let discount=item.off?(item.price*item.off)/100:0
                        return total+(item.price-discount)*item.ordercount
                      },0).toLocaleString()}
                      </span>
                      <span>تومان</span>
                    </div>
                  </div>
                  <span className='flex gap-x-2 items-center px-2'>
                    در سبد خرید شما موجود است
                    <svg className='w-5 h-5 text-orange-300'>
                      <use href='#shopping-cart'></use>
                    </svg>
                  </span>
                  <Link to="/shop" className='flex-center gap-x-1 bg-orange-300 text-white rounded-lg py-2 hover:bg-orange-400 delay-75'>
                    برو به سبد خرید
                    <svg className='w-5 h-5'>
                      <use href='#bag'></use>
                    </svg>
                  </Link>
                </div>
                ))
              ):(
                product.map(item=>(
                  (item.count>0?(
                <div key={item.id} className='w-full lg:w-1/4 lg:sticky top-5 lg:top-[140px] h-fit flex flex-col gap-y-6'>
                <div className='flex items-center gap-x-1'>
                  <span className='text-2xl font-DanaDemiBold'>{item.price.toLocaleString()}</span>
                  <span>تومان</span>
                </div>
                <button className='flex items-center justify-between gap-x-1 px-3 py-2 border border-gray-200 dark:border-white/20 rounded-lg'>
                  <svg className='w-5 h-5 text-green-600' onClick={()=>setCount(count+1)}>
                    <use href='#plus'></use>
                  </svg>
                  <input type="number" id="customInput" value={count} min={1} max={20} readOnly name="customInput" className='custome-input bg-transparent border-none outline-none text-center' />
                  {count<2?(
                      <svg className='w-5 h-5 text-red-500 opacity-5'>
                      <use href='#trash'></use>
                    </svg>
                    ):(
                      <svg className='w-5 h-5 text-red-500' onClick={()=>setCount(count-1)}>
                      <use href='#minus'></use>
                    </svg>
                    )}
                    
                </button>
                {item.off>0&&(
                <div className='flex items-center justify-between gap-x-1 py-2 px-2 text-emerald-500 rounded-lg xl:px-3 text-sm xl:text-base'>
                <span> سود شما از خرید </span>
                <div className='flex items-center gap-x-1'>
                  <span className=''>
                  {product.reduce((total, item) => {
                      const discount = item.off ? (item.price * item.off) / 100 : 0;
                      return total + (count * discount);
                  },0 ).toLocaleString()}
                </span>
                <span>تومان</span>
                </div>
                </div>
                )}
                
                <div className='flex items-center justify-between gap-x-1 py-2 px-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 rounded-lg xl:px-3 text-sm xl:text-base'>
                  <span>مجموع خرید </span>
                  <div className='flex items-center gap-x-1'>
                    <span className=''>
                      {product.reduce((total,item)=>{
                      let discount=item.off?(item.price*item.off)/100:0
                      return total+(item.price-discount)*count
                      },0).toLocaleString()}
                    </span>
                    <span>تومان</span>
                  </div>
                </div>
                <button onClick={()=>addToShopBasket(item.id,count)} className='flex-center gap-x-1 bg-orange-300 text-white rounded-lg py-2 hover:bg-orange-400 delay-75'>
                  افزودن به سبد خرید
                  <svg className='w-5 h-5'>
                    <use href='#bag'></use>
                  </svg>
                </button>
                </div>
                ):(
                  <div key={item.id} className='w-full lg:w-1/4 lg:sticky top-5 lg:top-[140px] h-fit flex flex-col gap-y-6'>
                <div className='flex flex-col justify-center gap-y-5 gap-x-1 h-40'>
                  <h2 className='text-xl font-MorabbaMedium text-red-500'>این محصول در حال حاضر موجود نیست!</h2>
                  <Link to="/store" className=' flex-center py-2 bg-orange-300 hover:bg-orange-400 rounded-lg'>برو به فروشگاه</Link>
                </div>
                
                </div>
                ))
              )))}         
            </div>

            {/* comments section */}
            <div className='text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 rounded-lg shadow-normal p-5'>
              <div className='flex items-center gap-x-2 mb-6'>
                <h2 className='font-MorabbaMedium text-2xl'>دیدگاه ها</h2>
                <span className='text-sm text-blue-500'>(28 دیدگاه)</span>
              </div>
              <div className="flex flex-col items-start lg:flex-row gap-10">
                <div className='flex flex-col w-full lg:w-1/4 '>
                  {authContext.isLoggedIn?(
                    <>
                    <p className='font-DanaMedium text-lg mb-2'> ثبت دیدگاه</p>
                    <input type="text" placeholder='عنوان' readOnly className='tailwind-input outline-none border-none' name="" id="" />
                    <p className='text-gray-500 dark:text-white text-sm mb-4'>این محصول را به دیگران پیشنهاد :</p>
                    <div className='w-full grid grid-cols-2 gap-4 mb-5 child:rounded-lg child:flex-center child:gap-x-2 child:py-2 child:shadow-normal child:font-DanaMedium child:delay-150'>
                      <button className='text-green-600 ring-transparent ring-1 focus:ring-green-600 dark:ring-white/20 dark:focus:ring-green-600'>
                        <svg className='w-5 h-5'>
                          <use href='#hand-up'></use>
                        </svg>
                        میکنم
                      </button>
                      <button className='text-red-500 ring-transparent ring-1 focus:ring-red-500 dark:ring-white/20 dark:focus:ring-red-500'>
                        <svg className='w-5 h-5'>
                          <use href='#hand-down'></use>
                        </svg>
                        نمیکنم
                      </button>
                    </div>
                    <textarea placeholder='متن دیدگاه' className='h-24 tailwind-input outline-none border-none' name="" id=""></textarea>
                    <button className='p-2 bg-orange-300 hover:bg-orange-400 text-white rounded-lg'>ثبت</button>
                    </>
                  ):(
                    <>
                    <div className='flex flex-col gap-y-5'>
                    <div className='flex text-yellow-400'>
                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                        <use href='#star'></use>
                    </svg>
                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                        <use href='#star'></use>
                    </svg>
                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                        <use href='#star'></use>
                    </svg>
                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                        <use href='#star'></use>
                    </svg>
                    <svg className='w-4 h-4 md:w-6 md:h-6'>
                        <use href='#star'></use>
                    </svg>
                    </div>

                    <div className='flex flex-col gap-y-2'>
                    <p className='text-gray-500 dark:text-white text-sm '>شما هم درباره این کالا دیدگاه ثبت کنید</p>
                    <p className='text-gray-500 dark:text-white text-sm '>جهت ثبت دیدگاه وارد شوید</p>
                    </div>
                   
                      <Link to="/Login" className='flex-center gap-x-1 py-2 bg-orange-300 hover:bg-orange-400 rounded-lg'>
                      ورود
                      <svg className='w-5 h-5'>
                        <use href="#arrow-left-end"></use>
                      </svg>
                      </Link>
                    </div>
                    
                    </>
                  )}
                  
                </div>
                  {fetchComments.length==0?(
                    <div className='w-full lg:w-3/4 flex flex-col items-center gap-y-5'>
                      <img className='w-30 h-30 lg:w-40 lg:h-40 text-white' src={import.meta.env.BASE_URL+`/images/comment-blank.svg`} alt="" />
                      <p className=" font-MorabbaMedium text-2xl lg:text-3xl text-zinc-700 dark:text-white">هنوز دیدگاهی ثبت نشده است!</p>
                    </div>
                  ):(
                    fetchLoading?(
                      <CircleSpinner/>
                    ):(
                      <ul className='flex flex-col w-full lg:w-3/4 gap-y-2'>
                      {fetchComments.length>0&&fetchComments.map(item=>(
                      <>
                        <Comment
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        suggested={item.suggested}
                        content={item.content}
                        date={item.date}
                        username={item.username}
                        userID={item.userID}
                        ProductID={item.ProductID}
                        likecount={item.likecount}
                        dislikecount={item.dislikecount}
                        isapproved={item.isapproved}
                        handleLike={handleLike}
                        handleDisLike={handleDisLike}
                        />
                      </>
                      ))}
                        
                        {fetchComments.length>3&&(
                        <button className='flex-center gap-x-1 my-4 text-orange-300 font-DanaMedium'>
                          مشاهده بیشتر ...
                        </button>
                        )}
                      </ul>
                    )
                  )}
                  
                
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}
