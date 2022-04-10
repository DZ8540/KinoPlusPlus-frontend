import ms from 'ms'
import axios from 'axios'
import { TIMEOUT, URL } from '@/config/api'

const instance = axios.create({
  baseURL: URL,
  timeout: ms(TIMEOUT),
  withCredentials: true,
  headers: {
    'User-Fingerprint': 'test',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Authorization': `Bearer `,
  },
})

export default instance