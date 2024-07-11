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

export function insertChainDetailsData(chainDetails) {
  setConfig()
  return axiosInstance.post("api/ChainDetails", chainDetails, config)
}

export function fetchChainDetailChainId(id) {
  setConfig()
  // let r = axiosInstance.get(`api/ChainDetails/${id}`)

  // console.log("🚀 ~ fetchChainDetailChainId ~ r:", r)
  return axiosInstance.get(`api/ChainDetails/getChainDetail/${id}`, config)
}
