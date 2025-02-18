import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { minValidator,maxValidator,emailValidator,requiredValidator } from '../../validators/rules'
import Input from '../../Components/form/Input'
import useForm from '../../hooks/useForm'
import apiRequests from '../../services/axios/Configs/configs'
export default function Settings() {
    let[formSettingsState,settingsInputHandler]=useForm({
      username:{value:"",isValid:false},
      email:{value:"",isValid:false},
      phonenumber:{value:"",isValid:false},
      codeMelli:{value:"",isValid:false},
    },false)

  let authcontext=useContext(AuthContext)
  if(authcontext.isLoading){
    return "loading..."
  }
  let editInformation=async ()=>{
    const newInfos={
      username:formSettingsState.inputs.username.value.trim(),
      email:formSettingsState.inputs.email.value.trim(),
      phonenumber:formSettingsState.inputs.phonenumber.value.trim(),
      codeMelli:formSettingsState.inputs.codeMelli.value,
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
    <section className="settings">
      
              <h2 className='mt-8 font-MorabbaMedium text-3xl'>اطلاعات</h2>
              <div className='mt-4 mb-8 bg-white  rounded-lg p-5 border border-gray-300 '>
              <div className=" font-Dana text-sm grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3  w-full  mt-8 gap-x-3 gap-y-3 child:flex child:flex-col child:flex-1 child:gap-y-1 ">
                    <div className='flex flex-col'>
                    <label htmlFor="username">  نام و نام خانوادگی<span className='text-red-500'>*</span></label>
                    <Input
                    elem="input"
                    value={authcontext.userInfos.username}
                    id="username"
                    placeholder="نام و نام خانوادگی"
                    className='w-full border-2 rounded-lg bg-white h-10 pr-2 text-zinc-700 outline-none'
                    type="text"
                    onInputHandler={settingsInputHandler}
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
                    onInputHandler={settingsInputHandler}
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
                    onInputHandler={settingsInputHandler}
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
                    onInputHandler={settingsInputHandler}
                    validations={[
                      requiredValidator(),
                      minValidator(11),
                      maxValidator(30),
                      emailValidator()
                    ]}
                    />
                    </div>
                    
              </div>
              
              <div className="flex mt-4 gap-x-3">
                <button onClick={editInformation}  disabled={!formSettingsState.isFormValid} className={`w-30 p-2 rounded-lg ${formSettingsState.isFormValid?"bg-orange-300 hover:bg-orange-400 rounded-lg":"bg-gray-400 rounded-lg"}`}>ثبت اطلاعات</button>
              </div>
              </div>
    </section>
  )
}
