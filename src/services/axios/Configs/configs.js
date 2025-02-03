import axios from "axios";

const apiRequests=axios.create({
    baseURL:"https://react-coffeshop.liara.run/",
    headers:{
        "Content-Type":"application/json"
    }
})

export default apiRequests