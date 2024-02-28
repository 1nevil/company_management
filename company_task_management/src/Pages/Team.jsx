import React from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import MyButton from "../Components/MyButton"
import AddIcon from "@mui/icons-material/Add"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DepartmentForm from "../Components/DepartmentForm"
import Button from "@mui/material/Button"
import AddTeam from "../Components/AddTeam"

function Team() {
  const [openTeam, setopenTeam] = React.useState(false)

  const handleDelete = () => {}

  const handleClickOpenDepartment = () => {
    setopenTeam(true)
  }

  const handleClose = () => {
    setopenTeam(false)
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "teamName",
      headerName: "Team Name",
      width: 150,
      editable: true,
    },
    {
      field: "seeDetails",
      headerName: "See Details",
      description: "Team details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link to={`/teamdetails/${params.row.id}`}>
          <VisibilityIcon />
        </Link>
      ),
    },
  ]

  const teams = [
    { id: 1, teamName: "Team Tiger" },
    { id: 2, teamName: "Team Lions" },
    { id: 3, teamName: "Team database" },
  ]

  return (
    <Box>
      <Button
        sx={{ margin: "1rem 0" }}
        variant="contained"
        onClick={handleClickOpenDepartment}
      >
        <AddIcon />
        Add Team
      </Button>

      <Dialog
        open={openTeam}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <AddTeam></AddTeam>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
    </Box>
  )
}

export default Team
