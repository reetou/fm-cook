import axios from './axios'
import { getToken } from "./storage";
import { Lunch } from "../types/Lunch";
import * as Sentry from "sentry-expo";

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
      Sentry.captureException(e)
      console.error('Cannot upload avatar')
    }
  }
  return res.data
}

const toggleAvailable = async (id: string, data: {available: boolean}, accessToken?: string): Promise<any> => {
  let token = accessToken
  if (!token) {
    token = await getToken()
  }
  const res = await axios({
    method: 'POST',
    url: `/cooker/lunches/${id}/available`,
    headers: {
      Authorization: token,
    },
    data
  })
}

const updateLunch = async (id, data: any, avatar?: string, toggleAvailableData?: {available: boolean}): Promise<LunchResponse> => {
  const token = await getToken()
  if (avatar) {
    try {
      await uploadAvatar(id, avatar)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot upload avatar', e)
    }
  }
  if (toggleAvailableData) {
    try {
      await toggleAvailable(id, toggleAvailableData, token)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot toggle available in lunch', e)
    }
  }
  const res = await axios({
    method: 'PUT',
    url: `/cooker/lunches/${id}`,
    headers: {
      Authorization: token,
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
