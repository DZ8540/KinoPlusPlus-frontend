// * Types
import type { ErrorResponse } from '@/contracts/response'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// * Types

import ms from 'ms'
import axios from 'axios'
import AuthService from '@/services/AuthService'
import { TIMEOUT, URL } from '@/config/api'
import { useUserData } from '@/store/userDataStore'

const axiosInstance = axios.create({
  baseURL: `${URL}/api`,
  timeout: ms(TIMEOUT),
  withCredentials: true,
  headers: {
    'User-Fingerprint': 'test',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Logger.info('Request', config)

    const userData = useUserData()

    if (userData.token)
      config.headers['Authorization'] = `Bearer ${userData.token}`

    return config
  }, 
  (err: ErrorResponse) => {
    // Logger.error('Request', err)

    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Logger.info('Response', response)

    return response
  },
  async (err: ErrorResponse) => {
    // Logger.error('Response', err.response)

    const originalConfig: ErrorResponse['config'] = err.config

    if (err.response.data.code == 'TOKEN_EXPIRED' && !originalConfig._retry) {
      originalConfig._retry = true

      await AuthService.refresh()
      return axiosInstance(originalConfig)
    }

    return Promise.reject(err)
  }
)

export default axiosInstance