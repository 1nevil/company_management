import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

let config

function setConfig() {
  const token = localStorage.getItem("token")

  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const getDashBoardData = () => {
  setConfig()
  return axiosInstance.get("api/DashBoard/dashBoardDatas", config)
}

export const getEmployeeDashBoardData = (empId) => {
  setConfig()
  return axiosInstance.get(`api/DashBoard/employeeDashboard/${empId}`, config)
}

export const getCheckerDashBoardData = (checkerId) => {
  setConfig()
  return axiosInstance.get(
    `api/DashBoard/checkerDashboard/${checkerId}`,
    config
  )
}

export const getSuperAdminDashBoardData = () => {
  setConfig()
  return axiosInstance.get(`api/DashBoard/superAdminDashBoard`, config)
}
