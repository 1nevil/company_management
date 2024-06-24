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

export const AddEmployeeSchema = Yup.object({
  firstName: Yup.string().required("**First Name is required"),
  //employeeImage: Yup.string().required("**required field"),
  //employeeResume: Yup.string().required("**required field"),
  //adharImage: Yup.string().required("**required field"),
  //signImage: Yup.string().required("**required field"),

  lastName: Yup.string().required("**Last Name is required"),
  surname: Yup.string().required("**SurName is required"),
  addressEmployee: Yup.string().required("**Address is required"),
  dob: Yup.string().required("**Date of Birth is required"),
  bankName: Yup.string().required("**Bank Name is required"),
  accountHolderName: Yup.string().required(
    "**Account  Holder Name is required"
  ),
  accountNo: Yup.string()
    .matches(/^\d+$/, "Account number must contain only digits")
    .required("Account Number is required"),
  // employeePassword: Yup.string()
  //   .min(8, "Password must be at least 8 characters")
  //   .required("**Password  is required"),

  dateOfJoining: Yup.string().required("**Date of joining  is required"),
  //positionId: Yup.string().required("**Position  is required"),
  roleId: Yup.string().required("**Role  is required"),

  xender: Yup.string().required("**select your gender"),

  ifscCode: Yup.string()
    .matches(/^\w{4}0\w{6}$/, "Invalid IFSC code format")
    .required("IFSC is required"),
  branchName: Yup.string().required("**Branch Name is required"),
  upiId: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format")
    .required("UPI ID is required"),
  additionalInputs: Yup.array().of(
    Yup.object().shape({
      ClientCompanyName: Yup.string().required("Required"),
      ServiceCategoryName: Yup.string().required("Required"),
      PhoneNumber: Yup.string().required("Required"),
    })
  ),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("employeePassword"), null], "Passwords must match")
  //   .required("Confirm Password is required"),
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
  // employeeAge: Yup.number()
  //   .required("**Age is Required")
  //   .typeError("**Only enter number")
  //   .min(18, "**Employee must be at least 18 years old"),
})

export const EmployeeSchema = Yup.object({
  firstName: Yup.string().required("**First Name is required"),
  //employeeImage: Yup.string().required("**required field"),
  //employeeResume: Yup.string().required("**required field"),
  //adharImage: Yup.string().required("**required field"),
  //signImage: Yup.string().required("**required field"),

  lastName: Yup.string().required("**Last Name is required"),
  surname: Yup.string().required("**SurName is required"),
  addressEmployee: Yup.string().required("**Address is required"),
  dob: Yup.string().required("**Date of Birth is required"),
  bankName: Yup.string().required("**Bank Name is required"),
  accountHolderName: Yup.string().required(
    "**Account  Holder Name is required"
  ),
  accountNo: Yup.string()
    .matches(/^\d+$/, "Account number must contain only digits")
    .required("Account Number is required"),
  employeePassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("**Password  is required"),

  dateOfJoining: Yup.string().required("**Date of joining  is required"),
  positionId: Yup.string().required("**Position  is required"),
  roleId: Yup.string().required("**Role  is required"),

  xender: Yup.string().required("**select your gender"),

  ifscCode: Yup.string()
    .matches(/^\w{4}0\w{6}$/, "Invalid IFSC code format")
    .required("IFSC is required"),
  branchName: Yup.string().required("**Branch Name is required"),
  upiId: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format")
    .required("UPI ID is required"),
  additionalInputs: Yup.array().of(
    Yup.object().shape({
      ClientCompanyName: Yup.string().required("Required"),
      ServiceCategoryName: Yup.string().required("Required"),
      PhoneNumber: Yup.string().required("Required"),
    })
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("employeePassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
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
  // employeeAge: Yup.number()
  //   .required("**Age is Required")
  //   .typeError("**Only enter number")
  //   .min(18, "**Employee must be at least 18 years old"),
})

export const TaskSchema = Yup.object({
  taskName: Yup.string().required("**Task Name is required"),
  description: Yup.string().required("Description is required"),
  // formStatus: Yup.string().required("Please select a reminder type"),
  // startDate: Yup.date().when("formStatus", {
  //   is: "closed",
  //   then: Yup.date().required("Start Date is required"),
  //   otherwise: Yup.date().notRequired(),
  // }),
  // endDate: Yup.date().when(["formStatus", "startDate"], {
  //   is: (formStatus, startDate) => formStatus === "closed" && startDate,
  //   then: Yup.date()
  //     .required("End Date is required")
  //     .min(Yup.ref("startDate"), "End Date must be after Start Date"),
  //   otherwise: Yup.date().notRequired(),
  // }),
  // durationNum: Yup.number().when("formStatus", {
  //   is: "open",
  //   then: Yup.number()
  //     .required("Duration Number is required")
  //     .positive("Duration Number must be a positive number"),
  //   otherwise: Yup.number().notRequired(),
  // }),
  // durationType: Yup.string().when("formStatus", {
  //   is: "open",
  //   then: Yup.string().required("Duration Type is required"),
  //   otherwise: Yup.string().notRequired(),
  // }),
})

export const PositionSchema = Yup.object({
  positionName: Yup.string().required("**PositionName name is required"),
  duration: Yup.string().required("**only number are allow "),
  durationType: Yup.string().required("**Duration Type is required"),
})

export const GuidlineSchema = Yup.object({
  guidline: Yup.string().required("**Guidline  is required"),
})

export const checklistSchema = Yup.object({
  checklist: Yup.string().required("**Guidline  is required"),
})

export const ChainSchema = Yup.object({
  ChainName: Yup.string().required("**Chainname name is required"),
})
export const ChainDetailSchema = Yup.object({
  chainId: Yup.string().required("**chainId name is required"),
})

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
})
