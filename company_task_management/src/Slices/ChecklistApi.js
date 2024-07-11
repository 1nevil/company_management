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

export const getChecklistByTaskId = (taskId) => {
  setConfig()
  return axiosInstance.get(`api/ChecklistMasters/getbytask/${taskId}`, config)
}

export const deleteChecklistById = (checklistId) => {
  setConfig()
  return axiosInstance.delete(`api/ChecklistMasters/${checklistId}`, config)
}

export const insertChecklist = (checklist) => {
  setConfig()
  return axiosInstance.post(`api/ChecklistMasters`, checklist, config)
}

export const updateChecklist = (checklist) => {
  setConfig()
  return axiosInstance.put(
    `api/ChecklistMasters/${checklist.ChecklistId}`,
    checklist,
    config
  )
}
