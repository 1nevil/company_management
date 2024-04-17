import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
})

export function fetchChainData() {
  return axiosInstance.get("api/ChainMasters")
}

export function deleteChainById(id) {
  return axiosInstance.delete(`api/ChainMasters/${id}`)
}

export function createChainName(chainName) {
  return axiosInstance.post(`api/ChainMasters`, chainName)
}
