import axios from './axios'
import { getToken } from "./storage";

interface ChatInfoResponse {
  order_members: {
    cooker: any;
    client: any;
  };
  order: any;
  messages: [];
}

interface SendMessageResponse {
  message: any;
}

const getAll = async (): Promise<{orders: any[]}> => {
  const token = await getToken()
  const res = await axios({
    method: 'GET',
    headers: {
      Authorization: token,
    },
    url: '/cooker/orders',
  })
  return res.data
}

const getChatInfo = async (order_id: string): Promise<ChatInfoResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: `/orders/chat/join/${order_id}`,
  })
  return res.data
}

const sendMessage = async (order_id: string, text: string): Promise<SendMessageResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: `/orders/chat/message/${order_id}`,
    data: {
      text
    }
  })
  return res.data
}

export default {
  getAll,
  getChatInfo,
  sendMessage,
}
