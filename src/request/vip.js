import $axios from "../common/axios"
export async function  getVipList(){
    const res=await $axios.get('/api/memberlist')
     if(res.code==200){
         return res.list
     }
     return false
}
export async function getVipInfo(uid){
    const res=await $axios.get('/api/memberinfo?uid='+uid)
    if(res.code==200){
        return res.list
    }
    return false
}