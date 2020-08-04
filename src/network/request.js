import axios from 'axios'

export function request(config) {//用default只能导出一个对象，function可以导出多个
  //创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })

  //2.axios拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config => {
    return config//拦截到config一定要返回config，否则中断
  }, err => {
    console.log(err)
  })

  //2.1响应拦截的作用
  instance.interceptors.response.use(res => {
    return res.data//拦截到res一定要返回，否则中断
  }, err => {
    console.log(err)
  })

  //3.发送真正的网络请求
  return instance(config)//axios.create返回的就是一个Promise，所以不用再自己包装
}

