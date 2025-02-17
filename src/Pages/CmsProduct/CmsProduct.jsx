import React, { useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useMutation } from '@tanstack/react-query';
import apiRequests from '../../services/axios/Configs/configs';
import Swal from 'sweetalert2';
export default function CmsProduct() {
  let [mainData,isLoading,refetch]=useFetch("/products")
  let [nameState,setNameState]=useState("")
  let [brandState,setBrandState]=useState("")
  let [priceState,setPriceState]=useState()
  let [categoryState,setCategoryState]=useState("دانه قهوه")
  let [caffeineState,setCaffeineState]=useState("")
  let [countState,setCountState]=useState()
  let [discountState,setDiscountState]=useState(0)
  let [srcState,setSrcState]=useState()
  let [editNameState,setEditNameState]=useState()
  let [editBrandState,setEditBrandState]=useState()
  let [editCaffeineState,setEditCaffeineState]=useState()
  let [editCountState,setEditCountState]=useState()
  let [editPriceState,setEditPriceState]=useState()
  let [editOffState,setEditOffState]=useState()
  let [editSrcState,setEditSrcState]=useState()
  let [editCategoryState,setEditCategoryState]=useState()
  let [itemId,setItemId]=useState()
  let editOverlay=useRef()
  let overlayContent=useRef()
  // add new produc section
  let newProduct={
    id:mainData.length+1,
    name:nameState.trim(),
    brand:brandState.trim(),
    price:+priceState,
    category:categoryState,
    caffeineLevel:caffeineState,
    count:+countState,
    off:+discountState,
    src:srcState,
    sales:0,
    popularity:0,
    reviews:0,
    ordercount:0,
    comments:[]
  }
  let postMutation=useMutation({
    mutationFn:async(newProduct)=>{
      return apiRequests.post("/products",{
        ...newProduct
      })
    },
    onSuccess:(res)=>{
      console.log("successfully added new product",res);
      Swal.fire({
        title: "محصول شما با موفقیت اضافه شد",
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
      console.log("an error occured when adding new product",err);
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
  let addNewProduct=(event)=>{
    event.preventDefault()
    if(newProduct.name&&newProduct.brand&&newProduct.price&&newProduct.category&&newProduct.count&&newProduct.off!=="undefined"&&newProduct.src){
      postMutation.mutate(newProduct)
      setNameState("")
      setBrandState("")
      setPriceState("")
      setCategoryState("دانه قهوه")
      setCaffeineState("")
      setCountState("")
      setDiscountState(0)
      setSrcState("")
    }
  }
  // edit product section
  let patchMutation=useMutation({
    mutationFn:async({newData,itemId})=>{
      return apiRequests.patch(`/products/${itemId}`,{
        ...newData
      })
    },
    onSuccess:(res)=>{
      console.log("successfully edited product infos",res.data);
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
      console.log("an error occured when editing product infos",err);
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
  let editProduct=(id)=>{
    let mainProduct=mainData.find(item=>item.id===id)
    console.log(mainProduct);
    let {name,brand,category,caffeineLevel,count,price,off,src}=mainProduct
    console.log(price);
    setEditNameState(name)
    setEditBrandState(brand)
    setEditCategoryState(category)
    setEditCaffeineState(caffeineLevel)
    setEditCountState(count)
    setEditPriceState(price)
    setEditOffState(off)
    setEditSrcState(src)
    setItemId(id)
    editOverlay.current.classList.remove("hidden")
    editOverlay.current.classList.add("flex-center")
  }
  let editedData=()=>{
    let newData={
      name:editNameState,
      brand:editBrandState,
      category:editCategoryState,
      caffeineLevel:editCaffeineState,
      count:+editCountState,
      price:+editPriceState,
      off:+editOffState,
      src:editSrcState
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
       return apiRequests.delete(`/products/${id}`)
    },
    onSuccess:(res)=>{
      console.log("successfully deleted product",res.data);
      Swal.fire({
        title: "محصول شما با موفقیت حذف شد",
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
      console.log("an error occured when deleting product",err);
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
      <h2 className='font-MorabbaMedium text-3xl'>افزودن محصول جدید</h2>
      <div className="mt-4 mb-8 rounded-lg bg-white p-5 border border-gray-300">
        <form action="">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none px-2' value={nameState} onChange={(event)=>setNameState(event.target.value)} type="text" placeholder='اسم محصول' required/>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none px-2' value={brandState} onChange={(event)=>{setBrandState(event.target.value)}} type="text" placeholder='برند محصول' required/>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none px-2' value={priceState} onChange={(event)=>{setPriceState(event.target.value)}} type="number" placeholder='قیمت محصول' required/>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <select  onChange={(event)=>setCategoryState(event.target.value)} value={categoryState} className='bg-gray-100 h-10 w-full px-2 outline-none' name="دسته بندی" id="">
            <option value="دانه قهوه">دانه قهوه</option>
            <option value="کپسول قهوه">کپسول قهوه</option>
            <option value="قهوه ساز">قهوه ساز</option>
          </select>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <select  disabled={categoryState==="قهوه ساز"} value={categoryState==="قهوه ساز"?"":caffeineState} onChange={(event)=>setCaffeineState(event.target.value)} className='bg-gray-100 h-10 w-full px-2 outline-none' name="" id="">
          <option value="">...</option>
            <option value="کم">کم</option>
            <option value="متوسط">متوسط</option>
            <option value="بالا">بالا</option>
          </select>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none px-2' value={countState} onChange={(event)=>{setCountState(event.target.value)}} type="number" placeholder='تعداد محصول' required/>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none px-2' type="number" value={discountState} onChange={(event)=>setDiscountState(event.target.value)} placeholder='تخفیف محصول' required/>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <input className='block w-full bg-gray-100 text-zinc-700 h-10 outline-none px-2' value={srcState} onChange={(event)=>{setSrcState(event.target.value)}} type="text" placeholder='آدرس عکس محصول' required/>
        </div>
        </div>
        <div className='flex justify-end mt-4'>
        <button onClick={(event)=>addNewProduct(event)} className='w-30 rounded-lg bg-orange-300 text-white p-2'>ثبت محصول</button>
        </div>
        </form>
      </div>

      <div className="rounded-lg bg-white p-5 border border-gray-300">
      <table className='w-full'>
        <thead >
          <tr className='bg-orange-300 w-full text-white p-2 h-10 flex items-center child:justify-center child:flex child:flex-1'>
          <th>عکس</th>
          <th>اسم</th>
          <th>قیمت</th>
          <th>موجودی</th>
          <th>عملیات</th>
          </tr>
        </thead>
        <tbody className='w-full '>
          {mainData.length>0?(
            mainData?.map(item=>(
              <tr className='p-2 flex items-center child:flex child:flex-1 child:justify-center child:items-center child:text-xs child:sm:text-base' key={item.id}>
              <td className='w-auto'>
                <img className='w-full  block' src={import.meta.env.BASE_URL+item.src} alt="" />
              </td>
              <td>
                <div className='line-clamp-1 xs:line-clamp-2 md:line-clamp-0 '>
                {item.name}
                </div>
              </td>
              <td>{item.price}</td>
              <td>{item.count}</td>
              <td className='flex-col xs:flex-row gap-x-3 gap-y-1'>
                <button onClick={()=>editProduct(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>ویرایش </button>
                <button onClick={()=>deleteProduct(item.id)} className='p-2 bg-orange-300 w-[50px] sm:w-20 text-white  rounded-lg'>حذف</button>
              </td>
            </tr>
            ))
          ):(
            <div className="flex-center my-10">
              <h2 className="text-3xl font-MorabbaMedium">هیچ محصولی وجود ندارد!</h2>
            </div>
          )}
          
          
        </tbody>
      </table>
      </div>

      <div ref={editOverlay} onClick={(event)=>closeEditOverlay(event)} className=" overlay hidden  fixed inset-0 bg-black/40 z-[15]">
      <div ref={overlayContent} className="bg-white w-[350px] p-5 flex flex-col gap-y-2 rounded-lg">
        <h2 className='font-MorabbaMedium text-2xl text-center'>اطلاعات جدید را وارد نمایید</h2>
        <div className='rounded-lg overflow-hidden '>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editNameState} onChange={(event)=>setEditNameState(event.target.value)} type="text" placeholder='اسم محصول' />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editBrandState} onChange={(event)=>setEditBrandState(event.target.value)} type="text" placeholder='برند محصول' />
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <select  onChange={(event)=>setEditCategoryState(event.target.value)} value={editCategoryState} className='bg-gray-100 h-10 w-full px-2 outline-none' name="دسته بندی" id="">
            <option value="دانه قهوه">دانه قهوه</option>
            <option value="کپسول قهوه">کپسول قهوه</option>
            <option value="قهوه ساز">قهوه ساز</option>
          </select>
        </div>
        <div className=' rounded-lg overflow-hidden'>
          <select  disabled={editCategoryState==="قهوه ساز"} value={editCategoryState==="قهوه ساز"?"":editCaffeineState} onChange={(event)=>setEditCaffeineState(event.target.value)} className='bg-gray-100 h-10 w-full px-2 outline-none' name="" id="">
          <option value="">...</option>
            <option value="کم">کم</option>
            <option value="متوسط">متوسط</option>
            <option value="بالا">بالا</option>
          </select>
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editPriceState} onChange={(event)=>setEditPriceState(event.target.value)} type="number" placeholder='قیمت محصول' />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editCountState} onChange={(event)=>setEditCountState(event.target.value)} type="number" placeholder='تعداد محصول' />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editOffState} onChange={(event)=>setEditOffState(event.target.value)} type="number" placeholder='تخفیف محصول' />
        </div>
        <div className='rounded-lg overflow-hidden'>
          <input className='bg-gray-100 block w-full px-2 h-10 text-zinc-700 outline-none' value={editSrcState} onChange={(event)=>setEditSrcState(event.target.value)} type="text" placeholder='آدرس عکس محصول' />
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
