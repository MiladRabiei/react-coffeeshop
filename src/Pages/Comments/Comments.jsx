import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import Comment from '../../Components/Comment/Comment';
export default function Comments() {
  let authcontext=useContext(AuthContext)
  console.log(authcontext.userInfos.comments.length);
  return (
    <section className="comments">
        <h2 className='mt-8 font-MorabbaMedium text-3xl'>اطلاعات</h2>
        <div className={`mt-4 mb-8 bg-white  rounded-lg p-5 border border-gray-300 ${!authcontext.userInfos.comments.length>0&&"h-[350px] flex-center"}`}>
          {authcontext.userInfos.comments.length>0?
          (authcontext.userInfos.comments?.map(item=>(
          <ul className='flex flex-col w-full lg:w-3/4 gap-y-2'key={item.id}>
            <Comment
            id={item.id}
            title={item.title}
            suggested={item.suggested}
            content={item.content}
            date={item.date}
            username={item.username}
            userID={item.userID}
            ProductID={item.ProductID}
            isapproved={item.isapproved}
            
            />
          </ul>
          ))):(
            <div className=" ">
            <h2 className=" w-full text-3xl font-MorabbaMedium text-center ">هنوز دیدگاهی ثبت نکردید!</h2>
            </div>
          )}
        </div>
    </section>
  )
}
