import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const increaseTime = (TaskExtenstion) => {
  return axiosInstance.post(
    "api/TaskExtensionRequests/send-task-extension-request",
    TaskExtenstion
  )
}

export const ApproveTaskIncreaseTime = (
  taskExtensionId,
  empTaskAss,
  AdminExtendedTime
) => {
  return axiosInstance.put(`api/TaskExtensionRequests/approve-task-extension`, {
    TaskExtensionId: taskExtensionId,
    EmpTaskAss: empTaskAss,
    AdminExtendedTime: AdminExtendedTime,
  })
}

export const DisApproveTaskIncreaseTime = (taskExtensionId, empTaskAss) => {
  return axiosInstance.put(
    `api/TaskExtensionRequests/disapprove-task-extension/${taskExtensionId}/${empTaskAss}`
  )
}
