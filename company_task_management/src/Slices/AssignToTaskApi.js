import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5036/",
});

export function updateTaskSubmission({
  taskId,
  empID,
  completedAt,
  fileUpload,
  isActive,
}) {
  console.log({
    taskId: Number(taskId),
    empID,
    completedAt,
    fileUpload,
    isActive,
  });
  const encodedCompletedAt = encodeURIComponent(completedAt);
  const encodedFileUpload = encodeURIComponent(fileUpload);
  return axiosInstance.put(
    `api/EmpTaskAssignments/PutCompletedFileUpload/${taskId}/${empID}?completedAt=${encodedCompletedAt}&fileUpload=${encodedFileUpload}&isActive=${isActive}`
  );
}

export function getCompletedTaskForChecker() {
  return axiosInstance.get("api/EmpTaskAssignments/GetCompletedTaskForChecker");
}

export function GetTaskAssignDataToChecker(id) {
  return axiosInstance.get(
    `/api/EmpTaskAssignments/getTaskAssignDataToChecker/${id}`
  );
}
