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
import axios from "axios"; // Import Axios

const autoMargin = {
  margin: "0.5rem 0rem 0.5rem 0rem",
};

const PositionFrom = () => {
  const initValue = {
    PositionName: "",
    duration: "",
    unit: "",
    unitname: "",
    rate: "",
  };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: SubdepartmentSchema,
      onSubmit: (data) => {
        axios
          .post("http://localhost:5036/api/PositionMasters", data)
          .then((response) => {
            alert("Data submitted successfully");
            console.log(response.data);
          })
          .catch((error) => {
            alert("An error occurred while submitting data");
            console.error("Error:", error);
          });
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
            <TextField
              required
              id="PositionName"
              name="PositionName"
              label="Position Name"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
          {errors.PositionName && touched.PositionName ? (
            <Typography variant="caption" color="error">
              {errors.PositionName}
            </Typography>
          ) : null}

          <Box sx={autoMargin}>
            <TextField
              required
              id="duration"
              name="duration"
              label="Duration"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
          {errors.duration && touched.duration ? (
            <Typography variant="caption" color="error">
              {errors.duration}
            </Typography>
          ) : null}

          <Box sx={autoMargin}>
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
              id="unitname"
              name="unitname"
              label="Unitname"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
          {errors.unitname && touched.unitname ? (
            <Typography variant="caption" color="error">
              {errors.unitname}
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

export default PositionFrom;
