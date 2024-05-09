// validationSchema.js
import * as Yup from "yup";

export const DepartmentSchema = Yup.object({
  //departmentName: Yup.string().min(3, "**At least 3 characters").required("**Department name is required"),
});

export const SubdepartmentSchema = Yup.object({
  //departmentName: Yup.string().required("**select any one Department"),
  //subdepartmentName: Yup.string().required("**SubDepartment name is required"),
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
  surname: Yup.string().required("**SurName is required"),
  addressEmployee: Yup.string().required("**Address is required"),
  dob: Yup.string().required("**Date of Birth is required"),
  bankName: Yup.string().required("**Bank Name is required"),
  accountHolderName: Yup.string().required(
    "**Account  Holder Name is required"
  ),
  accountNo: Yup.number().required("**Account Number  is required"),
  ifscCode: Yup.string().required("**IFSC is required"),
  branchName: Yup.string().required("**Branch Name is required"),
  upiId: Yup.string()
    .matches(/^\d+$/, "UPI ID must contain only digits")
    .required("UPI ID is required"),
  adharNumber: Yup.string()
    .matches(/^[0-9]{12}$/, "Adhar No must be 12 digits")
    .required("Adhar No is required"),
  employeeEmail: Yup.string()
    .email("Invalid email")
    .required("**Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile No must be 10 digits")
    .required("**Mobile Number is required"),
  altmobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile No must be 10 digits")
    .required("only number is required"),
  employeeAge: Yup.number()
    .required("**Age is Required")
    .typeError("**Only enter number"),
});

export const TaskSchema = Yup.object({
  taskName: Yup.string().required("**Task Name is required"),
  // rate: Yup.number().required("number is required"),
  // unit: Yup.string().required("unit is required"),
  instructions: Yup.string().required("instructions is required"),
  //start_date: Yup.date().required("start_date is required"),
  // end_date_increase_time: Yup.date().required(
  //   "end_date_increase_time is required"
  // ),
  description: Yup.string().required("description is required"),
  //checklist: Yup.string().required("checklist is required"),
  // //chainid: Yup.string().required("teamname is required"),
});

export const PositionSchema = Yup.object({
  positionName: Yup.string().required("**PositionName name is required"),
  duration: Yup.string().required("**only number are allow "),
  unit: Yup.string().required("**unit is required"),
  unitName: Yup.string().required("**Unitname name is required"),
  rate: Yup.number().required("**Rate name is required"),
});

export const ChainSchema = Yup.object({
  ChainName: Yup.string().required("**Chainname name is required"),
});
export const ChainDetailSchema = Yup.object({
  chainId: Yup.string().required("**chainId name is required"),
});

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
