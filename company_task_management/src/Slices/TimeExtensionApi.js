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

export const increaseTime = (TaskExtenstion) => {
  setConfig()
  return axiosInstance.post(
    "api/TaskExtensionRequests/send-task-extension-request",
    TaskExtenstion,
    config
  )
}

export const ApproveTaskIncreaseTime = (
  taskExtensionId,
  empTaskAss,
  AdminExtendedTime
) => {
  setConfig()
  return axiosInstance.put(
    `api/TaskExtensionRequests/approve-task-extension`,
    {
      TaskExtensionId: taskExtensionId,
      EmpTaskAss: empTaskAss,
      AdminExtendedTime: AdminExtendedTime,
    },
    config
  )
}

export const DisApproveTaskIncreaseTime = (taskExtensionId, empTaskAss) => {
  setConfig()
  return axiosInstance.put(
    `api/TaskExtensionRequests/disapprove-task-extension/${taskExtensionId}/${empTaskAss}`,
    config
  )
}
