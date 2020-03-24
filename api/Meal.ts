import axios from './axios'
import { getToken } from "./storage";
import { Meal } from "../types/Meal";

interface MealResponse {
  meal: Meal,
}

const addMeal = async (data: Meal, avatar?: string): Promise<MealResponse> => {
  const token = await getToken()
  const formData = new FormData()
  if (avatar) {
    const uriParts = avatar.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('avatar', {
      // @ts-ignore
      uri: avatar,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    })
  }
  Object.keys(data).forEach(k => {
    formData.append(k, data[k])
  })
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
    url: '/cooker/meals',
    data: formData
  })
  return res.data
}

const updateMeal = async (id, data: Meal, avatar?: string): Promise<MealResponse> => {
  const token = await getToken()
  const formData = new FormData()
  if (avatar) {
    const uriParts = avatar.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('avatar', {
      // @ts-ignore
      uri: avatar,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    })
  }
  Object.keys(data).forEach(k => {
    formData.append(k, data[k])
  })
  const res = await axios({
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
    url: `/cooker/meals/${id}`,
    data: formData
  })
  return res.data
}

export default {
  addMeal,
  updateMeal
}
