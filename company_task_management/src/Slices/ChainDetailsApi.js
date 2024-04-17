import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
})

export function fetchChainDetails() {
  return axiosInstance.get("api/ChainDetails")
}