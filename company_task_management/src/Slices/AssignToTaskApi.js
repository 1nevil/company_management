import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
})

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

export function updateTaskSubmission(formData, setProgress) {
  setConfig()
  return axiosInstance.put(
    `api/EmpTaskAssignments/PutCompletedFileUpload`,
    formData,
    {
      Authorization: `Bearer ${token}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        setProgress(progress)
      },
    }
  )
}

export function getCompletedTaskForChecker(postionId) {
  setConfig()
  return axiosInstance.get(
    `api/EmpTaskAssignments/getCompletedTaskForChecker/${postionId}`,
    config
  )
}

export function GetTaskAssignDataToChecker(id) {
  setConfig()
  return axiosInstance.get(
    `/api/EmpTaskAssignments/getTaskAssignDataToChecker/${id}`,
    config
  )
}

export function GetTaskHistoryByEmpID(empId) {
  setConfig()
  return axiosInstance.get(`api/EmpTaskHistories/${empId}`, config)
}

export function GetTaskHistoryUsingEmpID(empId) {
  setConfig()
  return axiosInstance.get(`api/TaskMasters/getActiveTask/${empId}`, config)
}

export const approveDisapproveTask = (empAssData) => {
  setConfig()
  return axiosInstance.put(
    `/api/EmpTaskAssignments/approveDisapproveTask`,
    empAssData,
    config
  )
}

export function getCheckerTaskHistory(checkerId) {
  setConfig()
  return axiosInstance.get(
    `api/EmpTaskHistories/getCheckerHistory/${checkerId}`,
    config
  )
}

export function getTaskHistoryDetailsByIdforChecker(taskHistoryId) {
  setConfig()
  return axiosInstance.get(
    `api/EmpTaskHistories/getTaskHistoryDetailsByIdforChecker/${taskHistoryId}`,
    config
  )
}

export const NotCheckedByChecker = (empId) => {
  setConfig()
  return axiosInstance.get(
    `api/EmpTaskAssignments/pendingToCheck/${empId}`,
    config
  )
}

export const getFileFromHistoryToCarryForward = (taskId) => {
  setConfig()
  return axiosInstance.get(
    `api/EmpTaskHistories/GetTaskApprovedTaskFromPreviosEmployee/${taskId}`,
    config
  )
}
