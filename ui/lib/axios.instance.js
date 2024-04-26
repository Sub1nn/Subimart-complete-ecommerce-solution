import axios from "axios"

const $axios = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
})

// Add a request interceptor

$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = localStorage.getItem("token")

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default $axios
