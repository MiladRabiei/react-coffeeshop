import React,{useCallback, useEffect,useRef,useState,} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Input from '../../Components/form/Input';
import useForm from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { requiredValidator,minValidator,maxValidator,emailValidator } from '../../validators/rules';
export default function ContactUs() {
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);
    const swiperRef = useRef(null);
    let location=useLocation()
    let [isContactPage,setIsContactPage]=useState(location.pathname.includes("/contact-us"))
    let [userInput,setUserInput]=useState()
    let [numberInput,setNumberInput]=useState()
    let [emailInput,setEmailInput]=useState()
    let [textInput,setTextInput]=useState()
    useEffect(() => {
      if (swiperRef.current) {
        const swiper = swiperRef.current.swiper;
        if (nextButtonRef.current && prevButtonRef.current) {
          swiper.params.navigation.nextEl = nextButtonRef.current;
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }
      }
    }, []);
      let[formContactState,contactInputHandler]=useForm({
        username:{value:"",isValid:false},
        email:{value:"",isValid:false},
        phonenumber:{value:"",isValid:false},
        textArea:{value:"",isValid:false}
      },false)
      const formData = {
        name:formContactState.inputs.username?.value ,
        email:formContactState.inputs.email?.value,
        number:formContactState.inputs.phonenumber?.value,
        message:formContactState.inputs.textArea?.value ,
      }
    console.log(formData);
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, access_key: "70bdf1f9-39cb-4b40-b2d4-974750f37b17" }),
        });
    
        const result = await response.json();
        if (result.success) {
          // setFormData({ name: "", email: "",number:'', message: "" });
          setUserInput("")
          setNumberInput("")
          setEmailInput("")
          setTextInput("")
        }
        
      };
      let showSuccess=useCallback(()=>{
        Swal.fire({
                      title: "ایمیل شما با موفقیت ارسال شد",
                      icon: "success",
                      showConfirmButton:false,
                      timer:1500,
                      customClass:{
                        title:"text-xl",
                        icon:"text-sm"
                      }
                    });
      },[])
  return (
    <main>

    
    <section className=" Home bg-Mobile h-[200px] xs:h-auto xs:aspect-[2/1] md:aspect-auto bg-no-repeat bg-cover bg-[center_top] md:bg-Desktop md:h-[500px] " >
      
    </section>
    <div className="container relative w-full ">
    <section className="contactForm w-full h-full lg:flex gap-x-5 mb-4">
    <div className='w-full h-[280px] lg:w-3/4 relative'>
    <div className="w-full  absolute -top-[50px] sm:-top-[100px]">
    <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={14}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 14
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20
            },
          }}
          navigation={false}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}

          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
         
            <SwiperSlide>
            <div className='w-auto h-[100px] sm:h-[200px] rounded-lg bg-white  flex-center gap-y-2'>
              <div>
                <h2 className='text-center'>پشتیبانی وب سایت</h2>
                <p>شماره تماس : 09389302177</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='w-auto h-[100px] sm:h-[200px] rounded-lg bg-white  flex-center gap-y-2'>
              <div>
                <h2 className='text-center'>درخواست نمایندگی</h2>
                <p className='text-base'>شماره تماس : 09389302177</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='w-auto h-[100px] sm:h-[200px] rounded-lg   bg-white  flex-center gap-y-2'>
              <div>
                <h2 className='text-center'>فروش هورکا</h2>
                <p>شماره تماس : 09389302177</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='w-auto h-[100px] sm:h-[200px] rounded-lg bg-white  flex-center gap-y-2'>
              <div>
                <h2 className='text-center'>فروش سازمانی</h2>
                <p>شماره تماس : 09389302177</p>

              </div>
            </div>
          </SwiperSlide>
          
          
          
    </Swiper>
    <div className='flex-center my-5 gap-x-3 md:gap-x-[18px]'>
              <span ref={nextButtonRef} className=' flex-center w-9 h-9 md:w-10 md:h-10 hover:bg-gray-300 dark:hover:bg-white dark:hover:text-zinc-700 text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-full transition-all cursor-pointer'>
                <svg className='w-5 h-5 md:w-[26px] md:h-[26px]'>
                  <use href='#arrow-mini-right'></use>
                </svg>
              </span>
              <span ref={prevButtonRef} className=' flex-center w-9 h-9 md:w-10 md:h-10 hover:bg-gray-300 dark:hover:bg-white dark:hover:text-zinc-700 text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-full transition-all cursor-pointer'>
                <svg className='w-5 h-5 md:w-[26px] md:h-[26px]'>
                  <use href='#arrow-mini-left'></use>
                </svg>
              </span>
    </div>
    </div>
    
    </div>
    <div className='w-full lg:h-[320px]  lg:w-1/4 overflow-y-visible  relative'>
    <div className="w-full  p-5 bg-white  rounded-lg lg:absolute lg:-top-[210px]">
    <h2 className="font-MorabbaMedium text-2xl m-auto text-center my-4 ">فرم تماس با ما</h2>
    <form  onSubmit={handleSubmit} method="POST">
    <input type="hidden" name="access_key" value="70bdf1f9-39cb-4b40-b2d4-974750f37b17"/>
      <div className=" font-Dana text-sm grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1  w-full gap-x-3 gap-y-3 child:flex child:flex-col child:flex-1 child:gap-y-1 ">
      <div className='flex flex-col'>
                  <label htmlFor="username">  نام و نام خانوادگی<span className='text-red-500'>*</span></label>
                  <Input
                  elem="input"
                  id="username"
                  placeholder="نام و نام خانوادگی"
                  className='w-full border-2 rounded-lg bg-white h-10 pr-2 text-zinc-700 outline-none'
                  type="text"
                  pathname={isContactPage}
                  value={userInput}
                  onInputHandler={contactInputHandler}
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
                  placeholder="شماره تماس"
                  className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
                  type="number"
                  onInputHandler={contactInputHandler}
                  pathname={isContactPage}
                  value={numberInput}
                  validations={[
                    requiredValidator(),
                    minValidator(11),
                    maxValidator(12),
                  ]}
                  />
      </div> 
      <div className="flex flex-col">
                  <label className='block' htmlFor="email"> آدرس ایمیل<span className='text-red-500'>*</span></label>
                  <Input
                  elem="input"
                  id="email"
                  placeholder="آدرس ایمیل"
                  className='w-full border-2 rounded-lg bg-white h-10 pr-2  outline-none'
                  type="email"
                  pathname={isContactPage}
                  value={emailInput}
                  onInputHandler={contactInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(11),
                    maxValidator(30),
                    emailValidator()
                  ]}
                  />
      </div>
      
      </div> 
      <div className="flex flex-col">
                  <label className='block' htmlFor="email"> متن پیام<span className='text-red-500'>*</span></label>
                  <Input
                  elem="textarea"
                  id="textArea"
                  placeholder="متن پیام"
                  className='w-full border-2 rounded-lg bg-white h-30 p-2  outline-none'
                  type="text"
                  value={textInput}
                  pathname={isContactPage}
                  onInputHandler={contactInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(11),
                    maxValidator(200),
                    
                  ]}
                  />
      </div>
      <div className="flex mt-4 gap-x-3">
      <button onClick={showSuccess} type='submit' disabled={!formContactState.isFormValid} className={`w-30 p-2 rounded-lg ${formContactState.isFormValid?"bg-orange-300 hover:bg-orange-400 rounded-lg":"bg-gray-400 rounded-lg"}`}>ارسال</button>
      </div>
                  
    </form>
    </div>
    </div>
    </section>
    <section className="address flex flex-col lg:flex-row gap-y-5 my-10">
      <div className="p-5 bg-white dark:bg-zinc-700 dark:text-white rounded-lg border-gray-300 w-full  h-[500px] lg:w-[80%] order-2 lg:order-1">
        <h2 className='text-2xl font-MorabbaMedium'>اطلاعات تماس کافی کلاب</h2>
        <div className="flex items-center h-full">
        <div className=' space-y-20'>
        <span className='flex gap-x-3 xs:text-xl'>
          <svg className='w-5 h-5'>
            <use href="#phone"></use>
          </svg>
          09389302177
        </span>
        <span className='flex gap-x-3 xs:text-xl'>
          <svg className='w-5 h-5'>
            <use href="#envelope"></use>
          </svg>
          rabiei.milad32@gmail.com
        </span>
        <span className='flex gap-x-3 xs:text-xl'>
          <svg className='w-5 h-5'>
            <use href="#map"></use>
          </svg>
          تهران، بلوار میرداماد، خیابان البرز، کوچه قبادیان شرقی، پلاک ۳۳
        </span>
        <span className='flex gap-x-3 xs:text-xl'>
          <svg className='w-5 h-5'>
            <use href="#clock"></use>
          </svg>
          شنبه تا چهارشنبه از ساعت 8:00 - 16:30
        </span>
        </div>
        </div>
      </div>
      <div className='flex order-1 lg:order-2 mt-[25px]'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21765.858730729487!2d50.90504257976701!3d35.81185640287765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snl!4v1741010868648!5m2!1sen!2snl" className='w-full h-[450px] rounded-lg lg:w-[600px]  lg:absolute lg:left-10' allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
    </div>
  </main>
  )
}
