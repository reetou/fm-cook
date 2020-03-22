import axios from './axios'
import { getToken } from "./storage";
import { Alert } from "react-native";

const sendPhone = async (phone: string): Promise<{token: string} | any> => {
  phone = phone.replace(/\s/g, '')
  const res = await axios.post('/auth/cooker', {
    phone
  })
  return res.data
}

const sendCode = async (sms_code: number): Promise<{token: string, user: any} | any> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    url: '/auth/cooker/code',
    headers: {
      Authorization: token
    },
    data: {
      sms_code
    }
  })
  return res.data
}

export default {
  sendPhone,
  sendCode,
}
