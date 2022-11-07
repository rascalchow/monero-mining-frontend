import axios from "axios"
import { API_ENDPOINT } from '../config'

export const axiosClient = axios.create({
  baseURL: API_ENDPOINT
})

if (process.env.NODE_ENV === 'development') {
  axiosClient.interceptors.response.use(async (response) => {
    await new Promise((resolve)=>{setTimeout(()=>{resolve(true)}, 1000)})
    return response.data
  })
} else {
  axiosClient.interceptors.response.use(async (response) => {
    return response.data
  })
}
