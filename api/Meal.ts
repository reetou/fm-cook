import axios from './axios'
import { getToken } from "./storage";
import { Meal } from "../types/Meal";

interface MealResponse {
  meal: Meal,
}

const addMeal = async (data: Meal, avatar?: string): Promise<MealResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: '/cooker/meals',
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

const updateMeal = async (id, data: Meal, avatar?: string): Promise<MealResponse> => {
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
    headers: {
      Authorization: token,
    },
    url: `/cooker/meals/${id}`,
    data
  })
  return res.data
}

const uploadAvatar = async (id: string, avatar: string): Promise<MealResponse> => {
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
    url: `/cooker/meals/${id}/avatar`,
    data: formData
  })
  return res.data
}

export default {
  addMeal,
  updateMeal
}
