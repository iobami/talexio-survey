import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getLocalStorage } from './helper'
// import routes from '@/lib/routes'
import config from '@/lib/config'
import { decodeJwt } from '@/lib/utils'

const baseURL = config.baseUrl

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  }
})

const onRequest = (request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
  const token = getLocalStorage(config.tokenKey)
  const jwt = token?.accessToken || ''
  const { sessionId } = decodeJwt(jwt as string)

  if (!request.headers) return request

  request.headers.Authorization = `Bearer ${jwt}`
  request.headers.signature = sessionId

  return request
}

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  return await Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = async (error: AxiosError) => {
  return await Promise.reject(error)
}

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosInstance
