import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import { IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import { Delete, Edit } from "@mui/icons-material"
import { Typography } from "@mui/material"
import EmployeeForm from "./EmployeeForm"
import { useDispatch, useSelector } from "react-redux"
import { deleteEmp, fetchEmp } from "../../../../Slices/EmployeeSlice"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import VisibilityIcon from "@mui/icons-material/Visibility"

function Employee() {
  const dispatch = useDispatch()
  const [openchecklist, setopenchecklist] = React.useState(false)

  const employeess = useSelector((state) => state.Employee.employees)

  const handleDelete = (id, name) => {
    dispatch(deleteEmp(id))
    notify(name)
  }

  const handleEdit = (id) => {
    alert(id)
  }

  useEffect(() => {
    dispatch(fetchEmp())
  }, [dispatch])

  const notify = (name) => toast(name + "is deleted !")

  const columns = [
    {
      field: "checklist",
      headerName: "Employee Card",
      description: "Team details",
      sortable: false,
      width: 160,
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
      field: "employeeId",
      headerName: "id",
      width: 140,
    },
    {
      field: "employeeName",
      headerName: "Name",
      width: 140,
    },
    {
      field: "employeeEmail",
      headerName: "Email",
      width: 140,
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
      headerName: "Alt Mobile No",
      width: 140,
    },

    {
      field: "dob",
      headerName: "Date Of Birth",
      width: 140,
    },
    {
      field: "adharNumber",
      headerName: "Adhar Number",
      width: 140,
    },
    {
      field: "employeeImage",
      headerName: "Image",
      width: 140,
    },
    {
      field: "employeeResume",
      headerName: "Resume",
      width: 140,
    },
    {
      field: "positionName",
      headerName: "Position",
      width: 140,
    },
    {
      field: "rolename",
      headerName: "Role",
      width: 140,
    },

    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row.employeeId)}
            title="Edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() =>
              handleDelete(params.row.employeeId, params.row.employeeName)
            }
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <>
      <Box>
        <ToastContainer />
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
        <DataGrid
          rows={employeess}
          getRowId={(row) => row.employeeId}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 15, 10, 25, 50, 100, 200]}
        />
      </Box>
    </>
  )
}

export default Employee
