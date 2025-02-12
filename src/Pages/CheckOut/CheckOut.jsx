import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import Input from '../../Components/form/Input'
import useForm from '../../hooks/useForm'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../validators/rules'
import apiRequests from '../../services/axios/Configs/configs'

export default function CheckOut() {
 
  let[formCheckoutState,checkoutInputHandler]=useForm({
    username:{value:"",isValid:false},
    email:{value:"",isValid:false},
    phonenumber:{value:"",isValid:false},
    codeMelli:{value:"",isValid:false},
    postCode:{value:"",isValid:false},
    province:{value:"",isValid:false},
    town:{value:"",isValid:false},
    address:{value:"",isValid:false}
  },false)
  console.log(formCheckoutState);

  let authcontext = useContext(AuthContext)
  if(authcontext.isLoading){
    return "loading..."
  }

  let cancelShopping = async (ID) => {
    let orders = authcontext.userInfos.orders.map(item => {
      if (item.id === ID && item.status !== "cancel") {
        return { ...item, status: "cancel" }
      }
      return item
    })
    try {
      const response = await apiRequests.patch(`/users/${authcontext.userInfos.id}`, {
        orders
      });

      const data =await response.data
      console.log("Orders updated successfully:", data);
      authcontext.setUserInfos(data)
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  }
  let editInformation=async ()=>{
    const newInfos={
      username:formCheckoutState.inputs.username.value.trim(),
      email:formCheckoutState.inputs.email.value.trim(),
      phonenumber:formCheckoutState.inputs.phonenumber.value.trim(),
      codeMelli:formCheckoutState.inputs.codeMelli.value,
      postCode:formCheckoutState.inputs.postCode.value,
      province:formCheckoutState.inputs.province.value.trim(),
      town:formCheckoutState.inputs.town.value.trim(),
      address:formCheckoutState.inputs.address.value.trim()
    }
    let updatedInfos={...authcontext.userInfos,...newInfos}
    console.log(updatedInfos);
    try{
      const response=await apiRequests.patch(`/users/${authcontext.userInfos.id}`,{
        ...updatedInfos
      })

      const data=await response.data
      console.log("userinfos updated successfully",data);
      authcontext.setUserInfos(prevState=>({...prevState,...data}))
    }catch(err){
      console.log("error updating user infos",err);
    }
  }

  return (
    <section className='mt-8 md:mt-40 text-zinc-700 dark:text-white'>
      <div className="container">
      {authcontext.userInfos.orders && authcontext.userInfos.orders.some(item => item.status === "waiting") ? (
        <>
        <h2 className='mt-8 font-MorabbaMedium text-3xl'>محصولات</h2>
        <div className='mt-4 bg-white dark:bg-zinc-700 rounded-lg p-5 border border-gray-300 dark:border-white/10 '>

            <>
            {authcontext.userInfos.orders.map(item =>
              item.status === "waiting" ? (
                <div key={item.id} className="pb-1 child:py-5 divide-y">
                  <div className="flex items-center sm:text-center gap-x-2.5">
                    <img src={import.meta.env.BASE_URL + item.src} alt="product" className="w-30 h-30" />
                    <div className="flex flex-col gap-y-2 sm:flex-row sm:items-center justify-between w-full">
                      <Link
                        to={`/product-info/${item.id}`}
                        className="block font-DanaMedium text-zinc-700 dark:text-white text-base  w-auto sm:w-50 line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <svg className="w-7 h-7 text-red-500 cursor-pointer" onClick={() => cancelShopping(item.id)}>
                        <use href="#trash"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              ) : null
            )}
            
            </>
           

        </div>

        <h2 className='mt-8 font-MorabbaMedium text-3xl'>اطلاعات</h2>
        <div className='mt-4 mb-8 bg-white dark:bg-zinc-700 rounded-lg p-5 border border-gray-300 dark:border-white/10 '>
        <div className=" font-Dana text-sm grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3  w-full mt-8 gap-x-3 gap-y-3 child:flex child:flex-col child:flex-1 child:gap-y-1 ">
              <div className='flex flex-col'>
              <label htmlFor="username">  نام و نام خانوادگی<span className='text-red-500'>*</span></label>
              <Input
              elem="input"
              value={authcontext.userInfos.username}
              id="username"
              placeholder="نام و نام خانوادگی"
              className='w-full border-2 rounded-lg bg-white h-10 pr-2 text-zinc-700 outline-none'
              type="text"
              onInputHandler={checkoutInputHandler}
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(20),
              ]}
              />
              </div>
              <div className="flex flex-col">
              <label className='block' htmlFor="number"> شماره تماس<span className='text-red-500'>*</span></label>
              <Input
              elem="input"
              id="phonenumber"
              value={authcontext.userInfos.phonenumber}
              placeholder="شماره تماس"
              className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
              type="number"
              onInputHandler={checkoutInputHandler}
              validations={[
                requiredValidator(),
                minValidator(11),
                maxValidator(12),
              ]}
              />
              </div> 
              <div className="flex flex-col">
              <label className='block' htmlFor="number"> کد ملی<span className='text-red-500'>*</span></label>
              <Input
              elem="input"
              value={authcontext.userInfos.codeMelli}
              id="codeMelli"
              placeholder="کد ملی"
              className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
              type="number"
              onInputHandler={checkoutInputHandler}
              validations={[
                requiredValidator(),
                minValidator(7),
                maxValidator(11),
              ]}
              />
              </div>
              <div className="flex flex-col">
              <label className='block' htmlFor="email"> آدرس ایمیل<span className='text-red-500'>*</span></label>
              <Input
              elem="input"
              id="email"
              value={authcontext.userInfos.email}
              placeholder="آدرس ایمیل"
              className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
              type="email"
              onInputHandler={checkoutInputHandler}
              validations={[
                requiredValidator(),
                minValidator(11),
                maxValidator(30),
                emailValidator()
              ]}
              />
              </div>
              <div className="flex flex-col">
              <label className='block' htmlFor="province">استان <span className='text-red-500'>*</span></label>
              <Input
              elem="input"
              id="province"
              value={authcontext.userInfos.province}
              placeholder="استان"
              className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
              type="text"
              onInputHandler={checkoutInputHandler}
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
              onInputHandler={checkoutInputHandler}
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
              onInputHandler={checkoutInputHandler}
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
              onInputHandler={checkoutInputHandler}
              validations={[
                requiredValidator(),
                minValidator(20)
              ]}
              />
        </div>
        <div className="flex mt-4 gap-x-3">
          <button onClick={editInformation}  disabled={!formCheckoutState.isFormValid} className={`w-30 p-2 rounded-lg ${formCheckoutState.isFormValid?"bg-orange-300 hover:bg-orange-400 rounded-lg":"bg-gray-400 rounded-lg"}`}>ثبت اطلاعات</button>
          <button  disabled={!formCheckoutState.isFormValid} className={`w-30 p-2 rounded-lg ${formCheckoutState.isFormValid?"bg-orange-300 hover:bg-orange-400 rounded-lg":"bg-gray-400 rounded-lg"}`}>پرداخت</button>
        </div>
        </div>
        </>
        ): (
          <Navigate to="/store" />
        )}
      </div>
    </section>
  )
}
