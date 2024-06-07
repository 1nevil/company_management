import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const insertTaskData = (task) => {
  return axiosInstance.post("api/TaskMasters", task)
}

export const getAllTask = () => {
  return axiosInstance.get("api/TaskMasters")
}

export const getTaskByPostionId = (positionId) => {
  return axiosInstance.get(`api/TaskMasters/getTaskByPostionId/${positionId}`)
}

export const addTaskToAssignById = (Assigntask) => {
  return axiosInstance.post("api/EmpTaskAssignments/pickTask", Assigntask)
}

export const GetTaskFromAssignTaskByEmpId = (empID) => {
  return axiosInstance.get(`api/EmpTaskAssignments/task/${empID}`)
}

export const getTaskByTaskId = (taskId) => {
  return axiosInstance.get(`api/TaskMasters/${taskId}`)
}

export const getTaskByTaskPositionId = (positionId, taskId) => {
  return axiosInstance.get(`api/TaskMasters/getTask/${positionId}/${taskId}`)
}

export const getTaskAndGuidlinesByTaskId = (taskId) => {
  return axiosInstance.get(`api/TaskMasters/GetGuidlinesTaskDetails/${taskId}`)
}

export const approvedTask = (meptaskId) => {
  return axiosInstance.put(`/api/EmpTaskAssignments/approveTask/${meptaskId}`)
}

export const getHistoryDetailsById = (historyId) => {
  return axiosInstance.get(
    `api/EmpTaskHistories/getTaskHistoryDetailsById/${historyId}`
  )
}
