import $axios from "../common/axios"
export async function getGoodsList(params){
    const res=await $axios.get('/api/goodslist',params)
    if(res.code==200){
        return res.list
    }
    return false
}
export async function getGoodsTotal(){
    const res=await $axios.get('/api/goodscount')
    if(res.code==200){
        return res.list[0].total
    }
    return false
}
export async function getGoodsById(id){
    const res=await $axios.get(`/api/goodsinfo?id=${id}`)
    if(res.code==200){
        return res.list
    }
    return false
}
export async function updateGoodaInfo(params){
    const fd=new FormData()
    for(let key in params){
         fd.append(key,params[key])
    }
    const res=await $axios.post('/api/goodsedit',fd)
    if(res.code==200){
        return res.list
    }
    return false
}