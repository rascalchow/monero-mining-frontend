import axios from "axios"
import { API_ENDPOINT } from '../config'

export const axiosClient = axios.create({
  baseURL: API_ENDPOINT
})
