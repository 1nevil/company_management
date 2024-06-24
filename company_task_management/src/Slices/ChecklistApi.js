import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const getChecklistByTaskId = (taskId) => {
  return axiosInstance.get(`api/ChecklistMasters/getbytask/${taskId}`)
}

export const deleteChecklistById = (checklistId) => {
  return axiosInstance.delete(`api/ChecklistMasters/${checklistId}`)
}

export const insertChecklist = (checklist) => {
  return axiosInstance.post(`api/ChecklistMasters`, checklist)
}

export const updateChecklist = (checklist) => {
  console.log(checklist)
  return axiosInstance.put(
    `api/ChecklistMasters/${checklist.ChecklistId}`,
    checklist
  )
}
