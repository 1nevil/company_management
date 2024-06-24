import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import { useDispatch, useSelector } from "react-redux"
import {
  allDisapproveEmps,
  approveDisapproveEmp,
} from "../../Slices/EmployeeSlice"
import { IconButton } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"

function DisapprovedAdmins() {
  const employeess = useSelector((state) => state.Employee.employees)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allDisapproveEmps())
  }, [dispatch])

  const handleClick = (id) => {
    dispatch(approveDisapproveEmp(id))
  }

  const columns = [
    {
      field: "checklist",
      headerName: "Employee Details", // Empty header name
      description: "details",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/superadmin/EmployeeCard/${params.row.employeeId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
    {
      field: "Approve",
      headerName: "Approve",
      description: "Approve",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleClick(params.row.employeeId)}
          title="Edit"
        >
          <CheckCircleOutlinedIcon sx={{ color: "green" }} />
        </IconButton>
      ),
    },
    {
      field: "employeeName",
      headerName: "Name",
      width: 140,
    },
    {
      field: "employeeEmail",
      headerName: "Email",
      width: 180,
    },
    {
      field: "employeeAge",
      headerName: "Age",
      width: 140,
    },
    {
      field: "mobileNumber",
      headerName: "MobileNumber",
      width: 140,
    },
    {
      field: "altmobileNumber",
      headerName: "Birth date",
      width: 140,
    },

    {
      field: "dob",
      headerName: "AdharNumber",
      width: 140,
    },
    {
      field: "adharNumber",
      headerName: "Image",
      width: 140,
    },
    {
      field: "employeeImage",
      headerName: "Resume",
      width: 140,
    },
    {
      field: "employeeResume",
      headerName: "Resume",
      width: 140,
    },
  ]

  return (
    <div>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={employeess}
        columns={columns}
        getRowId={(row) => row.employeeId}
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
    </div>
  )
}

export default DisapprovedAdmins
