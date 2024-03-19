import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React from "react"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import MessageIcon from "@mui/icons-material/Message"
import ListAltIcon from "@mui/icons-material/ListAlt"

function TaskChecker() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpenModel = () => {
    setOpen(true)
  }
  const handleCloseModel = () => {
    setOpen(false)
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "TaskName", headerName: "Task Name", width: 250 },
    { field: "EmployeeName", headerName: "Employee Name", width: 120 },
    { field: "StartDate", headerName: "Start Date", width: 90 },
    { field: "EndDate", headerName: "End Date", width: 90 },
    {
      field: "See Task Details",
      headerName: "See Task Details",
      description: "See Task Details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/Checker/EmployeeDetails/${params.row.id}`}
        >
          <MessageIcon />
        </Link>
      ),
    },
    {
      field: "Add message To Task",
      headerName: "Add message",
      description: "Add message for checker",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/admin/teamdetails/${params.row.id}`}
        >
          <MessageIcon />
        </Link>
      ),
    },
  ]

  const teams = [
    {
      id: 1,
      TaskName: "news Latest ram mandir news",
      EmployeeName: "Raj",
      StartDate: "10-3-24",
      EndDate: "14-3-24",
    },
    {
      id: 2,
      TaskName: "news sandeep vs Bada bussiness",
      EmployeeName: "Jay",
      StartDate: "11-3-24",
      EndDate: "15-3-24",
    },
    {
      id: 3,
      TaskName: "Elon musk car news",
      EmployeeName: "Jamin",
      StartDate: "12-3-24",
      EndDate: "12-5-24",
    },
  ]

  return (
    <div>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={teams}
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

export default TaskChecker
