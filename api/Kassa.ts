import axios from './axios'
import { getToken } from "./storage";

export const weeklyPlan = async (): Promise<any> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token
    },
    url: '/cooker/subscription/weekly'
  })
  return res.data
}

export default {
  weeklyPlan,
}
