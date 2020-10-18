import $axios from "../common/axios"
export async function getAdminList(data){
    const res=await $axios.get('/api/userlist',{params:data});
    if(res.code==200){
        return res.list;
    }
    return false;
}
export async function getAdminCount(){
    const res=await $axios.get('/api/usercount')
    if(res.code==200){
        return res.list
    }
    return false
}
export async function getInfoById(uid){
    const res=await $axios.get('/api/userinfo?uid='+uid)
    if(res.code==200){
        return res.list
    }
    return false
}