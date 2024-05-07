import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const loginAuthUser = (user) => {
  return axiosInstance.post("api/Login", user)
}
