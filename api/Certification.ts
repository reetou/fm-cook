import axios from './axios'
import { getToken } from "./storage";

export const requestCertification = async (): Promise<void> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token
    },
    url: '/cooker/certification/request'
  })
  return res.data
}

export default {
  requestCertification,
}
