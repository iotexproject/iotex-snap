import axios from 'axios'


export const request = axios.create({
  baseURL: 'https://api.iotexscan.io/api/rest/',
  headers: {
    'Content-Type': 'application/json',
  },
})
