import ms from 'ms'
import axios from 'axios'
import { TIMEOUT, URL } from '@/config/api'

const instance = axios.create({
  baseURL: URL,
  timeout: ms(TIMEOUT),
  headers: {}
})

export default instance