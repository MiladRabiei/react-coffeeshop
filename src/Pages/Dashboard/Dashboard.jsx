import React, { useContext } from 'react'
import { Link,Navigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
export default function Dashboard() {
  let authcontext=useContext(AuthContext)

    if (authcontext.isLoading) {
      return "loading";
    }
  
    if (!authcontext.isLoggedIn) {
      return <Navigate to="/Login" replace />;
    }
  let waitingForPay=authcontext.userInfos.orders?.filter(item=>{
    return item.status==="waiting"
  })||[]
  let canceledProductsToBuy=authcontext.userInfos.orders?.filter(item=>{
    return item.status==="canceled"
  })||[]
  return (
    <div >
      {/* order info */}
      <div className="flex flex-col h-full flex-wrap  xl:flex-row xl:items-center gap-y-4 gap-x-4">
      <div className='flex flex-col w-full h-auto  md:max-h-[260px] gap-y-4 justify-start'>
        <p>اطلاعات سفارش ها :</p>
        <div className="flex justify-center flex-col h-[150px]  py-6 px-2 rounded-lg bg-white shadow-normal">
          <div className='flex gap-x-1 border-b-2 border-dashed pb-4'>
          <span className='flex gap-x-2 items-center'>
            <svg className='w-5 h-5'>
              <use href='#bag'></use>
            </svg>
            تعداد کل سفارش ها :
          </span>
          <div className='flex gap-x-1 text-orange-300'>
          <span className=''>0</span>
          <span>عدد</span>
          </div> 
          </div>
          <div className='flex gap-x-1 pt-4'>
          <span className='flex gap-x-2 items-center'>
            <svg className='w-5 h-5'>
              <use href='#wallet'></use>
            </svg>
            جمع کل سفارش ها :
          </span>
          <div className='flex gap-x-1 text-orange-300'>
          <span className=''>0</span>
          <span>تومان</span>
          </div> 
          </div>
          
        </div>
      </div>
      <div className='flex flex-col flex-1 h-auto md:max-h-[260px] gap-y-4 justify-start'>
        <p>جزییات سفارش ها :</p>
        <div className="w-full grid h-auto  md:h-[150px] gap-x-2 gap-y-4 px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
         child:flex child:items-center child:justify-between child:px-2 child:flex-1 child:gap-x-4 child:bg-white child:rounded-lg ">
        <div className=''>
          <span className='flex items-center w-30 min-h-[60px] gap-x-1'>
            <svg className='w-5 h-5 text-emerald-500'>
              <use href='#check'></use>
            </svg>
            تکمیل شده
          </span>
          <span className='flex-center w-10 h-10 bg-emerald-500 text-white rounded-full'>0</span>
        </div>
        <div className=''>
          <span className='flex items-center w-30 min-h-[60px] gap-x-1'>
            <svg className='w-5 h-5 text-sky-500'>
              <use href='#ellipsis'></use>
            </svg>
            در انتظار بررسی
          </span>
          <span className='flex-center w-10 h-10 bg-sky-500 text-white rounded-full'>{authcontext.shopBasket?authcontext.shopBasket.length:0}</span>
        </div>
        <div className=''>
          <span className='flex items-center w-30 min-h-[60px] gap-x-1'>
            <svg className='w-5 h-5 text-red-500'>
              <use href='#x-circle'></use>
            </svg>
             لغو شده
          </span>
          <span className='flex-center w-10 h-10 bg-red-500 text-white rounded-full'>{canceledProductsToBuy.length}</span>
        </div>
        <div className=''>
          <span className='flex items-center w-30 min-h-[60px] gap-x-1'>
            <svg className='w-5 h-5 text-violet-500'>
              <use href='#wallet'></use>
            </svg>
             منتظر پرداخت
          </span>
          <span className='flex-center w-10 h-10 bg-violet-500 text-white rounded-full'>{waitingForPay.length}</span>
        </div>
        <div className=''>
          <span className='flex items-center w-30 min-h-[60px] gap-x-1'>
            <svg className='w-5 h-5 text-amber-500'>
              <use href='#clock'></use>
            </svg>
             در حال انجام
          </span>
          <span className='flex-center w-10 h-10 bg-amber-500 text-white rounded-full'>0</span>
        </div>
        
        </div>
      </div>
      </div>
      {/* comments and order history */}
      <div className='flex flex-col mt-8  xl:flex-row xl:items-center gap-y-6 gap-x-4'>
      <div className='flex flex-col w-full h-full  md:max-h-[260px] gap-y-4 justify-start'>
        <p>نظرات شما :</p>
        <div className="flex flex-col justify-center h-[150px]  py-6 px-2 rounded-lg bg-white shadow-normal">
          <div className='flex gap-x-1 border-b-2 border-dashed pb-4'>
          <span className='flex gap-x-2 items-center'>
            <svg className='w-5 h-5'>
              <use href='#chat'></use>
            </svg>
            تعداد کل نظر ها :
          </span>
          <div className='flex gap-x-1 text-orange-300'>
          <span className=''>0</span>
          <span>عدد</span>
          </div> 
          </div>
          <div className='flex gap-x-1 pt-4'>
          <span className='flex gap-x-2 items-center'>
            <svg className='w-5 h-5'>
              <use href='#chat'></use>
            </svg>
            نظر در انتظار تایید :
          </span>
          <div className='flex gap-x-1 text-orange-300'>
          <span className=''>0</span>
          <span>عدد</span>
          </div> 
          </div>
          
        </div>
        <div className="flex gap-x-3">
          <Link to={"/userpanel/adress"} className='flex flex-1 justify-between bg-white shadow-normal rounded-lg px-2 py-4'>
          <span className='flex gap-x-3 '>
            <svg className='w-6 h-6 text-orange-300'>
              <use href='#map'></use>
            </svg>
            آدرس های من
          </span>
          <span>
            <svg className='w-6 h-6'>
              <use href='#arrow-mini-left'></use>
            </svg>
          </span>
          </Link>
          <Link to={"/userpanel/settings"} className="flex-center bg-white p-2 rounded-lg">
            <svg className='w-6 h-6 text-orange-300'>
              <use href='#settings'></use>
            </svg>
          </Link>
          <button className="flex-center bg-white p-2 rounded-lg">
            <svg className='w-6 h-6 text-orange-300'>
              <use href='#arrow-right-start'></use>
            </svg>
          </button>
          
        </div>
      </div>
      <div className='flex flex-col w-full h-full   md:max-h-[260px] gap-y-4 justify-start'>
        <p>سفارش های اخیر من :</p>
        <div className="flex h-[236px] overflow-y-auto overflow-x-hidden  py-2 px-2 rounded-lg bg-white shadow-normal">
          <table className='w-full'>
            <thead className='w-full bg-white text-sm border-b sticky -top-2 z-10'>
              <tr className=' child:p-2 child:text-right flex  child:flex-grow child:w-20 '>
                <th>نام محصول</th>
                <th>تاریخ</th>
                <th>قیمت</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody className='divide-y text-sm  '>
              {authcontext.userInfos.orders.length>0&&authcontext.userInfos.orders.map(item=>(
                <>
                <tr key={item.id} className='child:text-right child:p-2 flex child:flex-grow child:w-20 '>
                <td className='line-clamp-2   overflow-y-hidden'>{item.name}</td>
                <td>{item.orderTime&&item.orderTime}</td>
                <td>{item.price} تومان</td>
                {item.status==="cancel"?(

                  <td className='text-red-500'>لغو شده</td>
                ):item.status==="waiting"?(
                  <td className='text-amber-500'>درانتظار پرداخت</td>

                ):item.status==="paid"?(
                  <td className='text-emerald-500'>پرداخت شده</td>

                ):(null)}
              </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
    
  )
}
