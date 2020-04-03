import axios from './axios'
import { getToken } from "./storage";

const getSuggestionsByQuery = async (query: string, count = 10): Promise<{ suggestions: any[] }> => {
  const token = await getToken()
  const res = await axios({
    method: 'POST',
    headers: {
      Authorization: token,
    },
    url: `/geo/suggestions`,
    data: {
      query,
      count
    }
  })
  return res.data
}

export default {
  getSuggestionsByQuery,
}
