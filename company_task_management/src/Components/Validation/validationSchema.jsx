// validationSchema.js
import * as Yup from "yup"

export const DepartmentSchema = Yup.object({
  //departmentName: Yup.string().min(3, "**At least 3 characters").required("**Department name is required"),
})

export const SubdepartmentSchema = Yup.object({
  //departmentName: Yup.string().required("**select any one Department"),
  //subdepartmentName: Yup.string().required("**SubDepartment name is required"),
  rate: Yup.number().required("**Rate name is required"),
  unit: Yup.string().required("**Unit name is required"),
  time: Yup.number().required("date is required"),
})

export const TeamSchema = Yup.object({
  TeamName: Yup.string().required("**TeamName name is required"),
  Employee: Yup.string()
    .required("**Employee name is required")
    .min(2, "TeamName is greater Then 2"),
})

export const EmployeeSchema = Yup.object({
  employeeName: Yup.string().required("**Full Name Name is required"),
  dob: Yup.string().required("**Date of Birth is required"),
  addressEmployee: Yup.string().required("**Address is required"),
  //gender: Yup.string().required("**Gender is required"),
  dateOfJoining: Yup.string().required("**Date of Joining is required"),

  adharNumber: Yup.number("**Only number is valid")
    .required("**Adhar Number is required")
    .typeError("**Only enter number"),
  employeeEmail: Yup.string()
    .email("Invalid email")
    .required("**Email is required"),
  mobileNumber: Yup.string().required("**Mobile Number is required"),
  altmobileNumber: Yup.string().required("only number is required"),
  employeeAge: Yup.number()
    .required("**Age is Required")
    .typeError("**Only enter number"),
  //position: Yup.string().required("position is required"),
})

export const TaskSchema = Yup.object({
  taskName: Yup.string().required("**Task Name is required"),
  rate: Yup.number().required("number is required"),
  unit: Yup.string().required("unit is required"),
  instructions: Yup.string().required("instructions is required"),
  //start_date: Yup.date().required("start_date is required"),
  // end_date_increase_time: Yup.date().required(
  //   "end_date_increase_time is required"
  // ),
  description: Yup.string().required("description is required"),
  //checklist: Yup.string().required("checklist is required"),
  // //teamname: Yup.string().required("teamname is required"),
})

export const PositionSchema = Yup.object({
  PositionName: Yup.string().required("**PositionName name is required"),
  Duration: Yup.string().required("**only number are allow "),
  Unit: Yup.string().required("**unit is required"),
  Unitname: Yup.string().required("**Unitname name is required"),
  Rate: Yup.number().required("**Rate name is required"),
})

export const ChainSchema = Yup.object({
  ChainName: Yup.string().required("**Chainname name is required"),
})
export const ChainDetailSchema = Yup.object({
  chainId: Yup.string().required("**chainId name is required"),
})
