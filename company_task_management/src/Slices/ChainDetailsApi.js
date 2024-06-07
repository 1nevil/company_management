import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
})

export function insertChainDetailsData(chainDetails) {
  return axiosInstance.post("api/ChainDetails", chainDetails)
}

export function fetchChainDetailChainId(id) {
  // let r = axiosInstance.get(`api/ChainDetails/${id}`)

  // console.log("🚀 ~ fetchChainDetailChainId ~ r:", r)
  return axiosInstance.get(`api/ChainDetails/getChainDetail/${id}`)
}
