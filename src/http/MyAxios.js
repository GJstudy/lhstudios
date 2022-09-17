import axios from 'axios'
import qs from 'qs'
import store from '@/store'

const instance=axios.create()

// 添加请求拦截器
instance.interceptors.request.use(config=>{
  // 从vuex中获取token。如果有，则设置header一起发送请求
  let token=store.state.token
  if(token){
    config.headers.authorization=token
  }
  return config;
})

// 添加响应拦截器
instance.interceptors.response.use(response=>{
  if(response.data.code==401){
    // 用户token失效
    window.location='/user/login'
  }else{
    return response
  }
})

const myAxios={
  /**
   * 用于发送get请求
   * @param {string} url  请求资源路径
   * @param {Object} params 请求参数对象
   */
  get(url,params){
    return instance({
      method:'get',
      url:url,
      params:params
    })
  },
  /**
   * 用于发送post请求
   * @param {string} url  请求资源路径
   * @param {Object} params 请求参数对象
   */
  post(url,params){
    return instance({
      method:'post',
      url:url,
      data:qs.stringify(params)
    })
  }
}
export default myAxios;