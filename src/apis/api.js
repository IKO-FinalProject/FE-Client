// API.js
// axios 의 인스턴스를 생성
import axios from 'axios'

const API = axios.create({
  BASE_URL: '',
  headers: {
    'Content-Type': 'application/json'
  },
})

export default API
