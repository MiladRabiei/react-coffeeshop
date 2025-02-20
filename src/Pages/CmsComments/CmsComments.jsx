import React, { useContext,useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiRequests from '../../services/axios/Configs/configs'
import Swal from 'sweetalert2'
import AuthContext from '../../Context/AuthContext'
import CircleSpinner from '../../Components/CircleSpinner/CircleSpinner'

export default function CmsComments() {
  let authcontext=useContext(AuthContext)
  let[mainData,isLoading]=useFetch("/comments")
  let[productData]=useFetch("/products")
  let[userData]=useFetch("/users")
  let[userComment,setUserComment]=useState()
  let[cmId,setCmId]=useState()
  let[showComment,setShowComment]=useState()
  let queryClient=useQueryClient()
  let editOverlay=useRef()
  let overlayContent=useRef()
  let showOverlay=useRef()
  let showOverlayContent=useRef()

  // show comment text
  let closeShowOverlay=(event)=>{
    if(!showOverlayContent.current.contains(event.target)){
      showOverlay.current.classList.add("hidden")
      showOverlay.current.classList.remove("flex-center")
      }
  }
  let showCommenttext=(id)=>{
    let mainComment=mainData.find(item=>item.id===id)
      setShowComment(mainComment.content)
      showOverlay.current.classList.add("flex-center")
      showOverlay.current.classList.remove("hidden")
  }
  // delete comment
  let deleteMutation=useMutation({
    mutationFn:async(id)=>{
      return apiRequests.delete(`/comments/${id}`)
    },
    onSuccess:(res)=>{
      console.log("comment deleted successfully",res.status);
            Swal.fire({
              title: "دیدگاه شما با موفقیت حذف شد",
              icon: "success",
              showConfirmButton:false,
              timer:1500,
              customClass:{
                title:"text-xl",
                icon:"text-sm"
              }
            });
            queryClient.invalidateQueries("/comments")
            
    },
    onError:(err)=>{
      console.log("an error occured when deleting comment",err);
            Swal.fire({
              title: "مشکلی وجود دارد!",
              icon: "error",
              showConfirmButton:false,
              timer:1500,
              customClass:{
                title:"text-xl",
                icon:"text-sm"
              }
            });
    }
  })
  let deleteComment=(id)=>{
        Swal.fire({
          title: "آیا از حذف این دیدگاه اطمینان دارید؟",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "بله",
          cancelButtonText:"لغو",
          customClass:{
            title:"text-xl",
            icon:"text-sm",
            confirmButton:"bg-orange-300"
          }
        }).then((result) => {
          if (result.isConfirmed) {
            deleteMutation.mutate(id)
          }
        });
  }
   // edit comment
   let patchCmMutation=useMutation({
    mutationFn:async({userComment,cmId})=>{
      return apiRequests.patch(`/comments/${cmId}`,{
        content:userComment
      })

    },
    onSuccess:(res)=>{
      console.log("comment edited successfully",res.data);
      Swal.fire({
        title: "دیدگاه شما با موفقیت تایید شد",
        icon: "success",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
      queryClient.invalidateQueries("/comments")
    },
    onError:(err)=>{
      console.log("an error occured when editing comment ",err);
      Swal.fire({
        title: "مشکلی وجود دارد!",
        icon: "error",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
    }
  })
  let closeEditOverlay=(event)=>{
    if(!overlayContent.current.contains(event.target)){
      editOverlay.current.classList.add("hidden")
      editOverlay.current.classList.remove("flex-center")
      }
      }
  let showEditComment=(id)=>{
    let mainComment=mainData.find(item=>item.id===id)
    setUserComment(mainComment.content)
    setCmId(id)
    editOverlay.current.classList.add("flex-center")
    editOverlay.current.classList.remove("hidden")
  }
  let editComment=()=>{
    patchCmMutation.mutate({userComment,cmId})
    editOverlay.current.classList.add("hidden")
    editOverlay.current.classList.remove("flex-center")
  }

  // approve comment
  let patchMutation=useMutation({
    mutationFn:async({approval,itemId})=>{
      return apiRequests.patch(`/comments/${itemId}`,{
        ...approval
      })

    },
    onSuccess:(res)=>{
      console.log("comment approved successfully",res.data);
      Swal.fire({
        title: "دیدگاه شما با موفقیت تایید شد",
        icon: "success",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
      queryClient.invalidateQueries("/comments")
      if(res.data){
        addToProductMutation.mutate(res.data)
      }
    },
    onError:(err)=>{
      console.log("an error occured when approving comment ",err);
      Swal.fire({
        title: "مشکلی وجود دارد!",
        icon: "error",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
    }
  })
  let addToProductMutation=useMutation({
    mutationFn:async(data)=>{
      let mainProduct=productData.find(item=>item.id===data.ProductID)
      return apiRequests.patch(`/products/${data.ProductID}`,{
        comments: mainProduct.comments ? [...mainProduct.comments, data] : [data]
      })

    },
    onSuccess:(res,data)=>{
      console.log("comment added to product successfully",res.data)
      queryClient.invalidateQueries("/products")
      addToUserMutation.mutate(data)
    },
    onError:(err)=>{
      console.log("an error occured when adding comment to product ",err);
      Swal.fire({
        title: "مشکلی وجود دارد!",
        icon: "error",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
    }
  })
  let addToUserMutation=useMutation({
    mutationFn:async(data)=>{
      let mainUser=userData.find(item=>item.id===data.userID)

      return apiRequests.patch(`/users/${data.userID}/`,{
        comments: mainUser.comments ? [...mainUser.comments, data] : [data]
      })

    },
    onSuccess:(res,data)=>{
      console.log("comment added to user datas successfully",res.data);
      queryClient.invalidateQueries("/users")
      deleteCmMutation.mutate(data)
      
    },
    onError:(err)=>{
      console.log("an error occured when adding comment to user data ",err);
      Swal.fire({
        title: "مشکلی وجود دارد!",
        icon: "error",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
    }
  })
  let deleteCmMutation=useMutation({
    mutationFn:async(data)=>{
      return apiRequests.delete(`/comments/${data.id}`)

    },
    onSuccess:(res)=>{
      console.log("comment after approving deleted from comments successfully",res.data);
      queryClient.invalidateQueries("/comments")
      
    },
    onError:(err)=>{
      console.log("an error occured when deleting comment after approving from comments ",err);
      Swal.fire({
        title: "مشکلی وجود دارد!",
        icon: "error",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
    }
  })
  let approveComment=(itemId)=>{
    let approval={
      isApproved:true
    }
    patchMutation.mutate({approval,itemId})
  }
  console.log(isLoading);
  return (
    <section className="cmsUsers mt-8 h-full">
      <h2 className="text-3xl font-MorabbaMedium">کامنت ها</h2>
      <div className={`mt-4 mb-8 rounded-lg bg-white p-5 border border-gray-300 ${!mainData.length>0&&"h-[350px] flex-center"}`}>
      {
      isLoading?(
        <CircleSpinner/>
      ):(
        mainData.length>0?(
          <table className='w-full border-separate border-spacing-y-3'>
            <thead className=''>
            <tr className='bg-orange-300 text-white px-2 whitespace-nowrap'>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>عملیات</th>
            </tr>
            </thead>
            
              <tbody className='w-full '>
              {mainData?.map(item=>(
              <tr className='child:text-center child:text-xs child:md:text-base text-center  h-10' key={item.id}>
                <td>{item.username}</td>
                <td>{item?.productName}</td>
                <td>
                <button onClick={()=>showCommenttext(item.id)} className='hidden xs:block p-2 bg-orange-300 w-[70px] sm:w-24 text-white  rounded-lg'>دیدن متن</button>
                <button onClick={()=>showCommenttext(item.id)} className='xs:hidden p-2 bg-orange-300 w-[50px]  text-white  rounded-lg'>متن</button>
                </td>
                <td>{item.date}</td>
                <td className=' flex flex-col xs:flex-row xs:justify-around xs:items-end gap-y-1 gap-x-1'>
                  <button onClick={()=>deleteComment(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>حذف</button>
                  <button onClick={()=>showEditComment(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>ویرایش </button>
                  <button onClick={()=>approveComment(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>تایید</button>
                </td>
  
              </tr>
            ))}
            </tbody>
            </table>
          ):(
          <div className=" ">
          <h2 className=" w-full text-3xl font-MorabbaMedium text-center ">هیچ کامنتی وجود ندارد</h2>
          </div>
          )
      )}
         
         
      </div>
      <div ref={editOverlay} onClick={(event)=>closeEditOverlay(event)} className=" overlay hidden  fixed inset-0 bg-black/40 z-[15]">
      <div ref={overlayContent} className="bg-white w-[300px] xs:w-[350px] p-5 flex flex-col gap-y-3 rounded-lg">
        <h2 className='font-MorabbaMedium text-2xl text-center'>دیدگاه را ویرایش کنید</h2>
        
        <div className=' rounded-lg overflow-hidden'>
          <textarea   value={userComment} onChange={(event)=>setUserComment(event.target.value)} className='bg-gray-200 p-2 w-full h-28  outline-none' name="" id="">
          </textarea>
        </div>
        
        <div className='w-full'>
          <button onClick={editComment} className="w-full text-white bg-orange-300 rounded-lg h-10">
            ثبت اطلاعات
          </button>
        </div>
      </div>
      </div>
      <div ref={showOverlay} onClick={(event)=>closeShowOverlay(event)} className=" hidden fixed inset-0 bg-black/40 z-[15]">
      <div ref={showOverlayContent} className="bg-white w-[300px] xs:w-[350px] p-5 rounded-lg ">
        <div className=' flex flex-col gap-y-3 child:w-full'>
          <p>{showComment}</p>
        </div>
      </div>
      </div>
    </section>
  )
}
