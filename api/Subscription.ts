import axios from './axios'
import { getToken } from "./storage";

export const checkout = async (): Promise<{ id: string, customer_id: string }> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token
    },
    url: '/cooker/checkout'
  })
  return res.data
}

export default {
  checkout
}