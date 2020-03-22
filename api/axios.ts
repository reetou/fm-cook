import axios from 'axios'

// @ts-ignore
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://cs-go.monster/api' : 'http://4e628256.ngrok.io/api'

export default axios
