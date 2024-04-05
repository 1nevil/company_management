import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Field, useFormik } from "formik";
import { SubdepartmentSchema } from "../../../Validation/validationSchema";

const autoMargin = {
  margin: "0.5rem 0rem 0.5rem 0rem",
};

const SubDepartmentForm = () => {
  const initValue = {
    departmentName: "",
    subdepartmentName: "",
    rate: "",
    unit: "",
    companyId: "",
    time: "",
  };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: SubdepartmentSchema,
      onSubmit: (data) => {
        alert("hello world");
        console.log(data);
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
        <div style={{ textAlign: "center" }}>
          <Typography color="#7986cb" variant="h5" component="h5">
            Add Subdepartment
          </Typography>

          <Box sx={autoMargin}>
            <Select
              as={Select}
              required
              sx={{ width: "14rem" }}
              name="departmentName"
              displayEmpty
              inputProps={{ "aria-label": "Department" }}
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="" disabled>
                Select department
              </MenuItem>
              <MenuItem value={1}>Department 1</MenuItem>
              <MenuItem value={2}>Department 2</MenuItem>
              <MenuItem value={3}>Department 3</MenuItem>
            </Select>
          </Box>
          {errors.departmentName && touched.departmentName ? (
            <Typography variant="caption" color="error">
              {errors.departmentName}
            </Typography>
          ) : null}

          <Box sx={autoMargin}>
            <TextField
              required
              id="subdepartmentName"
              name="subdepartmentName"
              label="Subdepartment Name"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
          {errors.subdepartmentName && touched.subdepartmentName ? (
            <Typography variant="caption" color="error">
              {errors.subdepartmentName}
            </Typography>
          ) : null}

          <Box sx={autoMargin}>
            <TextField
              required
              id="rate"
              name="rate"
              label="Rate"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
          {errors.rate && touched.rate ? (
            <Typography variant="caption" color="error">
              {errors.rate}
            </Typography>
          ) : null}
          <Box>
            <TextField
              required
              id="unit"
              name="unit"
              label="Unit"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
          {errors.unit && touched.unit ? (
            <Typography variant="caption" color="error">
              {errors.unit}
            </Typography>
          ) : null}

          <Box>
            <TextField
              required
              id="time"
              name="time"
              label="time"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
          {errors.time && touched.time ? (
            <Typography variant="caption" color="error">
              {errors.time}
            </Typography>
          ) : null}

          <div>
            <Button
              sx={autoMargin}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Stack>
  );
};

export default SubDepartmentForm;
