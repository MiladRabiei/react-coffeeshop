import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Input from '../../Components/form/Input'
import { requiredValidator,minValidator,maxValidator,emailValidator } from '../../validators/rules'
import useForm from '../../hooks/useForm'
import Button from '../../Components/form/Button'
import useFetch from '../../hooks/useFetch'
import AuthContext from '../../Context/AuthContext'
import apiRequests from '../../services/axios/Configs/configs'
export default function LoginAndRegister() {

  let navigate=useNavigate()

  let location=useLocation()
  let isRegisterPage=location.pathname==="/Register"

  let authContext=useContext(AuthContext)

  let [showIcon,setShowIcon]=useState(false)
  let [formState,onInputHandler]=useForm({
    username:{value:"",isValid:false},
    password:{value:"",isValid:false}
  },false)

  let [formRegisterState,formInputHandler]=useForm({
    username:{value:"",isValid:false},
    email:{value:"",isValid:false},
    number:{value:"",isValid:false},
    password:{value:"",isValid:false},
  },false)
  let [mainData,setMainData]=useFetch("/users")

console.log(formRegisterState);
  let userLogin=event=>{
    event.preventDefault()
    let userInfo=mainData.filter(item=>{
      if(item.email===formState.inputs.username.value&&item.password===formState.inputs.password.value){
        return item
      }
    })
    console.log(userInfo);
    if(userInfo.length>0){{
      authContext.login(userInfo[0])
      navigate("/Home")
    }
  }
}
  let userRegister=event=>{
    event.preventDefault()
    let newUserInfo={
      id:1,
      username:formRegisterState.inputs.username.value.trim(),
      email:formRegisterState.inputs.email.value.trim(),
      password:formRegisterState.inputs.password.value.trim(),
      phonenumber:formRegisterState.inputs.number.value.trim(),
      role:"costumer",
      orders:[],
      tickets:[],
      favorits:[],
      comments:[]
  }
  let isNonExist=mainData.some(item=>{
    return item.email!==newUserInfo.email
  })
  console.log(newUserInfo);
  if(isNonExist){
    apiRequests.post("/users",{
      ...newUserInfo
    })
    .then(res=>{
      res.data
    })
    .then(result=>{
      console.log(result);
      authContext.login(newUserInfo)
      navigate("/Home")
    })
  }

  }
  return (
    <>
      <section className='login-register relative overflow-hidden  my-8 md:mt-40'>
        <div className="container">
          <div className="flex-center">
            {!isRegisterPage?(
              <div className="flex flex-col items-center bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white rounded-lg border-b-4 border-orange-300 shadow-normal w-[500px] my-8 p-5 z-[9]">
              {/* form-title */}
              <div className='mt-3 text-center'>
                <p className='font-MorabbaMedium text-xl md:text-2xl'>ورود به حساب کاربری</p>
                <p className='font-MorabbaLight text-lg md:text-xl '>خوشحالیم دوباره میبینیمت دوست عزیز :)</p>
              </div>
              
              {/* switch  form */}
              <div className=' flex items-center gap-x-1 my-5'>
                <span className='text-gray-400'>کاربر جدید هستید؟</span>
                <Link to={"/Register"} className='text-white bg-orange-300 hover:bg-orange-400 text-sm rounded-lg py-1 px-2'>
                  ثبت نام
                </Link>
              </div>
              
              {/* form-main */}
              <form action="#" className='w-full flex flex-col gap-y-5'>
                <div className='relative w-full flex items-center text-zinc-700 h-12 '>
                  <Input
                  elem="input"
                  id="username"
                  placeholder='نام کاربری یا آدرس ایمیل'
                  className='w-full border-2 rounded-lg bg-white h-full pr-2  outline-none'
                  type="text"
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(30),
                    emailValidator()
                  ]}
                  
                  />
                  <span className='absolute leading-[48px] pl-2 left-0 '>
                  <svg className='w-5 h-5 '>
                    <use href="#person"></use>
                  </svg>
                  </span>
                </div>
                <div className='relative w-full flex items-center text-zinc-700 h-12 '>
                <Input
                  elem="input"
                  id="password"
                  placeholder='رمز عبور'
                  className='w-full border-2 rounded-lg bg-white h-full pr-2  outline-none'
                  type="password"
                  onchange={setShowIcon}
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(18),
                    
                  ]}
                  
                  />
                  <span className='absolute leading-[48px] pl-2 left-0 ' >
                  <svg className={`w-5 h-5 ${showIcon?"hidden":null}`} >
                    <use href="#lock"></use>
                  </svg>
                  </span>
                </div>
                <Button type="submit" 
                className={`" text-white h-12 rounded-lg" ${formState.isFormValid?"bg-orange-300 hover:bg-orange-400 rounded-lg":"bg-gray-400 rounded-lg"}`}
                 onClick={userLogin} 
                 disabled={!formState.isFormValid}>
                  ورود
                </Button>
              </form>
              <div className='flex flex-col gap-y-2 sm:flex-row sm:items-center justify-between w-full mt-4 text-gray-400 text-sm md:text-base'>
                <div className='flex items-center gap-x-1'>
                  <p>مرا به خاطر داشته باش</p>
                  <input className='' type="checkbox" name="" id="" />
                </div>
                <div>
                <Link  to="#">
                رمز عبور خود را فراموش کرده اید؟
                </Link>
                </div>
              </div>
              {/* form-footer */}
              <div className='text-gray-400 text-sm my-10 w-full'>
                <span>سلام کاربر محترم:</span>
                <ul className='mt-5 flex flex-col gap-y-2'>
                  <li>لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس استفاده کنید.</li>
                  <li>ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.</li>
                  <li>لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.</li>
                </ul>
              </div>
            </div>
            ):(
              <div className="flex flex-col items-center bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white rounded-lg border-b-4 border-orange-300 shadow-normal w-[500px] my-8 p-5 z-[9]">
              {/* form-title */}
              
              <div className=' mt-3 text-center'>
                <p className='font-MorabbaMedium text-xl md:text-2xl'>ساخت حساب کاربری</p>
                <p className='font-MorabbaLight text-lg md:text-xl '>خوشحالیم قراره به جمع ما بپیوندی</p>
              </div>
              {/* switch  form */}
              
              <div className=' flex items-center gap-x-1 my-5'>
                <span className='text-gray-400'>قبلا ثبت‌نام کرده‌اید؟</span>
                <Link to={"/Login"} className='text-white bg-orange-300 hover:bg-orange-400 text-sm rounded-lg py-1 px-2'>
                  ورود
                </Link>
              </div>
              {/* form-main */}
              <form action="#" className='w-full flex flex-col gap-y-5'>
              <div className='relative w-full flex items-center text-zinc-700 h-12 '>
                  <Input
                  elem="input"
                  id="username"
                  placeholder='نام و نام خانوادگی'
                  className='w-full border-2  rounded-lg bg-white h-full pr-2  outline-none'
                  type="text"
                  onInputHandler={formInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(18),
                    
                  ]}
                  />
                  <span className='absolute leading-[48px] pl-2 left-0 '>
                  <svg className='w-5 h-5 '>
                    <use href="#person"></use>
                  </svg>
                  </span>
                </div>
                <div className='relative w-full flex items-center text-zinc-700 h-12 '>
                <Input
                  elem="input"
                  id="email"
                  placeholder='آدرس ایمیل'
                  className='w-full border-2 rounded-lg bg-white h-full pr-2  outline-none'
                  type="text"
                  onInputHandler={formInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(30),
                    emailValidator()
                  ]}
                  />
                  <span className='absolute leading-[48px] pl-2 left-0 '>
                  <svg className='w-5 h-5 '>
                    <use href="#envelope"></use>
                  </svg>
                  </span>
                </div>
                <div className='relative w-full flex items-center text-zinc-700 h-12 '>
                <Input
                  elem="input"
                  placeholder=' شماره تماس'
                  className='w-full border-2 rounded-lg bg-white h-full pr-2  outline-none'
                  type="number"
                  id="number"
                  onInputHandler={formInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(18),
                    
                  ]}
                  />
                  <span className='absolute leading-[48px] pl-2 left-0 '>
                  <svg className='w-5 h-5 '>
                    <use href="#phone"></use>
                  </svg>
                  </span>
                </div>
                <div className='relative w-full flex items-center text-zinc-700 h-12 '>
                <Input
                  elem="input"
                  placeholder='رمز عبور'
                  className='w-full border-2 rounded-lg bg-white h-full pr-2  outline-none'
                  type="text"
                  id="password"
                  onInputHandler={formInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(18),
                    
                  ]}
                  />
                  <span className='absolute leading-[48px] pl-2 left-0 '>
                  <svg className='w-5 h-5 '>
                    <use href="#lock"></use>
                  </svg>
                  </span>
                </div>
                
                
                <Button className={`" text-white h-12 rounded-lg" ${formRegisterState.isFormValid?"bg-orange-300 hover:bg-orange-400 rounded-lg":"bg-gray-400 rounded-lg"}`}
                type="submit"
                disabled={!formRegisterState.isFormValid}
                onClick={userRegister}
                >
                  ثبت نام
                </Button>
              </form>
              
              {/* form-footer */}
              <div className='text-gray-400 text-sm my-10 w-full'>
                <span>سلام کاربر محترم:</span>
                <ul className='mt-5 flex flex-col gap-y-2'>
                  <li>لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس استفاده کنید.</li>
                  <li>ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.</li>
                  <li>لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.</li>
                </ul>
              </div>
            </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
