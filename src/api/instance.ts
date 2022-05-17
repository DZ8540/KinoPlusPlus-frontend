// * Types
import type { AxiosRequestConfig } from 'axios'
import type { ErrorResponse } from '@/contracts/response'
// * Types

import ms from 'ms'
import axios from 'axios'
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
    // Logger.info('Request', config._retry)

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

// instance.interceptors.response.use(
//   (response: AxiosResponse<any>) => {
//     // Logger.info('Response', response)

//     return response
//   },
//   (err: ErrorResponse) => {
//     // Logger.error('Response', err.response)

//     const originalConfig: ErrorResponse['config'] = err.config

//     console.log(originalConfig._retry)

//     if (err.response.data.code == 'TOKEN_EXPIRED' && !originalConfig._retry) {
//       originalConfig._retry = true

//       return AuthService.refresh().then(() => instance(originalConfig))
//     }

//     return Promise.reject(err)
//   }
// )

export default instance