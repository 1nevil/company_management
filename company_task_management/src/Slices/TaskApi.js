import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const insertTaskData = (task) => {
  axiosInstance.post("api/TaskMasters", task)
}
