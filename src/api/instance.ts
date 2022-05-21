// * Types
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ErrorResponse } from '@/contracts/response'
// * Types

import ms from 'ms'
import axios from 'axios'
import AuthService from '@/services/AuthService'
import { TIMEOUT, URL } from '@/config/api'
import { useUserData } from '@/store/userDataStore'

const instance = axios.create({
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

instance.interceptors.request.use(
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

instance.interceptors.response.use(
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
      return instance(originalConfig)
    }

    return Promise.reject(err)
  }
)

export default instance