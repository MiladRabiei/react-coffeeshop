import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
    let [mainData,setMainData]=useState([])
    let [loading,setLoading]=useState(true)
  useEffect(()=>{
    const fetchData=async()=>{
      setLoading(true)
      try{
        const res=await fetch(url)
        if(!res.ok){
          throw new Error('network respond was not ok');
          
        }
        const data=await res.json()
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
