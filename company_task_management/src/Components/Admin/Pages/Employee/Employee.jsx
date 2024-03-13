import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React from "react"
import Box from "@mui/material/Box"
import { IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { Typography } from "@mui/material"
import EmployeeForm from "./EmployeeForm"

function Employee() {
  const handleDelete = (id) => {
    alert(id)
  }

  const handleEdit = (id) => {
    alert(id)
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 50,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 50,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 50,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} title="Edit">
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ]

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 11 },
    { id: 6, lastName: "Melisandre", firstName: "Arya", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ]
  return (
    <>
      <EmployeeForm></EmployeeForm>
      <Typography
        variant="h6"
        component="h6"
        textAlign="center"
        color="primary"
        mb={2}
      >
        Employees
      </Typography>
      <Box sx={{ height: 400, width: "auto" }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}

export default Employee
