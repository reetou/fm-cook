import axios from './axios'
import { getToken } from "./storage";

interface GetMessagesResponse {
  messages: any[];
}

interface SendMessageResponse {
  message: any;
}


const getMessages = async (): Promise<GetMessagesResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'GET',
    headers: {
      Authorization: token,
    },
    url: `/support/messages`
  })
  return res.data
}

const sendMessage = async (text: string): Promise<SendMessageResponse> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: `/support/message`,
    data: {
      text
    }
  })
  return res.data
}

export default {
  getMessages,
  sendMessage,
}
