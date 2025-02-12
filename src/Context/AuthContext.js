import { createContext } from "react";

const AuthContext=createContext({
    isLoggedIn:false,
    isLoading:true,
    userInfos:null,
    setUserInfos:null,
    nameCookie:null,
    shopBasket:[],
    login:()=>{},
    logout:()=>{},
    addtoshopbox:()=>{},
    addtofavorites:()=>{},
    removefromfavorites:()=>{},
    removefromshopbox:()=>{},
    emptyshopbox:()=>{},
    increasecount:()=>{},
    decreasecount:()=>{}
})

export default AuthContext