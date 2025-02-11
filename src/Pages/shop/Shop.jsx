import React, { useContext } from 'react'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import AuthContext from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
import moment from 'jalali-moment'
import apiRequests from '../../services/axios/Configs/configs'

export default function Shop() {
  let authContext=useContext(AuthContext)
  let removeFromShopBox=(id)=>authContext.removefromshopbox(id)
  let increaseCount=(id)=>authContext.increasecount(id)
  let decreaseCount=(id)=>authContext.decreasecount(id)
  let emptyShopBox=()=>authContext.emptyshopbox()
  const jalaliTextDate = moment().locale("fa").format(" jYYYY/jM/jD");
  const addOrderstoDB = async () => {
    let order = authContext.shopBasket.map(item => ({
      ...item,
      status: "waiting",
      orderID: crypto.randomUUID().slice(-3) + Date.now().toString().slice(-3),
      orderTime:jalaliTextDate
    }));
    
    let updatedProducts = [...authContext.userInfos.orders]; // Start with the existing orders array
    console.log(updatedProducts);
    order.forEach(product => {
      const existsInOrders = updatedProducts.some(item => item.orderID === product.orderID);
    
      if (!existsInOrders) {
        updatedProducts.push(product);
      } else {
        updatedProducts = updatedProducts.map(item => {
          if (item.orderID === product.orderID && item.status !== product.status) {
            return item; 
          }
          return item;
        });
      }
    });
    let updatedOrders={orders:updatedProducts}
    try {
      const response = await apiRequests.patch(`/users/${authContext.userInfos.id}`, {
        updatedOrders
      });
  
      const data = await response.data;
      console.log("Orders updated successfully:", data);
      authContext.setUserInfos(prev => ({ ...prev, orders: data.orders }));

    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };
  
  return (
    <section className="shop mt-8 md:mt-40">
      <div className="container">
        {/* bread crumb */}
      <div className="breadCrumb flex gap-x-2 text-gray-400 text-sm md:text-base">
      <BreadCrumb
      links={
        [
          {id:1,to:"/Home" ,title:"صفحه اصلی"},
          {id:2,to:"/Shop" ,title:"سبد خرید"},
        ]
      }
      />
      </div>
      {/* shopBox title */}
      <div className="w-full flex items-center justify-start gap-x-2 my-4  text-zinc-700 dark:text-white">
        <h2 className='font-MorabbaMedium text-3xl'>سبد خرید</h2>
        {authContext.shopBasket&&authContext.shopBasket.length>0?(
        <span className='bg-orange-300 rounded-md mt-1 w-5 h-5 leading-6 flex justify-center'>{authContext.shopBasket.length}</span>
        ):(null)}
      </div>
      {/* shopbox section */}
      <div className='flex flex-col lg:flex-row w-full  text-zinc-700 dark:text-white gap-4 gap-y-8 my-8 child:border child:border-gray-300 child:dark:border-white/10 child:p-5 child:rounded-lg child:bg-white child:dark:bg-zinc-700'>
      <div className={`w-full lg:${authContext.shopBasket&&authContext.shopBasket.length>0?"w-3/4":"w-full"} order-2 lg:order-1 `}>
        {/* shopbox head */}
        <div className='flex items-center justify-between pb-2 border-b border-gray-300 dark:border-white/10'>
          <h3 className='font-DanaMedium text-xl tracking-tightest'>سبد خرید شما</h3>
          <span onClick={emptyShopBox} className='flex font-Dana leading-6 gap-x-2 text-orange-300 hover:text-red-500 cursor-pointer'>
            <svg className='w-5 h-5'>
              <use href='#trash'/>
            </svg>
            حذف همه
          </span>
        </div>
        {/* shopbox body */}
        {authContext.shopBasket&&authContext.shopBasket.length>0?(
        <div className="divide-y divide-gray-300 dark:divide-white/10">
        {authContext.shopBasket&&authContext.shopBasket.map(item=>(
                <div key={item.id} className='pb-1 child:py-5'>
                <div className='flex items-center sm:text-center gap-x-2.5 '>
                <img src={import.meta.env.BASE_URL+item.src} alt="product 1" className='w-30 h-30' />
                <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full'>
                <Link to={`/product-info/${item.id}`} className='font-DanaMedium text-zinc-700 dark:text-white text-base w-40 line-clamp-2'>{item.name}</Link>
                <div className='w-full sm:w-30'>
                <button className="flex items-center justify-between w-full gap-x-1 px-1 py-1 my-2 border border-gray-200 dark:border-white/20 rounded-lg">
                <svg className="w-5 h-5 text-green-600" onClick={()=>increaseCount(item.id)}>
                    <use href="#plus"></use>
                </svg>
                <input
                    type="number"
                    id="customInput"
                    value={item.ordercount}
                    readOnly
                    min={1}
                    max={20}
                    name="customInput"
                    className="custome-input bg-transparent border-none outline-none text-center"
                />
                {item.ordercount>1?(
                    <svg className="w-5 h-5 text-red-500" onClick={()=>decreaseCount(item.id)}>
                    <use href="#minus"></use>
                </svg>
                ):(
                    <svg className="w-5 h-5 text-red-500" onClick={()=>removeFromShopBox(item.id)}>
                    <use href="#trash"></use>
                    </svg>
                )}
                </button>
                </div>
                {item.off>0? (
                <>
                <div className="flex flex-col sm:w-[110px]">
                <div className="text-zinc-700 dark:text-white  font-DanaDemiBold">
                {((item.price-((item.price*item.off)/100))*item.ordercount).toLocaleString()}
                <span className="font-Dana text-xs pr-1">تومان</span>
                </div>
                <span
                  className="text-teal-600 dark:text-emerald-600 my-2 text-xs tracking-tighter"
                >
                {(((item.price * item.off) / 100)*item.ordercount).toLocaleString()} تومان
                تخفیف
                </span>
                
                </div>
                
                </>
                    ):(
                    <div className="sm:w-[110px] text-zinc-700 dark:text-white font-DanaDemiBold">
                      {item.price.toLocaleString()}
                        
                      <span className="font-Dana text-xs pr-1">تومان</span>
                    </div>
                    )}
                </div>
                </div>
                        

                </div>
                ))}
        </div>
        ):(
          <div className="flex flex-col items-center gap-y-5 my-8 text-zinc-700 dark:text-white">
            <img className=' md:aspect-auto' src={import.meta.env.BASE_URL+"/images/fresh-empty-cart.png"} alt="" />
            <h1 className='font-MorabbaMedium md:text-2xl'>سبد خرید شما خالی است!</h1>
          </div>
        )}
      </div>
      {/* submit shopping */}
      {authContext.shopBasket&&authContext.shopBasket.length>0?(
        <div className="w-full lg:w-1/4 lg:sticky lg:top-[140px] order-2 flex flex-col h-fit gap-y-4">
        <div className='flex items-center justify-between gap-x-1 py-2 px-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 rounded-lg xl:px-3 text-sm xl:text-base'>
          <span>قیمت کالاها</span>
          <div className='flex items-center gap-x-1'>
          <span className=''>
              {authContext.shopBasket&& authContext.shopBasket.reduce((total, item) => {
                  return total + (item.ordercount * item.price);
              },0 ).toLocaleString()}
            </span>
            <span>تومان</span>
          </div>
        </div>
        {authContext.shopBasket.map(item=>(
          <>
          {item.off>0&&(
        <div className='flex items-center justify-between gap-x-1 py-2 px-2 text-emerald-500 rounded-lg xl:px-3 text-sm xl:text-base'>
          <span> سود شما از خرید </span>
          <div className='flex items-center gap-x-1'>
              <span className=''>
              {authContext.shopBasket&& authContext.shopBasket.reduce((total, item) => {
                  const discount = item.off ? (item.price * item.off) / 100 : 0;
                  return total + (item.ordercount * discount);
              },0 ).toLocaleString()}
            </span>
  
            <span>تومان</span>
          </div>
        </div>
          )}
          </>
        ))}
        
        <div className='flex items-center justify-between gap-x-1 py-2 px-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 rounded-lg xl:px-3 text-sm xl:text-base'>
          <span>مجموع خرید </span>
          <div className='flex items-center gap-x-1'>
            <span className=''>
            {authContext.shopBasket&& authContext.shopBasket.reduce((total, item) => {
                  const discount = item.off ? (item.price * item.off) / 100 : 0;
                  return total + (item.price - discount)*item.ordercount;
              },0 ).toLocaleString()}
            </span>
            <span>تومان</span>
          </div>
        </div>
        {authContext.isLoggedIn?(
          <button onClick={addOrderstoDB}  className='flex-center gap-x-1 bg-orange-300 text-white rounded-lg py-2 hover:bg-orange-400 delay-75'>
          ثبت سفارش
          <svg className='w-5 h-5'>
            <use href='#bag'></use>
          </svg>
        </button>
        ):(
          <Link to={"/Login"}   className='flex-center gap-x-1 bg-orange-300 text-white rounded-lg py-2 hover:bg-orange-400 delay-75'>
          ورود به حساب کاربری 
          <svg className='w-5 h-5'>
            <use href='#bag'></use>
          </svg>
        </Link>
        )
        }
        </div>
        ):(
      authContext.isLoggedIn?(
            authContext.shopBasket&&authContext.shopBasket.length>0?(
            <div className="w-full lg:w-1/4 lg:sticky lg:top-[140px] order-2 flex flex-col h-fit gap-y-4">
            <div className='flex items-center justify-between gap-x-1 py-2 px-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 rounded-lg xl:px-3 text-sm xl:text-base'>
              <span>قیمت کالاها</span>
              <div className='flex items-center gap-x-1'>
              <span className=''>
                  {authContext.shopBasket&& authContext.shopBasket.reduce((total, item) => {
                      return total + (item.ordercount * item.price);
                  },0 ).toLocaleString()}
                </span>
                <span>تومان</span>
              </div>
            </div>
            {authContext.shopBasket.map(item=>(
            <>
            {item.off>0&&(
            <div className='flex items-center justify-between gap-x-1 py-2 px-2 text-emerald-500 rounded-lg xl:px-3 text-sm xl:text-base'>
          <span> سود شما از خرید </span>
          <div className='flex items-center gap-x-1'>
              <span className=''>
              {authContext.shopBasket&& authContext.shopBasket.reduce((total, item) => {
                  const discount = item.off ? (item.price * item.off) / 100 : 0;
                  return total + (item.ordercount * discount);
              },0 ).toLocaleString()}
            </span>
  
            <span>تومان</span>
          </div>
            </div>
            )}
            </>
            ))}

            <div className='flex items-center justify-between gap-x-1 py-2 px-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 rounded-lg xl:px-3 text-sm xl:text-base'>
              <span>مجموع خرید </span>
              <div className='flex items-center gap-x-1'>
                <span className=''>
                {authContext.shopBasket&& authContext.shopBasket.reduce((total, item) => {
                      const discount = item.off ? (item.price * item.off) / 100 : 0;
                      return total + (item.price - discount)*item.ordercount;
                  },0 ).toLocaleString()}
                </span>
                <span>تومان</span>
              </div>
            </div>
            <button onClick={addOrderstoDB}  className='flex-center gap-x-1 bg-orange-300 text-white rounded-lg py-2 hover:bg-orange-400 delay-75'>
              ثبت سفارش
              <svg className='w-5 h-5'>
                <use href='#bag'></use>
              </svg>
            </button>
            </div>
            ):(
              null
            )
      ):(
         <div className="w-full lg:w-1/4 lg:sticky lg:top-[140px] order-1 lg:order-2 flex flex-col h-fit gap-y-4 ">
              <Link to="/Login" className="flex justify-between items-center">
                <span className='flex items-center gap-x-2'>
                  <svg className='w-5 h-5 text-orange-300'>
                    <use href="#arrow-left-end"></use>
                  </svg>
                ورود به حساب کاربری
                </span>
                <svg className=' w-5 h-5'>
                  <use href="#arrow-mini-left"></use>
                </svg>
              </Link>
          </div>
        )
        )}
      
      

      </div>

      </div>
    </section>
  )
}
