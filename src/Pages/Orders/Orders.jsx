import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
export default function Orders() {

  let authcontext = useContext(AuthContext)
  if (authcontext.isLoading) {
    return "loading..."
  }

  let waitingForPay = authcontext.userInfos.orders?.filter(item => {
    return item.status === "waiting"
  }) || []
  let canceledProductsToBuy = authcontext.userInfos.orders?.filter(item => {
    return item.status === "cancel"
  }) || []
  console.log(authcontext.userInfos);
  return (
    <section className="orders">
      <div className='container'>
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
              <span className='flex-center w-10 h-10 bg-sky-500 text-white rounded-full'>{authcontext.shopBasket ? authcontext.shopBasket.length : 0}</span>
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
              {waitingForPay.length > 0 ? (
                <Link to={"/checkout"} className='flex items-center w-30 min-h-[60px] gap-x-1'>
                  <svg className='w-5 h-5 text-violet-500'>
                    <use href='#wallet'></use>
                  </svg>
                  منتظر پرداخت
                </Link>
              ) : (
                <span className='flex items-center w-30 min-h-[60px] gap-x-1'>
                  <svg className='w-5 h-5 text-violet-500'>
                    <use href='#wallet'></use>
                  </svg>
                  منتظر پرداخت
                </span>
              )}
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
      <div className='my-8'>
        <table className='w-full hidden sm:flex sm:flex-col'>
          <thead>
            <tr className='h-10 p-2 bg-orange-300 text-white flex items-center flex-grow child:flex child:flex-1'>
              <th>کد سفارش</th>
              <th>وضعیت</th>
              <th>تاریخ ثبت</th>
              <th>تعداد</th>
              <th> مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {authcontext.userInfos.orders.length > 0 ? (
              authcontext.userInfos.orders.map(item => (
                <tr key={item.id} className='text-center p-2 flex items-center flex-grow child:flex child:flex-1'>
                  <td>{item.orderID}</td>
                  {item.status === "cancel" ? (

                    <td className='text-red-500'>لغو شده</td>
                  ) : item.status === "waiting" ? (
                    <td className='text-amber-500'>درانتظار پرداخت</td>

                  ) : item.status === "paid" ? (
                    <td className='text-emerald-500'>پرداخت شده</td>

                  ) : (null)}
                  <td>{item.orderTime}</td>
                  <td>{item.ordercount}</td>
                  <td>{item.price.toLocaleString()}</td>
                </tr>

              ))
            ) : (
              <tr className='flex-center font-MorabbaLight text-3xl my-8'>
                <td>هنوز هیچ سفارشی ندارید!</td>
              </tr>
            )}
          </tbody>
        </table>
          {!authcontext.userInfos.orders.length > 0 ? (
          <div className='grid grid-cols-1 xs:grid-cols-2 p-2 sm:hidden w-full   text-sm gap-y-8 gap-x-8 child:border-b child:pb-8'>
            {authcontext.userInfos.orders.map(item => (
              <div key={item.id} className='flex flex-col  gap-y-4 child:flex child:gap-x-1 child:justify-between '>

                <div className=''>
                  <span>کد سفارش :</span>
                  <span>{item.orderID}</span>
                </div>
                <div className=''>
                  <span>آخرین وضعیت :</span>
                  {item.status === "cancel" ? (

                    <span className='text-red-500'>لغو شده</span>
                  ) : item.status === "waiting" ? (
                    <span className='text-amber-500'>درانتظار پرداخت</span>

                  ) : item.status === "paid" ? (
                    <span className='text-emerald-500'>پرداخت شده</span>

                  ) : (null)}
                </div>
                <div className=''>
                  <span>تاریخ ثبت :</span>
                  <span>{item.orderTime}</span>
                </div>
                <div className=''>
                  <span>تعداد :</span>
                  <span>{item.ordercount}</span>
                </div>
                <div className=''>
                  <span>قیمت :</span>
                  <span>{item.price}</span>
                </div>

              </div>
            ))}
          </div>
          ) : (
            <div className=" my-10 sm:hidden flex-center w-full flex-1 font-MorabbaLight text-3xl">
              <h2>هنوز هیچ سفارشی ندارید!</h2>
            </div>
          )}
      </div>
    </div>
    </section>
    
  )
}
