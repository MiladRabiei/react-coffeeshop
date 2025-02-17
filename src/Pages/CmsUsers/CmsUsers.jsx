import React, { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useMutation } from '@tanstack/react-query';
import apiRequests from '../../services/axios/Configs/configs';
import Swal from 'sweetalert2';
import { useRef } from 'react';
import AuthContext from '../../Context/AuthContext';
export default function CmsUsers() {
  let [mainData,isLoading,refetch]=useFetch("/users")
  let [userRole,setUserRole]=useState("costumer")
  let [itemId,setItemId]=useState()
  let [userInfos,setUserInfos]=useState()
  console.log(mainData);
    let authcontext=useContext(AuthContext)
    let editOverlay=useRef()
    let overlayContent=useRef()
    let showOverlay=useRef()
    let showOverlayContent=useRef()
  //edit user role
  let editedData=()=>{
    let newData={
      role:userRole
    }
    patchMutation.mutate({newData,itemId})
    editOverlay.current.classList.add("hidden")
    editOverlay.current.classList.remove("flex-center")
  }
  let closeEditOverlay=(event)=>{
    if(!overlayContent.current.contains(event.target)){
      editOverlay.current.classList.add("hidden")
      editOverlay.current.classList.remove("flex-center")
    }
  }
  let patchMutation=useMutation({
    mutationFn:async({newData,itemId})=>{
      return apiRequests.patch(`/users/${itemId}`,{
        ...newData
      })

    },
    onSuccess:(res)=>{
      console.log("user role edited successfully",res.data);
      Swal.fire({
        title: "تغییرات شما با موفقیت ثبت شد",
        icon: "success",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
      refetch()
    },
    onError:(err)=>{
      console.log("an error occured when changing user role",err);
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
  let changeUserRole=(id)=>{
    setItemId(id)
    editOverlay.current.classList.add("flex-center")
    editOverlay.current.classList.remove("hidden")
  }

  // show user info

  let showUserInfo=(id)=>{
    let userInfo=mainData.filter(item=>item.id===id)
    console.log(userInfo);
    setUserInfos(userInfo)
    showOverlay.current.classList.add("flex-center")
    showOverlay.current.classList.remove("hidden")
  }
  let closeShowOverlay=(event)=>{
    if(!showOverlayContent.current.contains(event.target)){
      showOverlay.current.classList.add("hidden")
      showOverlay.current.classList.remove("flex-center")
    }
  }

  // delete user

  let deleteMutation=useMutation({
    mutationFn:async(id)=>{
      return apiRequests.delete(`/users/${id}`)
    },
    onSuccess:(res,id)=>{
      console.log("user info deleted successfully",res.status);
            Swal.fire({
              title: "کاربر شما با موفقیت حذف شد",
              icon: "success",
              showConfirmButton:false,
              timer:1500,
              customClass:{
                title:"text-xl",
                icon:"text-sm"
              }
            });
            refetch()
            if(authcontext.userInfos.id===id){
              console.log("deleted user is the logged in user");
              authcontext.logout()
            }
    },
    onError:(err)=>{
      console.log("an error occured when deleting user info",err);
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
  let deleteUserInfo=(id)=>{
        Swal.fire({
          title: "آیا از حذف این کاربر اطمینان دارید؟",
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
  return (
    <section className="cmsUsers mt-8 h-full">
      <h2 className="text-3xl font-MorabbaMedium">کاربران</h2>
      <div className="mt-4 mb-8 rounded-lg bg-white p-5 border border-gray-300">
      {mainData.length>0?(
        <table className='w-full border-separate border-spacing-y-3'>
          <thead className=''>
          <tr className='bg-orange-300 text-white px-2 '>
            <th>اسم</th>
            <th>تلفن</th>
            <th>سمت</th>
            <th>عملیات</th>
          </tr>
          </thead>
          
            <tbody className='w-full '>
            {mainData?.map(item=>(
            <tr className='child:text-center child:text-xs child:md:text-base text-center  h-10' key={item.id}>
              <td>{item.username}</td>
              <td>{item.phonenumber}</td>
              <td>{item.role}</td>
              <td className=' flex flex-col xs:flex-row justify-around gap-y-1 gap-x-1'>
                <button onClick={()=>changeUserRole(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-[90px] text-white  rounded-lg'>تغییر سمت</button>
                <button onClick={()=>showUserInfo(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>جزییات </button>
                <button onClick={()=>deleteUserInfo(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>حذف</button>
              </td>

            </tr>
          ))}
          </tbody>
          </table>
        ):(
        <div className="flex-center">
        <h2 className="text-3xl font-MorabbaMedium text-center">هیچ کاربری وجود ندارد</h2>
        </div>
        )}
         
         
      </div>
      <div ref={editOverlay} onClick={(event)=>closeEditOverlay(event)} className=" overlay hidden  fixed inset-0 bg-black/40 z-[15]">
      <div ref={overlayContent} className="bg-white w-[350px] p-5 flex flex-col gap-y-3 rounded-lg">
        <h2 className='font-MorabbaMedium text-2xl text-center'>اطلاعات جدید را وارد نمایید</h2>
        
        <div className=' rounded-lg overflow-hidden'>
          <select   value={userRole} onChange={(event)=>setUserRole(event.target.value)} className='bg-gray-100 h-10 w-full px-2 outline-none' name="" id="">
            <option value="costumer">costumer</option>
            <option value="admin">admin</option>
          </select>
        </div>
        
        <div className='w-full'>
          <button onClick={editedData} className="w-full text-white bg-orange-300 rounded-lg h-10">
            ثبت اطلاعات
          </button>
        </div>
      </div>
      </div>
      <div ref={showOverlay} onClick={(event)=>closeShowOverlay(event)} className=" hidden fixed inset-0 bg-black/40 z-[15]">
      <div ref={showOverlayContent} className="bg-white w-[350px] p-5 rounded-lg ">
      {userInfos?.map(item=>(
        <div className='child:border-b child:border-gray-300 flex flex-col gap-y-3 child:w-full' key={item.id}>
      {item.username&&<p>{item?.username}</p>}
      {item.phonenumber&&<p>{item?.phonenumber}</p>}
      {item.codeMelli&&<p>{item?.codeMelli}</p>}
      {item.postCode&&<p>{item?.postCode}</p>}
      {item.email&&<p>{item?.email}</p>}
      {item.role&&<p>{item?.role}</p>}
      {item.province&&<p>{item?.province}</p>}
      {item.town&&<p>{item?.town}</p>}
      {item.address&&<p>{item?.address}</p>}
        </div>
      ))}
      </div>
      </div>
    </section>
  )
}
