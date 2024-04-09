import React from "react";
import { Box, Button, Stack, Typography, TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import { DepartmentSchema } from "../../../Validation/validationSchema";

const DepartmentForm = () => {
  // const handleSubmit = (values) => {
  //   console.log(values);
  //   // Here you can add logic to submit the form data
  // };

  const initValue = {
    departmentName: "",
  };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: DepartmentSchema,
      onSubmit: (data) => {
        alert("hello world");
        console(data);
      },
    }
  );

  return (
    <Stack
      gap={5}
      direction={["column", "row"]}
      style={{
        padding: "20px",
        borderRadius: "20px",
        display: { sm: "block", md: "flex", lg: "flex" },
        justifyContent: "space-around",
      }}
    >
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <Typography variant="h5" color="#7986cb" component="h5">
          Enter Department
        </Typography>
        <Box sx={{ "& .MuiTextField-root": { m: 3, width: "25ch" } }}>
          <div>
            <TextField
              required
              id="departmentName"
              name="departmentName"
              label="Department Name"
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
          </div>
          <div>
            {errors.departmentName && touched.departmentName ? (
              <Typography variant="caption" color="error">
                {errors.departmentName}
              </Typography>
            ) : null}
          </div>
          {/* <br></br> */}
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "20px" }}
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default DepartmentForm;
