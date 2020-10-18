import $axios from "../common/axios"
export async function getCateList(){
   const res=await $axios.get("/api/catelist?istree=1")
   if(res.code==200){
       return res.list
   }
   return false
}
export  async function getCateById(id){
    const res=await $axios.get('/api/cateinfo',{params:{id}})
    if(res.code==200){
        return res.list
    }
    return false
}