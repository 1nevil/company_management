import React from "react";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";

const DepartmentForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
    // Here you can add logic to submit the form data
  };

  const validate = (values) => {
    const errors = {};
    if (!values.departmentName) {
      errors.departmentName = "Department name is required";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        departmentName: "",
      }}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {({ isSubmitting }) => (
        <Form>
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
            <div style={{ textAlign: "center" }}>
              <Typography variant="h5" color="#7986cb" component="h5">
                Enter Department
              </Typography>
              <Box sx={{ "& .MuiTextField-root": { m: 3, width: "25ch" } }}>
                <Field
                  required
                  type="text"
                  id="departmentName"
                  name="departmentName"
                  label="Department Name"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="departmentName"
                  component="div"
                  style={{ color: "red" }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "20px" }}
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default DepartmentForm;
