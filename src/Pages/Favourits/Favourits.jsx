import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import Product from '../../Components/Product/Product'
export default function Favourits() {
  let authcontext=useContext(AuthContext)

  return (
    <section className="favorites">
      
        <div className={`w-full ${!authcontext.userInfos.favorites?.length>0&&"bg-white shadow-noraml rounded-lg"}`}>
          {authcontext.userInfos.favorites?.length>0?(
            <div className='mt-4  grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5  p-5'>
              {authcontext.userInfos.favorites.map(item=>(
                <Product
                key={item?.id}
                id={item?.id}
                name={item?.name}
                off={item?.off}
                src={item?.src}
                count={item?.count}
                price={item?.price}
              />
              ))}
            </div>
          ):(
            <h1 className='font-MorabbaMedium text-3xl h-[500px] leading-[500px] text-center'>محصولی وجود ندارد!</h1>
          )}
        </div>
      
    </section>
  )
}
