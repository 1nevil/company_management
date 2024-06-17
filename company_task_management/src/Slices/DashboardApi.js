import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const getDashBoardData = () => {
  return axiosInstance.get("api/DashBoard/dashBoardDatas")
}
