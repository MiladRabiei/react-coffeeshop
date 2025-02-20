import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useParams } from "react-router-dom"
import AuthContext from '../../Context/AuthContext';
export default function Header() {

    let authContext = useContext(AuthContext)
    let [darkMode, setDarkMode] = useState(false)
    
    let changeThemeColor = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add("dark"); // Instead of document.body;
                localStorage.setItem("theme", true);
            } else {
                document.documentElement.classList.remove("dark"); // Instead of document.body;
                localStorage.setItem("theme", false);
            }
            return newMode;
        });
    };

    useEffect(() => {
        const savedTheme = JSON.parse(localStorage.getItem("theme")); // Get the theme value as a boolean
        setDarkMode(savedTheme);
        if (savedTheme) {
            document.documentElement.classList.add("dark"); // Instead of document.body

        } else {
            document.documentElement.classList.remove("dark"); // Instead of document.body

        }
    }, [darkMode]);
    let closeMobileMenu = () => {
        document.getElementById("menu").classList.remove("right-0")
        document.getElementById("menu").classList.add("-right-64")
        document.querySelector(".overlay").classList.add('hidden')
    }
    let closeCartMenu = () => {
        document.getElementById("cart").classList.remove("left-0")
        document.getElementById("cart").classList.add("-left-64")
        document.querySelector(".overlay").classList.add('hidden')
    }
    let openMobileMenu = () => {
        document.getElementById("menu").classList.remove("-right-64")
        document.getElementById("menu").classList.add("right-0")
        document.querySelector(".overlay").classList.remove('hidden')
    }
    let openCartMenu = () => {
        document.getElementById("cart").classList.remove("-left-64")
        document.getElementById("cart").classList.add("left-0")
        document.querySelector(".overlay").classList.remove('hidden')
    }

    let removeFromShopBox=(id)=>authContext.removefromshopbox(id)
    let increaseCount=(id)=>authContext.increasecount(id)
    let decreaseCount=(id)=>authContext.decreasecount(id)

    return (
        <>
            {/* header>md */}
            <header className='z-50 fixed top-9 right-0 left-0 hidden  md:flex items-center w-[98%] lg:w-[90%] h-24 px-5 lg:px-10 py-5 mx-auto bg-black/50 rounded-3xl backdrop-blur-[6px]'>
                <div className='flex justify-between w-full h-14'>
                    {/* logo & menu */}
                    <nav className='flex items-center gap-x-6 lg:gap-x-9 h-full'>
                        <div className='shrink-0'>
                            <img src={import.meta.env.BASE_URL+"/images/app-logo.png"} alt="Golden Coffee" />
                        </div>
                    <ul className='flex items-center h-full gap-x-5 lg:gap-x-9 text-xl text-gray-300 tracking-tightest child:leading-[56px] child-hover:text-orange-300 transition-all'>
                    <li>
                        <NavLink to={"/"} className={link => link.isActive ? "lgactive" : ""} >
                            صفحه اصلی
                        </NavLink>
                    </li>
                    <li className='relative group'>
                        <NavLink to={"/Store"} className={link => link.isActive ? "lgactive group-hover:text-orange-300" : "group-hover:text-orange-300"}>
                            فروشگاه
                            <ul className='absolute top-full w-52 p-6 space-y-4 text-zinc-700 dark:text-white text-base border-t-[3px] border-t-orange-300 bg-white dark:bg-zinc-700 
    tracking-normal shadow-normal rounded-2xl child:inline-block child:transition-all
        child-hover:text-orange-300 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all'>
                                <li>
                                    <NavLink to={"/store"}>
                                        قهوه ویژه
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        ویژه در سطح جهانی
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        قهوه درجه یک
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        ترکیبات تجاری
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        کپسول قهوه
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        قهوه زینو برزیلی
                                    </NavLink>
                                </li>
                            </ul>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={"/Blog"} className={link => link.isActive ? "lgactive" : ""}>
                            بلاگ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/About-us"} className={link => link.isActive ? "lgactive" : ""}>
                            درباره ما
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/contact-us"} className={link => link.isActive ? "lgactive" : ""}>
                            تماس با ما
                        </NavLink>
                    </li>

                    {authContext.userInfos&&authContext.userInfos.role === "admin"&&(
                        <li>
                            <NavLink to="Cms/products" className={link => link.isActive ? "lgactive" : ""}>
                                پنل مدیریت
                            </NavLink>
                        </li>
                    )}

                    </ul>
                    </nav>
                    {/* cart & them toggle & Login link */}
                    <div className='flex items-center text-orange-200 text-xl gap-x-4 lg:gap-x-5 xl:gap-x-10'>
                    {/* cart icon & theme switch btn */}
                    <div className='flex gap-x-4 lg:gap-x-5'>
                    {/* cart */}
                    <div className='relative group'>
                    {/* cart-icon-hover */}
                    <Link to={"/shop"} className='block py-3'>
                    <svg className='w-8 h-8 cursor-pointer'>
                        <use href="#shopping-cart"></use>
                    </svg>
                    </Link>
                    {authContext.shopBasket&&authContext.shopBasket.length>0&&(
                        <span className='absolute  font-Dana top-1.5 text-center leading-7  left-5  w-6 h-6 rounded-full bg-orange-300 text-white'>
                        {authContext.shopBasket.length}
                    </span>
                    )}
                    {authContext.shopBasket&&authContext.shopBasket.length>0&&(
                    <>
                {/* cart-box */}
                <div className='absolute top-full left-0 w-[400px] h-auto py-5 
                    text-zinc-700 dark:text-white text-base border-t-[3px] border-t-orange-300 bg-white dark:bg-zinc-700 shadow-normal 
                    rounded-2xl invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all delay-75'>
                {/* cart-header */}
                <div className='flex items-center px-5 justify-between tracking-tighter font-DanaMedium '>
                        <span className='text-gray-300 text-xs '>{authContext.shopBasket.length} مورد</span>

                        <NavLink to={"/shop"} className="flex items-center text-orange-300">
                            مشاهده سبد خرید
                            <svg className='w-4 h-4'>
                                <use href='#chevron-left'></use>
                            </svg>
                        </NavLink>
                </div>
                {/* cart-body */}
                <div className='overflow-y-auto w-full h-[170px] pr-5 pl-1  mt-8'>
                {authContext.shopBasket.map(item=>(
                <div key={item.id} className='pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5'>
                <div className='flex gap-x-2.5 '>
                <img src={import.meta.env.BASE_URL+item.src} alt="product 1" className='w-30 h-30' />
                <div className='flex flex-col justify-between w-full'>
                <Link to={`/Product-info/${item.id}`} className='font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2'>{item.name}</Link>
                <button className="flex items-center justify-between w-full gap-x-1 px-1 py-1 my-2 border border-gray-200 dark:border-white/20 rounded-lg">
                <svg className="w-5 h-5 text-green-600" onClick={()=>increaseCount(item.id)}>
                    <use href="#plus"></use>
                </svg>
                <input
                    type="number"
                    id="customInput"
                    value={item.ordercount}
                    readOnly
                    min={1}
                    max={20}
                    name="customInput"
                    className="custome-input bg-transparent border-none outline-none text-center"
                />
                {item.ordercount>1?(
                    <svg className="w-5 h-5 text-red-500" onClick={()=>decreaseCount(item.id)}>
                    <use href="#minus"></use>
                </svg>
                ):(
                    <svg className="w-5 h-5 text-red-500" onClick={()=>removeFromShopBox(item.id)}>
                    <use href="#trash"></use>
                    </svg>
                )}
                </button>
                    {item.off>0? (
                        <>
                        <span
                            className="text-teal-600 dark:text-emerald-600 my-2 text-xs tracking-tighter"
                        >
                            {(((item.price * item.off) / 100)*item.ordercount).toLocaleString()} تومان
                            تخفیف
                        </span>
                        <div className="text-zinc-700 dark:text-white  font-DanaDemiBold">
                        {((item.price-((item.price*item.off)/100))*item.ordercount).toLocaleString()}
                        <span className="font-Dana text-xs pr-1">تومان</span>
                        </div>
                        </>
                    ):(
                        <div className="text-zinc-700 dark:text-white font-DanaDemiBold">
                        {item.price.toLocaleString()}
                        
                        <span className="font-Dana text-xs pr-1">تومان</span>
                    </div>
                    )}
                    </div>
                    </div>
                        

                </div>
                ))}
                </div>
                {/* cart-footer */}
                <div className=' flex justify-between items-center mt-5 px-5'>
                        <div>
                            <span className='font-DanaMedium text-gray-300  text-xs tracking-tighter'>مبلغ قابل پرداخت</span>
                            <div className='text-zinc-700 dark:text-white font-DanaDemiBold'>
                                {authContext.shopBasket.reduce((total,item)=>{
                                    let discount=item.off?((item.price*item.off)/100):0
                                    return total+(item.price-discount)*item.ordercount
                                },0).toLocaleString()}

                                <span className='font-Dana text-sm pr-1'>تومان</span>
                            </div>
                        </div>
                        <NavLink to={'/shop'} className="flex items-center justify-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 transition-colors tracking-tightest rounded-xl">ثبت سفارش</NavLink>
                </div>
                </div>
                    </>
                    )}        
                    </div>
                    {/* theme switch btn */}
                    <div>
                                <div className='py-3 transition-all' onClick={changeThemeColor}>
                                    {darkMode ? (
                                        <svg className='w-8 h-8 cursor-pointer' >
                                            <use xlinkHref='#sun'></use>
                                        </svg>
                                    ) : (
                                        <svg className='w-8 h-8 cursor-pointer' >
                                            <use xlinkHref='#moon'></use>
                                        </svg>
                                    )}
                                </div>
                    </div>

                </div>
                {/* divide border */}
                <span className='block w-px h-14 bg-white/20'></span>
                {/* login link */}
                {!authContext.isLoggedIn ? (
                    <>

                        <Link to={"/Login"} className="relative  py-3 flex items-center gap-x-2.5 tracking-tightest " >
                            <svg className='w-8 h-8'>
                                <use xlinkHref='#arrow-right'></use>
                            </svg>
                            <span className='hidden xl:inline-block'>ورود | ثبت نام</span>
                        </Link>

                    </>
                ) : (
                    <div className="group ">
                        <Link to={"/userpanel/dashboard"} className="relative  py-3 flex items-center gap-x-2.5 tracking-tightest " >
                            <svg className='w-8 h-8'>
                                <use xlinkHref='#person'></use>
                            </svg>

                            <span className='hidden xl:inline-block font-DanaMedium'>{authContext.nameCookie}</span>
                        </Link>
                        {/* login-submenu */}
                        <div className='invisible group-hover:visible delay-75 border-t-[3px] border-orange-300 tracking-normal absolute top-[80%] left-0 w-[208px] h-[224px] flex flex-col gap-y-3 py-6 px-[14px]
                    bg-white dark:bg-zinc-700 shadow-normal rounded-2xl
                        '>
                            <div className='child:py-2 child:pr-2 border-b border-white/10 pb-3 child:text-zinc-700 child:dark:text-white child-hover:bg-orange-200/20 child-hover:dark:text-orange-300 child:rounded-md'>
                                <Link to={"/userpanel/orders"} className='flex items-center text-base gap-x-2.5'>
                                    <svg className='md:w-5 md:h-5'>
                                        <use href='#bag'></use>
                                    </svg>
                                    سفارشات من
                                </Link>
                                <Link to={"/userpanel/comments"} className='flex items-center text-base gap-x-2.5'>
                                    <svg className=' md:w-6 md:h-6'>
                                        <use href='#envelope'></use>
                                    </svg>
                                    لیست پیام ها
                                </Link>
                                <Link to={"/userpanel/settings"} className='flex items-center text-base gap-x-2.5'>
                                    <svg className=' md:w-6 md:h-6'>
                                        <use href='#settings'></use>
                                    </svg>
                                    اطلاعات کاربری
                                </Link>
                            </div>
                            <div onClick={authContext.logout} className='flex items-center cursor-pointer text-base gap-x-2.5 py-2 pr-2 text-zinc-700 dark:text-white hover:text-red-400 hover:dark:text-red-400 hover:bg-red-400/10 rounded-md'>
                                <svg className='md:w-5 md:h-5'>
                                    <use href='#arrow-right-start'></use>
                                </svg>
                                خروج از حساب
                            </div>
                        </div>

                    </div>

                )}

                </div>
                </div>
            </header>
            {/* header<md */}
            <header className='flex items-center justify-between md:hidden h-16 bg-white dark:bg-zinc-700 px-4'>
                {/* nav icon */}
                <div className=''>
                    <svg className='w-6 h-6 text-zinc-700 dark:text-white cursor-pointer' onClick={openMobileMenu}>
                        <use href='#bars-3'></use>
                    </svg>
                </div>
                {/* nav */}
                <div id='menu' className='fixed top-0 bottom-0 -right-64 overflow-y-auto  w-64 pt-3 px-4 bg-white dark:bg-zinc-700 z-20 transition-all'>
                    {/* nav-header */}
                    <div className='flex items-center justify-between pb-5 mb-6 border-b border-b-gray-100 dark:border-b-white/10'>
                        <div className='flex gap-x-3.5'>
                            <svg className='w-[41px] h-10 text-orange-300'>
                                <use href='#logo'></use>
                            </svg>
                            <svg className='w-[100px] h-10 text-orange-300'>
                                <use href='#logo-type'></use>
                            </svg>
                        </div>
                        <svg className='w-5 h-5 text-zinc-600 dark:text-white cursor-pointer' onClick={closeMobileMenu}>
                            <use href='#x-mark'></use>
                        </svg>
                    </div>
                    {/* nav-body */}
                    <ul className='child:pr-2.5 space-y-6 text-zinc-600 dark:text-white'>
                        <li className=' mobileMenu_links flex items-center justify-between '>
                            <NavLink to={"/home"} className={link => link.isActive ? "mdactive" : ""}>
                                <span className='flex items-center gap-x-2'>
                                    <svg className='w-5 h-5'>
                                        <use href='#home'></use>
                                    </svg>
                                    صفحه اصلی
                                </span>
                            </NavLink>
                        </li>
                        <li className='mobileMenu_links group transition-all ' >
                            <NavLink to={"/Store"} className={link => link.isActive ? "mdactive pl-1 " : " group-hover:mdactive group-hover:pl-1 w-full"} >
                                <span className='flex w-full items-center justify-between '>
                                    <span className='flex w-full items-center gap-x-2'>
                                        <svg className='w-5 h-5'>
                                            <use href='#shopping-bag'></use>
                                        </svg>
                                        فروشگاه
                                    </span>
                                    <svg id='arrow' className='w-5 h-5 transition-transform duration-500 group-hover:rotate-180'>
                                        <use href='#chevron-down'></use>
                                    </svg>
                                </span>
                            </NavLink>
                            <ul id='submenu' className='opacity-0 hidden  group-hover:flex group-hover:opacity-100  flex-col gap-y-3 pr-7 mt-3 justify-center delay-150 child-hover:text-orange-300'>
                                <li>
                                    <NavLink to={"/store"}>
                                        قهوه ویژه
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        ویژه در سطح جهانی
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        قهوه درجه یک
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        ترکیبات تجاری
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        کپسول قهوه
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/store"}>
                                        قهوه زینو برزیلی
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className='mobileMenu_links flex items-center justify-between'>
                            <NavLink to={"/Dictionary"} className={link => link.isActive ? "mdactive" : ""}>
                                <span className='flex items-center gap-x-2'>
                                    <svg className='w-5 h-5'>
                                        <use href='#chat'></use>
                                    </svg>
                                    دیکشنری
                                </span>
                            </NavLink>
                        </li>
                        <li className='mobileMenu_links flex items-center justify-between'>
                            <NavLink to={"/About-us"} className={link => link.isActive ? "mdactive" : ""}>
                                <span className='flex items-center gap-x-2'>
                                    <svg className='w-5 h-5'>
                                        <use href='#briefcase'></use>
                                    </svg>
                                    درباره ما
                                </span>
                            </NavLink>
                        </li>
                        <li className='mobileMenu_links flex items-center justify-between'>
                            <NavLink to={"/Blog"} className={link => link.isActive ? "mdactive" : ""}>
                                <span className='flex items-center gap-x-2'>
                                    <svg className='w-5 h-5'>
                                        <use href='#document-text'></use>
                                    </svg>
                                    بلاگ
                                </span>
                            </NavLink>
                        </li>
                        <li className='mobileMenu_links flex items-center justify-between'>
                            <NavLink to={"/Contact-us"} className={link => link.isActive ? "mdactive" : ""}>
                                <span className='flex items-center gap-x-2'>
                                    <svg className='w-5 h-5'>
                                        <use href='#phone'></use>
                                    </svg>
                                    تماس با ما
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                    {/* nav-footer */}
                    <div className="py-8 mt-6 space-y-6 px-2.5 border-t border-t-gray-100 dark:border-t-white/10  text-orange-300">
                        {!authContext.isLoggedIn?(
                            <NavLink to={"/Login"} className="inline-flex items-center gap-x-2">
                                <svg className='w-5 h-5'>
                                    <use href='#arrow-right'></use>
                                </svg>
                                ورود | ثبت نام
                            </NavLink>
                        ):(
                            <NavLink to={"/userpanel/dashboard"} className="inline-flex items-center gap-x-2 " >
                            <svg className='w-5 h-5'>
                                <use xlinkHref='#person'></use>
                            </svg>
                            <span className='inline-block font-DanaMedium'>{authContext.nameCookie}</span>
                        </NavLink>
                        )}
                        {authContext.userInfos&&authContext.userInfos.role === "admin"&&(
                            <NavLink to="Cms/products" className="inline-flex items-center gap-x-2 ">
                            <svg className='w-5 h-5'>
                                <use href='#desktop'></use>
                            </svg>
                            پنل مدیریت
                        </NavLink>
                        )}
                        <div>
                            <span className="inline-flex  items-center gap-x-2 dark:hidden cursor-pointer" onClick={changeThemeColor}>
                                <svg className='w-5 h-5'>
                                    <use href='#moon'></use>
                                </svg>
                                تم تیره
                            </span>
                            <span className="hidden dark:inline-flex items-center gap-x-2 cursor-pointer" onClick={changeThemeColor}>
                                <svg className='w-5 h-5'>
                                    <use href='#sun'></use>
                                </svg>
                                تم روشن
                            </span>
                        </div>
                        <NavLink to={"/shop"} className="inline-flex items-center gap-x-2 ">
                            <svg className='w-5 h-5'>
                                <use href='#shopping-cart'></use>
                            </svg>
                            سبد خرید
                        </NavLink>
                    </div>
                </div>

                {/* logo type*/}
                <Link to={"/Home"} className=''>
                    <svg className='w-[100px] h-10 text-orange-300'>
                        <use href='#logo-type'></use>
                    </svg>
                </Link>
                {/* cart icon */}
                <div className='relative ' onClick={openCartMenu}>
                    <svg className='w-6 h-6 text-zinc-700 dark:text-white cursor-pointer'>
                        <use href='#shopping-cart'></use>
                    </svg>
                    {authContext.shopBasket&&authContext.shopBasket.length>0&&(
                        <span className='absolute font-DanaDemiBold -top-2 text-center leading-6 left-4  w-5 h-5 rounded-full bg-orange-300 text-white'>
                        {authContext.shopBasket.length}
                    </span>
                    )}
                    
                </div>
                {/* cart */}
                <div id='cart' className='fixed top-0 bottom-0 -left-64 flex flex-col  overflow-y-auto   w-64 pt-5 px-4 bg-white dark:bg-zinc-700 z-20 transition-all'>
                    {/* Cart-header */}
                    <div className='flex items-center justify-between pb-5 mb-5 border-b border-b-gray-300 dark:border-b-white/10'>

                        <svg className='w-5 h-5 text-zinc-600 dark:text-white cursor-pointer' onClick={closeCartMenu}>
                            <use href='#x-mark'></use>
                        </svg>
                        <span className='text-zinc-700 dark:text-white font-DanaMedium'>سبد خرید</span>
                    </div>
                    {authContext.shopBasket&&authContext.shopBasket.length > 0 ? (
                        <>
                    {/* Cart-body */}
                    <div className="overflow-y-auto child:pb-5 child:mb-5">
                    {authContext.shopBasket.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-x-1 border-b border-b-gray-100 dark:border-b-white/10"
                    >
                        <img
                            src={import.meta.env.BASE_URL+item.src}
                            alt={item.name || "Product image"}
                            className="w-[90px] h-[90px]"
                        />
                        <div className="flex flex-col justify-between w-full gap-y-1.5">
                            <Link to={`/Product-info/${item.id}`} className="font-DanaMedium text-zinc-700 dark:text-white text-sm line-clamp-2">
                                {item.name}
                            </Link>
                            <button className="flex items-center justify-between w-[90%] gap-x-1 px-1 py-1 border border-gray-200 dark:border-white/20 rounded-lg">
                                <svg className="w-5 h-5 text-green-600" onClick={()=>increaseCount(item.id)}>
                                    <use href="#plus"></use>
                                </svg>
                                <input
                                    type="number"
                                    id="customInput"
                                    value={item.ordercount}
                                    readOnly
                                    min={1}
                                    max={20}
                                    name="customInput"
                                    className="custome-input bg-transparent border-none outline-none text-center"
                                />
                                {item.ordercount>1?(
                                    <svg className="w-5 h-5 text-red-500" onClick={()=>decreaseCount(item.id)}>
                                    <use href="#minus"></use>
                                </svg>
                                ):(
                                    <svg className="w-5 h-5 text-red-500" onClick={()=>removeFromShopBox(item.id)}>
                                    <use href="#trash"></use>
                                    </svg>
                                )}
                            </button>
                            <div>
                                {item.off>0? (
                                    <>
                                    <span
                                        className="text-teal-600 dark:text-emerald-600 text-xs tracking-tighter"
                                    >
                                        {(((item.price * item.off) / 100)*item.ordercount).toLocaleString()} تومان
                                        تخفیف
                                    </span>
                                    <div className="text-zinc-700 dark:text-white font-DanaDemiBold">
                                    {((item.price-((item.price*item.off)/100))*item.ordercount).toLocaleString()}
                                    <span className="font-Dana text-xs pr-1">تومان</span>
                                </div>
                                    </>
                                ):(
                                    <div className="text-zinc-700 dark:text-white font-DanaDemiBold">
                                    {item.price.toLocaleString()}
                                    
                                    <span className="font-Dana text-xs pr-1">تومان</span>
                                </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                {/* Cart-footer */}
                <div className="flex items-center gap-x-4 mt-auto mb-8">
                    <div className="flex justify-between items-center mt-5 gap-x-2 flex-1">
                        <NavLink
                            aria-current="page"
                            className="flex items-center justify-center w-28 h-11 text-white bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 transition-colors tracking-tightest rounded-xl active"
                            to={"/Shop"}
                        >
                             ثبت سفارش
                        </NavLink>
                        <div>
                            <span className="font-DanaMedium text-gray-300 text-xs tracking-tighter">
                                مبلغ قابل پرداخت
                            </span>
                            <div className="text-zinc-700 dark:text-white text-base font-DanaDemiBold">
                            {authContext.shopBasket.reduce((total, item) => {
                            const discount = item.off ? (item.price * item.off) / 100 : 0;
                            return total + (item.price - discount) * item.ordercount;
                            }, 0).toLocaleString()}

                                <span className="font-Dana text-xs pr-1">تومان</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
                    ) : (
                    <div className="overflow-y-auto child:pb-5 child:mb-5">
                            <div className="flex flex-col justify-center items-center mt-8 gap-y-4 gap-x-1">
                                <img
                                    src={import.meta.env.BASE_URL+"/images/empty-cart.svg"}
                                    alt="Empty cart"
                                    className="w-40 h-40"
                                />
                                <h2 className="font-DanaMedium text-zinc-700 dark:text-white">
                                    سبد خرید شما خالی است!
                                </h2>
                            </div>
                    </div>
                    )}
                </div>
            </header>
            <div className="overlay hidden fixed inset-0 w-full h-full bg-black/40 z-10 md:hidden" onClick={() => {
                closeMobileMenu()
                closeCartMenu()
            }}></div>
        </>
    )
}
