import axios from './axios'
import { getToken } from "./storage";
import { User } from "../types/User";

export const getSelf = async () => {
  const token = await getToken()
  const res = await axios({
    method: 'GET',
    headers: {
      Authorization: token
    },
    url: '/cooker'
  })
  return {
    ...res.data,
    token,
  }
}

const uploadAvatar = async (avatar: string): Promise<{ user: User }> => {
  const token = await getToken()
  const formData = new FormData()
  const uriParts = avatar.split('.');
  const fileType = uriParts[uriParts.length - 1];
  formData.append('avatar', {
    // @ts-ignore
    uri: avatar,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  })
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
    url: `/cooker/avatar`,
    data: formData
  })
  return res.data
}

const updateSelf = async (data: any) => {
  const token = await getToken()
  const res = await axios({
    method: 'PUT',
    headers: {
      Authorization: token
    },
    url: '/cooker',
    data
  })
  return res.data
}

const updateDutyStatus = async (on_duty: boolean): Promise<{ user: any }> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: `/cooker/on_duty`,
    data: {
      on_duty,
    }
  })
  return res.data
}

const addAddress = async (data: any): Promise<{address: any}> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: `/cooker/address/add`,
    data
  })
  return res.data
}

export default {
  getSelf,
  uploadAvatar,
  updateSelf,
  updateDutyStatus,
  addAddress,
}
