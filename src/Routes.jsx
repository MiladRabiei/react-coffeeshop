
import AboutUs from "./Pages/About us/AboutUs"
import Blog from "./Pages/Blog/Blog"
import ContactUs from "./Pages/Contact us/ContactUs"
import Home from "./Pages/Home/Home"
import Store from "./Pages/Store/Store"
import MainProduct from "./Pages/MainProduct/MainProduct"
import LoginAndRegister from "./Pages/LoginAndRegister/LoginAndRegister"
import Cms from "./Pages/Cms/Cms"
import Forbidden from "./Pages/403/Forbidden"
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"
import Shop from "./Pages/shop/Shop"
import NotFound from "./Pages/NotFound/NotFound"
import UserPanel from "./Pages/UserPanel/UserPanel"
import { Navigate } from "react-router-dom"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Orders from "./Pages/Orders/Orders"
import Favourits from "./Pages/Favourits/Favourits"
import Adress from "./Pages/Adress/Adress"
import Settings from "./Pages/Settings/Settings"
import Comments from "./Pages/Comments/Comments"
import CheckOut from "./Pages/CheckOut/CheckOut"
let routes = [
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/home", element: <Home /> },
    { path: "/store", element: <Store /> },
    { path: "/shop", element: <Shop/> },
    { path:"/checkout",element:<CheckOut/>},
    { path: "/about-us", element: <AboutUs /> },
    { path: "/blog", element: <Blog /> },
    { path: "/contact-us", element: <ContactUs /> },
    { path: "/product-info/:ProductID", element: <MainProduct /> },
    { path: "/login", element: <LoginAndRegister /> },
    { path: "/register", element: <LoginAndRegister /> },
    {path:"/cms/*",element:<PrivateRoute/>, children:[
        {path:"",element:<Cms/>},
    ]},
    {path:"/userpanel/",element:<UserPanel/>,children:[
        {path:"dashboard",element:<Dashboard/>},
        {path:"orders",element:<Orders/>},
        {path:"favourits",element:<Favourits/>},
        {path:"adress",element:<Adress/>},
        {path:"settings",element:<Settings/>},
        {path:"comments",element:<Comments/>},
    ]},
    { path: "/forbidden", element: <Forbidden /> },
    { path: "*", element: <NotFound/>}


]
export default routes