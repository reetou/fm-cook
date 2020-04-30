import axios from './axios'
import { getToken } from "./storage";

export const weeklyPlan = async (): Promise<{confirmation_url: string, id: string}> => {
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
