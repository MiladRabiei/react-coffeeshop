import axios from "axios";

const apiRequests=axios.create({
    baseURL:"https://react-coffeshop.liara.run/",
    headers:{
        "Content-Type":"application/json"
    }
})

apiRequests.interceptors.request.use(
    (config)=>{
        console.log(config);
        return config
    },
    (err)=>{
        console.log(err);
        return Promise.reject(err)
    }
)
apiRequests.interceptors.response.use(
    (response)=>{
        console.log(response);
        return response
    },
    (err)=>{
        console.log(err);
        if(err.response){
        const status=err.response.status
        if(status<200||status>=300){
            console.log(`HTTP error:${status}`);
        }
        }
        
        return Promise.reject(err)
    }
)
export default apiRequests