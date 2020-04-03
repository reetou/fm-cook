import axios from './axios'
import { getToken } from "./storage";

const sendExpoToken = async (expo_token): Promise<any> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: '/cooker/expo/token',
    data: {
      expo_token,
    }
  })
  return res.data
}

export default {
  sendExpoToken,
}
