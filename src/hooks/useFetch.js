import React, { useEffect, useState } from 'react'
import apiRequests from '../services/axios/Configs/configs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CircleSpinner from '../Components/CircleSpinner/CircleSpinner'

export default function useFetch(url) {
    let queryClient=useQueryClient()
    const{data,isLoading,isFetched}=useQuery({
      queryKey:[url],
      queryFn:async ()=>{
          const res = await apiRequests.get(url)
          return res.data
    },
    initialData:()=>{
      let products=queryClient.getQueryData([url])||undefined
      return products
    },
    initialDataUpdatedAt:0,
    onSuccess:(fetchedData)=>{
      console.log("succeed",fetchedData);
    }
    })
    
    console.log(isFetched);

      return [data??[],isLoading]
}


