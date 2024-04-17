import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import AddIcon from "@mui/icons-material/Add"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import AddChain from "./AddChain"
import { useSelector, useDispatch } from "react-redux"
import { fetchChainMater } from "../../../../Slices/ChainSliceMaster"

function Chain() {
  const [openTeam, setopenTeam] = React.useState(false)
  const dispatch = useDispatch()

  const chainMaster = useSelector((state) => state.Chain.chainMaster)

  useEffect(() => {
    dispatch(fetchChainMater())
  }, [dispatch])

  // const handleDelete = () => {}

  const handleClickOpenDepartment = () => {
    setopenTeam(true)
  }

  const handleClose = () => {
    setopenTeam(false)
  }
  const columns = [
    { field: "chainId", headerName: "Chain ID", width: 90 },
    {
      field: "chainName",
      headerName: "Chain Name",
      width: 500,
      editable: true,
    },
    {
      field: "seeDetails",
      headerName: "See Details",
      description: "Team details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/admin/chaindetails/${params.row.chainId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
  ]

  return (
    <Box>
      <Button
        sx={{ margin: "1rem 0" }}
        variant="contained"
        onClick={handleClickOpenDepartment}
      >
        <AddIcon />
        Add Chain
      </Button>

      <Dialog
        open={openTeam}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <AddChain></AddChain>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        columns={columns}
        rows={chainMaster}
        getRowId={(row) => row.chainId}
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

export default Chain
