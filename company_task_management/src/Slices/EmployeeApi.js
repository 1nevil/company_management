import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

let config
let token

function setConfig() {
  token = localStorage.getItem("token")

  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export function fetchEmployeeData() {
  setConfig()
  return axiosInstance.get("api/Employees", config)
}

export function deleteEmpById(id) {
  setConfig()
  return axiosInstance.delete(`api/Employees/${id}`, config)
}

export function updateEmployeeData(id) {
  setConfig()
  return axiosInstance.put(`api/Employees/${id}`, config)
}

export function resetPassword(employeeForm) {
  setConfig()
  return (
    axiosInstance.put(
      `api/Employees/updatePassword/${employeeForm.empId}/${employeeForm.oldPassword}/${employeeForm.newPassword}`
    ),
    config
  )
}

export function createEmp(formData) {
  setConfig()
  return axiosInstance.post(`api/Employees`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for FormData
    },
  })
}

//localhost:5036/api/Employees/approveDisapprove
export function approveNotApprove(id) {
  setConfig()
  return axiosInstance.patch(`api/Employees/approveDisapprove/${id}`, config)
}

export function approvedEmps() {
  setConfig()
  return axiosInstance.get(`api/Employees/approvedEmps/`, config)
}

export function disapprovedEmps() {
  setConfig()
  return axiosInstance.get(`api/Employees/notApprovedEmps/`, config)
}

export function checkersEmps() {
  setConfig()
  return axiosInstance.get(`api/Employees/getCheckers`, config)
}

export function fetchEmployeeDataById(empid) {
  setConfig()
  console.log(empid)
  return axiosInstance.get(`api/Employees/${empid}`, config)
}
