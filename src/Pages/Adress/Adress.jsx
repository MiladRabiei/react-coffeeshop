import React, { useContext, useState } from 'react'
import AuthContext from '../../Context/AuthContext'
import Input from '../../Components/form/Input'
import { requiredValidator,maxValidator,minValidator } from '../../validators/rules'
import useForm from '../../hooks/useForm'
import apiRequests from '../../services/axios/Configs/configs'
import Swal from 'sweetalert2'
export default function Adress() {
  let authcontext=useContext(AuthContext)
  let [showAddAddress,setShowAddAddress]=useState(true)
  let [showAddData,setShowAddData]=useState(false)
  let [showAddress,setShowAddress]=useState(true)
  let addData=()=>{
    setShowAddData(true)
    setShowAddAddress(false)
  }
  let editAddress=()=>{
    setShowAddData(true)
    setShowAddress(false)
  }
  let[formAddressState,addressInputHandler]=useForm({
      postCode:{value:"",isValid:false},
      province:{value:"",isValid:false},
      town:{value:"",isValid:false},
      address:{value:"",isValid:false}
    },false)

    let editInformation=async ()=>{
      const newInfos={
        postCode:formAddressState.inputs.postCode.value,
        province:formAddressState.inputs.province.value.trim(),
        town:formAddressState.inputs.town.value.trim(),
        address:formAddressState.inputs.address.value.trim()
      }
      let updatedInfos={...authcontext.userInfos,...newInfos}
      console.log(updatedInfos);
      try{
        const response=await apiRequests.patch(`/users/${authcontext.userInfos.id}`,{
          ...updatedInfos
        })
  
        const data=await response.data
        console.log("user address updated successfully",data);
        authcontext.setUserInfos(prevState=>({...prevState,...data}))
        Swal.fire({
                title: "اطلاعات شما با موفقیت ثبت شد",
                icon: "success",
                showConfirmButton:false,
                timer:1500,
                customClass:{
                  title:"text-xl",
                  icon:"text-sm"
                }
              });
        setShowAddData(false)
        setShowAddress(true)
      }catch(err){
        console.log("error adding user address",err);
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
    }
  return (
    <section className="address">
      
              <h2 className='mt-8 font-MorabbaMedium text-3xl'>اطلاعات</h2>
              <div className='mt-4 mb-8 bg-white  rounded-lg p-5 border border-gray-300 '>
              {!authcontext.userInfos?.address?(
                <div onClick={addData} className={`w-full h-[300px] flex-col text-center items-center justify-center cursor-pointer ${showAddAddress?"flex":"hidden"}`}>
                  <h2 className='font-MorabbaMedium text-3xl'>اضافه کردن آدرس</h2>
                  <h2 className='text-5xl'>+</h2>
                </div>
              ):(
                <>
                <div className={`${!showAddress&&"hidden"}`}>
                  <p>{authcontext.userInfos.province}</p>
                  <p>{authcontext.userInfos.town}</p>
                  <p>{authcontext.userInfos.postCode}</p>
                  <p>{authcontext.userInfos.address}</p>
                </div>
                <div onClick={editAddress} className={`flex mt-4 gap-x-3 ${!showAddress&&"hidden"}`}>
                <button   disabled={!formAddressState.isFormValid} className={`w-30 p-2 rounded-lg bg-orange-300 hover:bg-orange-400 text-white`}>تغییر آدرس</button>
                </div>
                </>
              )}
              <div className={`${showAddData?"":"hidden"}`}>
              <div className=" font-Dana text-sm grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  w-full mt-8 gap-x-3 gap-y-3 child:flex child:flex-col child:flex-1 child:gap-y-1 ">
                
                <div className="flex flex-col">
                <label className='block' htmlFor="province">استان <span className='text-red-500'>*</span></label>
                <Input
                elem="input"
                id="province"
                value={authcontext.userInfos.province}
                placeholder="استان"
                className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
                type="text"
                onInputHandler={addressInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(3),
                  maxValidator(15),
                ]}
                />
                </div>
                <div className="flex flex-col">
                <label className='block' htmlFor="town">شهر <span className='text-red-500'>*</span></label>
                <Input
                elem="input"
                id="town"
                value={authcontext.userInfos.town}
                placeholder="شهر"
                className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
                type="text"
                onInputHandler={addressInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(3),
                  maxValidator(15),
                ]}
                />
                </div>
                <div className="flex flex-col">
                <label className='block' htmlFor="postCode">کد پستی <span className='text-red-500'>*</span></label>
                <Input
                elem="input"
                id="postCode"
                value={authcontext.userInfos.postCode}
                placeholder="کد پستی"
                className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
                type="number"
                onInputHandler={addressInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(9),
                  maxValidator(12),
                ]}
                />
                </div>
              </div>
              <div className="flex flex-col text-sm gap-y-1 mt-2">
                <label className='block' htmlFor="address">آدرس تحویل <span className='text-red-500'>*</span></label>
                <Input
                elem="input"
                value={authcontext.userInfos.address}
                id="address"
                placeholder="آدرس"
                className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
                type="text"
                onInputHandler={addressInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(20)
                ]}
                />
              </div>
              <div className="flex mt-4 gap-x-3">
              <button onClick={editInformation}   disabled={!formAddressState.isFormValid} className={`w-30 p-2 rounded-lg ${formAddressState.isFormValid?"bg-orange-300 hover:bg-orange-400 rounded-lg":"bg-gray-400 rounded-lg"}`}>ثبت اطلاعات</button>
              </div>
              </div>

              </div>
    </section>
  )
}
