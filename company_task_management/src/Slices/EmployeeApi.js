import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" });

export function fetchEmployeeData() {
  return axiosInstance.get("api/Employees");
}

export function deleteEmpById(id) {
  return axiosInstance.delete(`api/Employees/${id}`);
}

export function createEmp(emp) {
  return axiosInstance.post(`api/Employees`, emp);
}

//localhost:5036/api/Employees/approveDisapprove
export function approveNotApprove(id) {
  return axiosInstance.patch(`api/Employees/approveDisapprove/${id}`);
}

export function approvedEmps() {
  return axiosInstance.get(`api/Employees/approvedEmps/`);
}

export function disapprovedEmps() {
  return axiosInstance.get(`api/Employees/notApprovedEmps/`);
}

export function checkersEmps() {
  return axiosInstance.get(`api/Employees/getCheckers`);
}

export function fetchEmployeeDataById(empid) {
  console.log(empid);
  return axiosInstance.get(`api/Employees/${empid}`);
}
