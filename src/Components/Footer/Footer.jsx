import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer className='relative bg-zinc-700 py-8 md:py-11'>
                <svg className='hidden md:block md:absolute top-0 right-0 left-0 mx-auto text-gray-100 dark:text-zinc-800 w-[100px] h-[22px]'>
                    <use href='#footer-curve'></use>
                </svg>
                <div className="absolute top-0 right-0 left-0 mx-auto -translate-y-2/4 hidden md:flex justify-center items-center w-[30px] h-[30px] border-2 rounded-full border-orange-300">
                    <svg className="w-5 h-5 text-zinc-700 dark:text-white">
                        <use href="#chevron-up-mini"></use>
                    </svg>
                </div>
        <div className=" text-gray-300 sm:w-[94%] lg:w-[90%] mx-auto  px-4 md:px-0 ">
            <div className='flex justify-between flex-wrap'>
                <div>
                    <div className="flex gap-x-5 mb-6 md:mb-4.5 text-gray-300">
                        <svg className='w-[57px] h-[54px]'>
                            <use href="#logo"></use>
                        </svg>
                        <svg className='w-[138px] h-[54px]'>
                            <use href="#logo-type"></use>
                        </svg>

                    </div>
                    <p className='xl:max-w-[606px] text-lg md:text-xl/[48px]'>
                        ما برآنیم تا با پیشرو بودن در فرآیند تولید، نوع و کیفیت محصول، خدمات و توزیع، الگویی برای تولیدکنندگان ایرانی باشیم و به مرجع فرهنگ قهوه در ایران تبدیل شویم. می‌پنداریم که نظر مردم ایران و منطقه باید نسبت به کالای ایرانی بهبود یابد و در این راستا با اشتیاق می‌کوشیم.
                    </p>
                </div>
                <div className='mt-10 md:mt-[26px]'>
                    <h4 className='font-DanaDemiBold text-2xl mb-6 md:mb-7'>دسترسی سریع</h4>
                    <div className='grid grid-cols-2 h-44 gap-x-10 md:gap-x-16 gap-y-2.5 md:gap-y-5'>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            حریم خصوصی
                        </NavLink>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            عودت کالا
                        </NavLink>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            شرایط استفاده
                        </NavLink>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            ثبت سفارش
                        </NavLink>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            پرسش های متداول
                        </NavLink>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            فرصت های شغلی
                        </NavLink>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            ضمانت نامه ها
                        </NavLink>
                        <NavLink className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-all">
                            <span className='inline-block w-2 md:w-2.5 h-1 bg-current rounded-full'></span>
                            ارتباط با ما
                        </NavLink>
                    </div>
                </div>
                <div className='mt-10 md:mt-[26px]'>
                    <h4 className='font-DanaDemiBold text-2xl mb-6 md:mb-7'>در تماس باشیم</h4>
                    <div>
                        <div className='md:text-xl mb-6 md:mb-10'>
                            <span className='flex items-center gap-x-2 md:gap-x-3 text-xl mb-4 md:mb-5'>
                                <svg className='w-5 h-5 md:w-6 md:h-6 shrink-0'>
                                    <use href='#map-pin'></use>
                                </svg>
                                بلوار میرداماد، خیابان البرز، کوچه قبادیان شرقی، پلاک ۳۳
                            </span>
                            <div className="flex flex-wrap gap-x-5 gap-y-4 font-DanaMedium">
                                <NavLink href="mailto:info@Coffee.com" className='flex items-center gap-x-2 md:gap-x-3 text-orange-300'>
                                    <svg className='w-5 h-5 md:w-6 md:h-6'>
                                        <use href='#envelope'></use>
                                    </svg>
                                    info@Coffee.com
                                </NavLink>
                                <div className='flex items-center gap-x-2 md:gap-x-3'>
                                    <svg className='w-5 h-5 md:w-6 md:h-6'>
                                        <use href='#phone'></use>
                                    </svg>
                                    <span className='ltr-text'> 0901 123 4567</span>
                                    <span className='ltr-text'>021 - 1234567</span>
                                </div>
                            </div>

                        </div>
                        <div className='flex gap-x-1.5 md:gap-x-6 ltr-text font-DanaMedium md:text-xl'>
                            <NavLink className="flex-center flex-grow gap-x-2 h-12 border border-orange-200 text-orange-200 rounded-xl ">
                                @golden_coffe
                                <svg className='w-[26px] h-[26px] md:w-[38px] md:h-[38px]'>
                                    <use href='#instagram'></use>
                                </svg>
                            </NavLink>
                            <NavLink className="flex-center flex-grow gap-x-2 h-12 text-zinc-700 bg-gradient-to-r from-orange-200 to-orange-300 rounded-xl ">
                                @golden_coffe
                                <svg className='w-[26px] h-[26px] md:w-[38px] md:h-[38px]'>
                                    <use href='#telegram'></use>
                                </svg>
                            </NavLink>
                        </div>
                    </div>

                </div>
            </div>
        </div>
            </footer>
        </>
    )
}
