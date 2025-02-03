import React, { useEffect, useState } from 'react'
import apiRequests from '../services/axios/Configs/configs'
export default function useFetch(url) {
    let [mainData,setMainData]=useState([])
    let [loading,setLoading]=useState(true)
  useEffect(()=>{
    const fetchData=async()=>{
      setLoading(true)
      try{
        const res=await apiRequests.get(url)
        if(!res.status>=200&&!res.status<300){
          throw new Error('network respond was not ok');
          
        }
        const data=await res.data
        setMainData(data)
        setLoading(false)
      }catch (err){
        console.log(err.message)
        setLoading(true)
      }
    }
    fetchData()
  },[url])
  return [mainData,loading]
}
