// validationSchema.js
import * as Yup from "yup";

export const DepartmentSchema = Yup.object({
  departmentName: Yup.string()
    .min(3, "**At least 3 characters")
    .required("**Department name is required"),
});

export const SubdepartmentSchema = Yup.object({
  departmentName: Yup.string().required("**select any one Department"),
  subdepartmentName: Yup.string().required("**SubDepartment name is required"),
  rate: Yup.number().required("**Rate name is required"),
  unit: Yup.string().required("**Unit name is required"),
  time: Yup.number().required("date is required"),
});

export const TeamSchema = Yup.object({
  TeamName: Yup.string().required("**TeamName name is required"),
  Employee: Yup.string()
    .required("**Employee name is required")
    .min(2, "TeamName is greater Then 2"),
});

export const EmployeeSchema = Yup.object({
  firstName: Yup.string().required("**First Name is required"),
  lastName: Yup.string().required("**Last Name is required"),
  surname: Yup.string().required("**surname Name is required"),
  dob: Yup.string().required("**Date of Birth is required"),
  address: Yup.string().required("**Address is required"),
  gender: Yup.string().required("**Gender is required"),
  dateOfJoining: Yup.string().required("**Date of Joining is required"),
  department: Yup.string().required("**Department is required"),
  subDepartment: Yup.string(),
  adharNo: Yup.string().required("**Adhar Number is required"),
  email: Yup.string().email("Invalid email").required("**Email is required"),
  mobileNo: Yup.string().required("**Mobile Number is required"),
  alternateMobileNo: Yup.string().required("only number is required"),
  // employeeImage: Yup.string().string("image is required"),
  // employeeResume: Yup.string().string("resume is required"),
});

export const TaskSchema = Yup.object({
  taskName: Yup.string().required("**Task Name is required"),
  rate: Yup.number().required("number is required"),
  role_id: Yup.string(),
  task_dependency: Yup.string().required("task_dependency is required"),
  unit: Yup.string().required("unit is required"),
  instructions: Yup.string().required("instructions is required"),
  start_date: Yup.date().required("start_date is required"),
  end_date_increase_time: Yup.date().required(
    "end_date_increase_time is required"
  ),
  employee_id: Yup.string().required("employee_id is required"),
  description: Yup.string().required("description is required"),
  department: Yup.string().required("department is required"),
  subdepartment_id: Yup.string().required("subdepartment_id is required"),
  task_status: Yup.string().required("task_status is required"),
  duration: Yup.string().required("duration is required"),
  checklist: Yup.string().required("checklist is required"),
  set_Reminder: Yup.string().required("set_Reminder is required"),
  teamname: Yup.string().required("teamname is required"),
});
