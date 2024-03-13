import React, { useState } from "react"
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

const SubDepartmentForm = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    subdepartmentName: "",
    rate: "",
    unit: "",
    companyId: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    // Here you can add logic to submit the form data
  }

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
        <Box sx={{ "& .MuiTextField-root": { m: 3, width: "25ch" } }}>
          <Typography color="#7986cb" variant="h5" component="h5">
            Enter Subdepartment
          </Typography>

          <Select
            required
            sx={{ width: "14rem" }}
            value={formData.departmentName}
            onChange={handleInputChange}
            name="Department"
            displayEmpty
            inputProps={{ "aria-label": "Department" }}
            size="small"
          >
            <MenuItem value="" disabled>
              select department
            </MenuItem>
            <MenuItem value={1}>Department 1</MenuItem>
            <MenuItem value={2}>Department 2</MenuItem>
            <MenuItem value={3}>Department 3</MenuItem>
          </Select>
          <br />
          <TextField
            required
            id="subdepartmentName"
            name="subdepartmentName"
            label="subDepartment Name"
            value={formData.subdepartmentName}
            onChange={handleInputChange}
            size="small"
          />
          <br></br>
          <TextField
            required
            id="rate"
            name="rate"
            label="rate"
            value={formData.rate}
            onChange={handleInputChange}
            size="small"
          />
          <br></br>
          <TextField
            required
            id="unit"
            name="unit"
            label="unit"
            value={formData.unit}
            onChange={handleInputChange}
            size="small"
          />

          <br></br>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Stack>
  )
}

export default SubDepartmentForm
