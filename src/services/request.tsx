import axios from 'axios'

import { config } from '@/config'
import { message } from 'antd'

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    toast('网络请求异常，请稍后重试')
    throw err
  }
)

type Options = {
  loading?: boolean
  error?: boolean
}

let globalTimer: NodeJS.Timeout
function toast(msg: string, icon?: string) {
  const config = Object.create({})
  config.content = msg
  if (icon) {
    config.icon = icon
  }
  clearTimeout(globalTimer)
  globalTimer = setTimeout(() => {
    message.info(msg)
  }, 500)
}

function _request<R, P = any>(
  url: string,
  method: 'get' | 'post',
  params?: P,
  options: Options = { loading: true, error: true }
) {
  // todo(Alex) set loadinng
  return new Promise<R>((resolve, reject) => {
    let data = {}
    // get请求使用params字段
    if (method === 'get') {
      data = { params }
    }
    // post请求使用data字段
    if (method === 'post') {
      data = { data: params }
    }

    service({
      url,
      method,
      ...data
    } as any)
      .then((res: any) => {
        // todo(alex) resolve by code
        resolve(res.data)
      })
      .catch((error) => {
        const errText = error.message || error.msg
        if (errText) {
          // todo(alex) show error info
        }
        throw error
      })
      .finally(() => {
        // todo(alex) clear loadingn
      })
  })
}

function get<R, P = any>(url: string, params?: P, options?: Options) {
  return _request<R, P>(url, 'get', params, options)
}
function post<R, P = any>(url: string, params?: P, options?: Options) {
  return _request<R, P>(url, 'post', params, options)
}

export const request = {
  get,
  post
}
