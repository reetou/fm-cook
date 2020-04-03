import axios from './axios'
import { getToken } from "./storage";

const getPrices = async (): Promise<{container_pack: number, container_pack_quantity: number}> => {
  const token = await getToken()
  const res = await axios({
    method: 'GET',
    headers: {
      Authorization: token,
    },
    url: '/cooker/shop/prices',
  })
  return res.data
}

export default {
  getPrices,
}
