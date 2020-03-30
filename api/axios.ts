import axios from 'axios'
import { API_HOST } from "./index";

// @ts-ignore
axios.defaults.baseURL = `${API_HOST}/api`

export default axios
