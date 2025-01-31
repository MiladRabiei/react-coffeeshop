import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'

export default function CheckOut() {
    let authcontext=useContext(AuthContext)
    let cancelShopping=async(ID)=>{
        let orders=authcontext.userInfos.orders.map(item=>{
            if(item.id===ID&&!item.status!=="cancel"){
                return{...item,status:"cancel"}
            }
            return item
        })
        try {
            const response = await fetch(`https://react-coffeshop.liara.run/users/${authcontext.userInfos.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orders: orders })
            });
        
            if (!response.ok) {
              throw new Error(`Failed to update orders: ${response.status}`);
            }
        
            const data = await response.json();
            console.log("Orders updated successfully:", data);
            authcontext.setUserInfos(data)
          } catch (error) {
            console.error("Error updating orders:", error);
          }
    }
    
  return (
    <section className='mt-8 md:mt-40 text-zinc-700 dark:text-white'>
        <div className="container">
        <h2 className='mt-8 font-MorabbaMedium text-3xl'>محصولات</h2>
        <div className='mt-4 bg-white dark:bg-zinc-700 rounded-lg p-5 border border-gray-300 dark:border-white/10 divide-y'>

        {authcontext.userInfos.orders && authcontext.userInfos.orders.some(item => item.status === "waiting") ? (
        authcontext.userInfos.orders.map(item =>
    item.status === "waiting" ? (
      <div key={item.id} className="pb-1 child:py-5">
        <div className="flex items-center sm:text-center gap-x-2.5">
          <img src={import.meta.env.BASE_URL + item.src} alt="product" className="w-30 h-30" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
            <Link
              to={`/product-info/${item.id}`}
              className="font-DanaMedium text-zinc-700 dark:text-white text-base w-40 line-clamp-2"
            >
              {item.name}
            </Link>
            <svg className="w-7 h-7 text-red-500 cursor-pointer" onClick={() => cancelShopping(item.id)}>
              <use href="#trash"></use>
            </svg>
          </div>
        </div>
      </div>
    ) : null // ✅ Don't return `<Navigate>` inside `.map()`
  )
) : (
  <Navigate to="/store" /> // ✅ Redirect only if no "waiting" orders exist
)}

        </div>
        </div>
    </section>
  )
}
