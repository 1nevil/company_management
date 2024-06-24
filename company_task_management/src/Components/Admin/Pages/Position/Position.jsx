import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import { Grid, IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PositionForm from "./PositionForm"
import { deletePosition, fetchPosition } from "../../../../Slices/PositionSlice"
import useAlert from "../../../../Hooks/useAlert"
import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"

function Position() {
  const dispatch = useDispatch()
  const { positions, error } = useSelector((state) => state.Position)

  const deletePositionAlert = useAlert(
    deletePosition,
    "Position Deleted Successfully..."
  )

  const handleDelete = (id, position) => {
    deletePositionAlert(id, error)
    // notify(position)
  }

  const handleEdit = (id) => {
    alert(id)
  }

  useEffect(() => {
    dispatch(fetchPosition())
  }, [dispatch])

  const columns = [
    {
      field: "positionName",
      headerName: "Position Name",
      width: 240,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 140,
    },
    {
      field: "durationType",
      headerName: "Duration Type",
      width: 140,
    },
    {
      field: "Position guidlines",
      headerName: "Position guidlines",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link to={`/admin/Positionguidlines/${params.row.positionId}`}>
          <VisibilityIcon></VisibilityIcon>
        </Link>
      ),
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
          <IconButton
            onClick={() =>
              handleDelete(params.row.positionId, params.row.positionName)
            }
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ]

  // Sort positions by createdAt field in descending order
  const sortedPositions = positions
    .slice()
    .sort((a, b) => b.positionId - a.positionId)
  return (
    <>
      <Box style={{ margin: "auto" }}>
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
        <Grid container>
          <Grid item xs={11} sm={12} md={12} sx={{ margin: "auto" }}>
            <DataGrid
              rows={sortedPositions}
              getRowId={(row) => row.positionId}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              initialState={{
                sorting: {
                  sortModel: [{ field: "createdAt", sort: "desc" }],
                },
                pagination: {
                  paginationModel: {
                    pageSize: 20,
                  },
                },
              }}
              pageSizeOptions={[5, 15, 25, 50, 100, 200]}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Position
