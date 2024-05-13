import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import { IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PositionForm from "./PositionForm"
import { deletePosition, fetchPosition } from "../../../../Slices/PositionSlice"

function Position() {
  const dispatch = useDispatch()
  const Positions = useSelector((state) => state.Position.positions)

  const handleDelete = (id, position) => {
    dispatch(deletePosition(id))
    notify(position)
  }

  const handleEdit = (id) => {
    alert(id)
  }

  useEffect(() => {
    dispatch(fetchPosition())
  }, [dispatch])

  const notify = (position) => toast(position + " is deleted !")

  const columns = [
    {
      field: "positionName",
      headerName: "Position Name",
      width: 140,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 140,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 140,
    },
    {
      field: "unitName",
      headerName: "Unit Name",
      width: 140,
    },
    {
      field: "rate",
      headerName: "Rate Per Unit",
      width: 140,
      valueFormatter: (params) => `${params.value} Rs`,
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
            onClick={() => handleEdit(params.row.positionId)}
            title="Edit"
          >
            <Edit />
          </IconButton>
          {/* <IconButton
            onClick={() =>
              handleDelete(params.row.positionId, params.row.positionName)
            }
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton> */}
        </>
      ),
    },
  ]

  return (
    <>
      <Box>
        <ToastContainer />
        <PositionForm></PositionForm>
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          color="primary"
          mb={2}
        >
          Position
        </Typography>
        <DataGrid
          rows={Positions}
          getRowId={(row) => row.positionId}
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

export default Position
