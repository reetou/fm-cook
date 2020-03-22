import axios from './axios'
import { getToken } from "./storage";
import { Meal } from "../types/Meal";

interface MealResponse {
  meal: Meal,
}

const addMeal = async (data: Meal): Promise<MealResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token
    },
    url: '/cooker/meals',
    data
  })
  return res.data
}

const updateMeal = async (id, data: Meal): Promise<MealResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'PUT',
    headers: {
      Authorization: token
    },
    url: `/cooker/meals/${id}`,
    data: {
      data
    }
  })
  return res.data
}

export default {
  addMeal,
  updateMeal
}
