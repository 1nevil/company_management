import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
})

export function insertChainDetailsData(chainDetails) {
  return axiosInstance.post("api/ChainDetails", chainDetails )
}
