import axios from './axios'
import { getToken } from "./storage";

export const getSelf = async () => {
  const token = await getToken()
  const res = await axios({
    method: 'GET',
    headers: {
      Authorization: token
    },
    url: '/auth/cooker'
  })
  return {
    ...res.data,
    token,
  }
}

export default {
  getSelf
}
