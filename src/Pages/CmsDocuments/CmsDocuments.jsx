import React, { useContext } from 'react'
import { useState,useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import AuthContext from '../../Context/AuthContext';
import apiRequests from '../../services/axios/Configs/configs'
import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import Editor from '../../Components/form/Editor'
import moment from 'jalali-moment'

export default function CmsDocuments() {
  let [mainData,isLoading,refetch]=useFetch("/articles")
  let [articleTitleState,setArticleTitleState]=useState("")
  let [articleBody,setArticleBody]=useState("hello world")
  let [articleDesState,setArticleDesState]=useState("")
  let [srcState,setSrcState]=useState()
  let [editTitleState,setEditTitleState]=useState()
  let [editBodyState,setEditBodyState]=useState()
  let [editDescriptionState,setEditDescriptionState]=useState()
  let [editAuthorState,setEditAuthorState]=useState()
  let [editSrcState,setEditSrcState]=useState()
  let [editDate,setEditDate]=useState()
  let [itemId,setItemId]=useState()
  const jalaliTextDate = moment().locale("fa").format("jD jMMMM jYYYY");
  let editOverlay=useRef()
  let overlayContent=useRef()
  let authContext=useContext(AuthContext)
  
  // add new article section
    let newArticle={
    id:crypto.randomUUID().slice(-3) + Date.now().toString().slice(-3),
    title:articleTitleState.trim(),
    description:articleDesState.trim(),
    body:articleBody.trim(),
    author:authContext.userInfos.username,
    date:jalaliTextDate.trim(),
    miladiDate:moment().format("YYYY-MM-DD"),
    src:srcState,
    reviews:0,
  }
  let postMutation=useMutation({
    mutationFn:async(newArticle)=>{
      return apiRequests.post("/articles",{
        ...newArticle
      })
    },
    onSuccess:(res)=>{
      console.log("successfully added new Article",res);
      Swal.fire({
        title: "مقاله شما با موفقیت اضافه شد",
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
      console.log("an error occured when adding new article",err);
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
  let addNewArticle=(event)=>{
    event.preventDefault()

    if(newArticle.title&&newArticle.src&&newArticle.description&&newArticle.body){
      postMutation.mutate(newArticle)
      setArticleTitleState("")
      setArticleDesState("")
      setSrcState("")
      setArticleBody("")
    }else{
      Swal.fire({
        title: "اطلاعات ورودی اشتباه است!",
        icon: "error",
        showConfirmButton:false,
        timer:1500,
        customClass:{
          title:"text-xl",
          icon:"text-sm"
        }
      });
    }
  }
  // edit product section
  let patchMutation=useMutation({
    mutationFn:async({newData,itemId})=>{
      return apiRequests.patch(`/articles/${itemId}`,{
        ...newData
      })
    },
    onSuccess:(res)=>{
      console.log("successfully edited article infos",res.data);
      Swal.fire({
        title: "محصول شما با موفقیت آپدیت شد",
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
      console.log("an error occured when editing article infos",err);
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
  let editArticle=(id)=>{
    let mainArticle=mainData.find(item=>item.id===id)
    console.log(mainArticle);
    let {title,description,body,author,src,date}=mainArticle
    setEditTitleState(title)
    setEditDescriptionState(description)
    setEditBodyState(body)
    setEditAuthorState(author)
    setEditSrcState(src)
    setItemId(id)
    setEditDate(date)
    editOverlay.current.classList.remove("hidden")
    editOverlay.current.classList.add("flex-center")
  }
  let editedData=()=>{
    let newData={
      title:editTitleState.trim(),
      description:editDescriptionState.trim(),
      body:editBodyState.trim(),
      author:editAuthorState.trim(),
      src:editSrcState.trim(),
      date:editDate.trim()
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
  // delete product section
  let deleteMutation=useMutation({
    mutationFn:async(id)=>{
       return apiRequests.delete(`/articles/${id}`)
    },
    onSuccess:(res)=>{
      console.log("successfully deleted article",res.data);
      Swal.fire({
        title: "مقاله شما با موفقیت حذف شد",
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
      console.log("an error occured when deleting article",err);
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
  let deleteProduct=(id)=>{
    
    Swal.fire({
      title: "آیا از حذف این محصول اطمینان دارید؟",
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
    <section className="products mt-8 min-h-screen">
      <h2 className='font-MorabbaMedium text-3xl'>افزودن مقاله جدید</h2>
      <div className="mt-4 mb-8 rounded-lg bg-white p-5 border border-gray-300">
        <form action="">
        <div className="grid sm:grid-cols-2 gap-3">
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none px-2' value={articleTitleState} onChange={(event)=>setArticleTitleState(event.target.value)} type="text" placeholder='تیتر مقاله' required/>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none p-2' value={srcState} onChange={(event)=>{setSrcState(event.target.value)}} type="text" placeholder='آدرس عکس مقاله' required/>
        </div>
        </div>
        <div className='my-3 h-30 rounded-lg overflow-hidden'>
          <textarea className='w-full h-full bg-gray-100 px-2 outline-none' value={articleDesState} onChange={event=>setArticleDesState(event.target.value)} placeholder='چکیده' name="" id="">

          </textarea>
          
        </div>
        <div className='my-3'>
        <Editor
        value={articleBody}
        setValue={setArticleBody}
        />
        </div>
        <div className='flex justify-end mt-4'>
        <button onClick={(event)=>addNewArticle(event)} className='w-30 rounded-lg bg-orange-300 text-white p-2'>ثبت مقاله</button>
        </div>
        </form>
      </div>

      <div className="rounded-lg bg-white p-5 border border-gray-300">
      <table className='w-full'>
        <thead >
          <tr className='bg-orange-300 w-full text-white p-2 h-10 flex items-center child:justify-center child:flex child:flex-1'>
          <th>شناسه</th>
          <th>عنوان</th>
          <th>نویسنده</th>
          <th>عملیات</th>
          </tr>
        </thead>
        <tbody className='w-full '>
          {mainData.length>0?(
            mainData?.map((item,index)=>(
              <tr className='p-2 flex items-center child:flex child:flex-1 child:justify-center child:items-center child:text-xs child:sm:text-base' key={item.id||index}>
              <td className='w-auto'>
                {item.id}
              </td>
              <td>
                <div className='line-clamp-1 xs:line-clamp-2 '>
                {item.title}
                </div>
              </td>
              <td>{item.author}</td>
              <td className='flex-col xs:flex-row gap-x-3 gap-y-1'>
                <button onClick={()=>editArticle(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>ویرایش </button>
                <button onClick={()=>deleteProduct(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>حذف</button>
              </td>
            </tr>
            ))
          ):(
            <tr>
              <td>
              <div className="flex-center my-10">
              <h2 className="text-3xl font-MorabbaMedium">هیچ محصولی وجود ندارد!</h2>
            </div>
              </td>
            </tr>
          )}
          
          
        </tbody>
      </table>
      </div>

      <div ref={editOverlay} onClick={(event)=>closeEditOverlay(event)} className=" overlay hidden  fixed inset-0 bg-black/40 z-[15]">
      <div ref={overlayContent} className="bg-white w-[300px] xs:w-[450px] sm:w-[90%] p-5 flex flex-col gap-y-2 rounded-lg">
        <h2 className='font-MorabbaMedium text-2xl text-center'>اطلاعات جدید را وارد نمایید</h2>
        <div className='rounded-lg overflow-hidden '>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editTitleState} onChange={(event)=>setEditTitleState(event.target.value)} type="text" placeholder='عنوان مقالع' />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <textarea className='w-full h-20 bg-gray-100 px-2 outline-none overflow-scroll' value={editDescriptionState} onChange={(event)=>setEditDescriptionState(event.target.value)} type="text" placeholder='چکیده مقاله' />
        </div>
        <div className='rounded-lg h-[200px] overflow-scroll'>
        <Editor
        value={editBodyState}
        setValue={setEditBodyState}
        />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editAuthorState} onChange={(event)=>setEditAuthorState(event.target.value)} type="text" placeholder='نویسنده مقاله' />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editSrcState} onChange={(event)=>setEditSrcState(event.target.value)} type="text" placeholder='آدرس عکس مقاله' />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editDate} onChange={(event)=>setEditDate(event.target.value)} type="text" placeholder='آدرس عکس مقاله' />
        </div>
        <div className='w-full'>
          <button onClick={editedData} className="w-full text-white bg-orange-300 rounded-lg h-10">
            ثبت اطلاعات
          </button>
        </div>
      </div>
      </div>
    </section>
  )
}

