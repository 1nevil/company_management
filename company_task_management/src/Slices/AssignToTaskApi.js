import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
});

export function updateTaskSubmission({
  taskId,
  empId,
  completedAt,
  fileUpload,
  isActive,
}) {
  const encodedCompletedAt = encodeURIComponent(completedAt)
  const encodedFileUpload = encodeURIComponent(fileUpload)
  return axiosInstance.put(
    `api/EmpTaskAssignments/PutCompletedFileUpload/${taskId}/${empId}?completedAt=${encodedCompletedAt}&fileUpload=${encodedFileUpload}&isActive=${isActive}`
  );
}

export function getCompletedTaskForChecker(postionId) {
  return axiosInstance.get(
    `api/EmpTaskAssignments/getCompletedTaskForChecker/${postionId}`
  );
}

export function GetTaskAssignDataToChecker(id) {
  return axiosInstance.get(
    `/api/EmpTaskAssignments/getTaskAssignDataToChecker/${id}`
  );
}

export function GetTaskHistoryByEmpID(empId) {
  return axiosInstance.get(`api/EmpTaskHistories/${empId}`);
}

export function GetTaskHistoryUsingEmpID(empId) {
  return axiosInstance.get(`api/TaskMasters/getActiveTask/${empId}`);
}

export const approveDisapproveTask = (empAssData) => {
  return axiosInstance.put(
    `/api/EmpTaskAssignments/approveDisapproveTask`,
    empAssData
  );
};

export function getCheckerTaskHistory(checkerId) {
  return axiosInstance.get(
    `api/EmpTaskHistories/getCheckerHistory/${checkerId}`
  );
}

export function getTaskHistoryDetailsByIdforChecker(taskHistoryId) {
  return axiosInstance.get(
    `api/EmpTaskHistories/getTaskHistoryDetailsByIdforChecker/${taskHistoryId}`
  );
}

export const NotCheckedByChecker = (empId) => {
  return axiosInstance.get(`api/EmpTaskAssignments/pendingToCheck/${empId}`)
}

export const getFileFromHistoryToCarryForward = (taskId) => {
  return axiosInstance.get(
    `api/EmpTaskHistories/GetTaskApprovedTaskFromPreviosEmployee/${taskId}`
  )
}
