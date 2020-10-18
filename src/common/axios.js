// 导入vue
import Vue from "vue"
// 导入axios
import axios from "axios"
// 每一个组件中都需要使用axios所以将它挂载到vue的原型对象上
// 配置一个请求拦截器
axios.interceptors.request.use(function(config){
    // 从本地存储中获取token
    const userInfo=JSON.parse(sessionStorage.getItem('userInfo') || '{}')
    config.headers.authorization=userInfo.token
    return config
})
// 响应拦截器
axios.interceptors.response.use(function(config){
    return config.data
})
Vue.prototype.$axios=axios
export default axios