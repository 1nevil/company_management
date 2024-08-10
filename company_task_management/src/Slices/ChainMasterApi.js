import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
})

let config

function setConfig() {
  const token = localStorage.getItem("token")

  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export function fetchChainData() {
  setConfig()
  return axiosInstance.get("api/ChainMasters", config)
}

export function deleteChainById(id) {
  setConfig()
  return axiosInstance.delete(`api/ChainMasters/${id}`, config)
}

export function createChainName(chainName) {
  setConfig()
  return axiosInstance.post(`api/ChainMasters`, chainName, config)
}
