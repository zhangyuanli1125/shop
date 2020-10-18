import $axios from "../common/axios"
export async function getSpecsList(params){
    const res=await $axios.get('/api/specslist',params)
    if(res.code==200){
        return res.list
    }
    return false
}
export async function getSpecsById(id){
    const res=await $axios.get(`/api/specsinfo?id=${id}`)
    if(res.code==200){
        return res.list
    }
    return false
}