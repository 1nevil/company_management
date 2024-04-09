import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export function fetchEmployeeData() {
  return axiosInstance.get("api/Employees")
}

export function deleteEmpById(id) {
  return axiosInstance.delete(`api/Employees/${id}`)
}

export function createEmp(emp) {
  return axiosInstance.post(`api/Employees`, emp)
}
