
import axios  from "axios"

const request = axios.create({
    baseURL:"https://api.slt1n.im/api/SLT"
})



request.interceptors.request.use(config=>{
    // console.log('==',config.url,)
    // console.log(config)
    return config
},error=> Promise.reject(error))

request.interceptors.response.use(config=>{
    // console.log(config)
    return config
},error=> Promise.reject(error))

export default request