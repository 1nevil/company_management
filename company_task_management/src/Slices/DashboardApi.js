import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const getDashBoardData = () => {
  return axiosInstance.get("api/DashBoard/dashBoardDatas")
}

export const getEmployeeDashBoardData = (empId) => {
  return axiosInstance.get(`api/DashBoard/employeeDashboard/${empId}`)
}

export const getCheckerDashBoardData = (checkerId) => {
  return axiosInstance.get(`api/DashBoard/checkerDashboard/${checkerId}`)
}

export const getSuperAdminDashBoardData = () => {
  return axiosInstance.get(`api/DashBoard/superAdminDashBoard`)
}
