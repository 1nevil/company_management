import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import { IconButton } from "@mui/material"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import { useDispatch, useSelector } from "react-redux"
import {
  allApproveEmps,
  approveDisapproveEmp,
} from "../../Slices/EmployeeSlice"
import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"

function ApprovedAdmins() {
  const dispatch = useDispatch()
  const employeess = useSelector((state) => state.Employee.employees)

  useEffect(() => {
    dispatch(allApproveEmps())
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
          to={`/admin/EmployeeCard/${params.row.employeeId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
    {
      field: "Reject",
      headerName: "Reject",
      description: "Reject",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleClick(params.row.employeeId)}
          title="Edit"
        >
          <CancelOutlinedIcon sx={{ color: "red" }} />
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
        getRowId={(row) => row.employeeId}
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
    </div>
  )
}

export default ApprovedAdmins
