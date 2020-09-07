import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://www.filltext.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getInfo () {
    const request = '/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}'
    return apiClient.get(request)
  }
}
