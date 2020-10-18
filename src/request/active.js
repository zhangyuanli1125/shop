import  $axios from "../common/axios"
export async function getActiveList(){
    const res=await $axios.get('/api/secklist')
    if(res){
        return res.list
    }
    return false
}