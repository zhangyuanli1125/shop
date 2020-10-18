const { default: axios } = require("../common/axios");

import $axios from '../common/axios'
export async function getLunboList(){
    const res=await $axios.get('/api/bannerlist')
    if(res.code==200){
        return res.list
    }
    return false
}
export async function getBannerById(id){
    const res=await $axios.get('/api/bannerinfo',{params:{id}})
    if(res.code==200){
        return res.list
    }
    return false
}
