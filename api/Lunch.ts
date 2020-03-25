import axios from './axios'
import { getToken } from "./storage";
import { Lunch } from "../types/Lunch";

interface LunchResponse {
  lunch: Lunch
}

const addLunch = async (data: any, avatar?: string): Promise<LunchResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    url: '/cooker/lunches',
    headers: {
      Authorization: token,
    },
    data
  })
  if (avatar) {
    try {
      return uploadAvatar(res.data.id, avatar)
    } catch (e) {
      console.error('Cannot upload avatar')
    }
  }
  return res.data
}

const updateLunch = async (id, data: any, avatar?: string): Promise<LunchResponse> => {
  const token = await getToken()
  if (avatar) {
    try {
      await uploadAvatar(id, avatar)
    } catch (e) {
      console.error('Cannot upload avatar')
    }
  }
  const res = await axios({
    method: 'PUT',
    url: `/cooker/lunches/${id}`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
    data
  })
  return res.data
}


const uploadAvatar = async (id: string, avatar: string): Promise<LunchResponse> => {
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
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
    url: `/cooker/lunches/${id}/avatar`,
    data: formData
  })
  return res.data
}

export default {
  addLunch,
  updateLunch
}
