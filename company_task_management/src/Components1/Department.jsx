import React, { useState } from 'react';
import { Box, Button, Container, MenuItem, Select, TextField, Menu, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Department = () => {
  const [formData, setFormData] = useState({
    departmentName: '',
    companyId: '',
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Here you can add logic to submit the form data
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ backgroundColor: "lightgray", padding: "20px", borderRadius: "20px" }}>
      <Container sx={{ backgroundColor: "white", padding: "20px", borderRadius: "20px", width: "fit-content", boxShadow: "-10px -10px 10px gray" }}>
        <IconButton
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          style={{ float: 'right' }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {/* Add menu items here */}
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        </Menu>
        <form onSubmit={handleSubmit}>
          <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
            <TextField
              required
              id="departmentName"
              name="departmentName"
              label="Department Name"
              value={formData.departmentName}
              onChange={handleInputChange}
            />
            <Select
              required
              value={formData.companyId}
              onChange={handleInputChange}
              name="companyId"
              displayEmpty
              inputProps={{ 'aria-label': 'Company ID' }}
            >
              <MenuItem value="" disabled>
                Company ID
              </MenuItem>
              <MenuItem value={1}>Company 1</MenuItem>
              <MenuItem value={2}>Company 2</MenuItem>
              <MenuItem value={3}>Company 3</MenuItem>
              {/* Add more companies as needed */}
            </Select>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Box>
        </form>
      </Container>
    </div>
  )
}

export default Department;
