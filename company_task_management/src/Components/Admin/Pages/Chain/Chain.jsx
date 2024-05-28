import React, { useEffect, useState } from "react"
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
import ChainDetailsForm from "./ChainDetailsForm"
import { IconButton } from "@mui/material"

function Chain() {
  const [chain, setChain] = useState(false)
  const [chainDetails, setChainDetails] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const dispatch = useDispatch()

  const chainMaster = useSelector((state) => state.Chain.chainMaster)

  const handleOpenChainDetail = () => {
    setChainDetails(true)
  }

  const handleCloseChainDetail = () => {
    setChainDetails(false)
  }

  const handleCloseChain = () => {
    setChain(false)
  }

  const handleOpenChain = () => {
    setChain(true)
  }
  useEffect(() => {
    dispatch(fetchChainMater())
  }, [dispatch])

  // const handleDelete = () => {}

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
    {
      field: "Add Chain Details",
      headerName: "Add Chain Details",
      description: "Add Chain Details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <IconButton aria-label="add Details">
          <AddIcon
            onClick={() => {
              handleOpenChainDetail()
              setSelectedRow(params.row.chainId)
            }}
          />
        </IconButton>
      ),
    },
  ]
  return (
    <Box>
      <Button
        sx={{ margin: "0 0 0.7rem 0" }}
        variant="contained"
        onClick={handleOpenChain}
      >
        <AddIcon />
        Add Chain
      </Button>

      <Dialog
        open={chain}
        onClose={handleCloseChain}
        aria-labelledby="responsive-dialog-title"
      >
        <AddChain closeform={handleCloseChain}></AddChain>
        <DialogActions>
          <Button autoFocus onClick={handleCloseChain}>
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
        pageSizeOptions={[5, 15, 10, 25, 50, 100, 200]}
        disableRowSelectionOnClick
      />
      <ChainDetailsForm
        handleCloseDetails={handleCloseChainDetail}
        chainDetails={chainDetails}
        chainId={selectedRow}
      />
    </Box>
  )
}

export default Chain
