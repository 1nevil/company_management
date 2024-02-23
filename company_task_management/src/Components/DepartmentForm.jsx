import React, { useState } from "react";
import {
  Box,
  Button,
  //MenuItem,
  Paper,
  //Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    subdepartmentName: "",
    rate: "",
    unit: "",
    companyId: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Here you can add logic to submit the form data
  };

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
          <TextField
            required
            id="departmentName"
            name="departmentName"
            label="Department Name"
            value={formData.departmentName}
            onChange={handleInputChange}
            size="small"
          />

          <br></br>
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
