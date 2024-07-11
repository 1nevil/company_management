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

export const insertTaskData = (task) => {
  setConfig()
  return axiosInstance.post("api/TaskMasters", task, config)
}

export const getAllTask = () => {
  setConfig()
  return axiosInstance.get("api/TaskMasters", config)
}

export const getTaskByPostionId = (positionId) => {
  setConfig()
  return axiosInstance.get(
    `api/TaskMasters/getTaskByPostionId/${positionId}`,
    config
  )
}

export const addTaskToAssignById = (Assigntask) => {
  setConfig()
  return axiosInstance.post(
    "api/EmpTaskAssignments/pickTask",
    Assigntask,
    config
  )
}

export const GetTaskFromAssignTaskByEmpId = (empID) => {
  setConfig()
  return axiosInstance.get(`api/EmpTaskAssignments/task/${empID}`, config)
}

export const getTaskByTaskId = (taskId) => {
  setConfig()
  return axiosInstance.get(`api/TaskMasters/${taskId}`, config)
}

export const deleteTaskByTaskId = (taskId) => {
  setConfig()
  return axiosInstance.delete(`api/TaskMasters/${taskId}`, config)
}

export const getTaskByTaskPositionId = (positionId, taskId) => {
  setConfig()
  return axiosInstance.get(
    `api/TaskMasters/getTask/${positionId}/${taskId}`,
    config
  )
}

export const getTaskAndGuidlinesByTaskId = (taskId) => {
  setConfig()
  return axiosInstance.get(
    `api/TaskMasters/GetGuidlinesTaskDetails/${taskId}`,
    config
  )
}

export const approvedTask = (meptaskId) => {
  setConfig()
  return axiosInstance.put(
    `/api/EmpTaskAssignments/approveTask/${meptaskId}`,
    config
  )
}

export const getHistoryDetailsById = (historyId) => {
  setConfig()
  return axiosInstance.get(
    `api/EmpTaskHistories/getTaskHistoryDetailsById/${historyId}`,
    config
  )
}
