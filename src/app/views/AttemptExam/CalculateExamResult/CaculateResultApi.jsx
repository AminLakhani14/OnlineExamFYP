import axios from "axios"

export const CalculateResult=async(url,obj)=>{
    return new Promise((resolve,reject)=>{
        axios.post(url, obj)
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}