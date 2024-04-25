import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" });

export const insertTaskData = (task) => {
  return axiosInstance.post("api/TaskMasters", task);
};

export const getTaskByPostionId = (positionId) => {
  return axiosInstance.get(`api/TaskMasters/getTaskByPostionId/${positionId}`);
};

export const addTaskToAssignById = (Assigntask) => {
  console.log(Assigntask);
  return axiosInstance.post("api/EmpTaskAssignments", Assigntask);
};

export const GetTaskFromAssignTaskByEmpId = (empID) => {
  return axiosInstance.get(`api/EmpTaskAssignments/task/${empID}`);
};

export const getTaskByTaskId = (positionId, taskId) => {
  return axiosInstance.get(`api/TaskMasters/${positionId}/${taskId}`);
};
