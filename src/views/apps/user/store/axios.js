import { axiosClient } from "@src/@core/services"

export const getUsers = async(params) => {
  return (await axiosClient.get('/users', {params})).data
}

export const getUser = async(id) => {
  return (await axiosClient.get(`/users/${id}`)).data
}