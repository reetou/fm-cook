import axios from './axios'
import { getToken } from "./storage";
import { Lunch } from "../types/Lunch";

interface LunchResponse {
  lunch: Lunch
}

const addLunch = async (data: Lunch): Promise<LunchResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token
    },
    url: '/cooker/lunches',
    data
  })
  return res.data
}

const updateLunch = async (id, data: Lunch): Promise<LunchResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'PUT',
    headers: {
      Authorization: token
    },
    url: `/cooker/lunches/${id}`,
    data: {
      data
    }
  })
  return res.data
}

export default {
  addLunch,
  updateLunch
}
