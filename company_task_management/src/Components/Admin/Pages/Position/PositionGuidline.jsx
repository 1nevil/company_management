import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  deleteGuidlineById,
  getGuidlinesById,
  insertGuidline,
} from "../../../../Slices/PositionSlice"
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Modal,
  Typography,
} from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import GuidlineForm from "./GuidlineForm"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Grid, useMediaQuery, useTheme } from "@mui/material"
import useAlert from "../../../../Hooks/useAlert"
import { updateGuidlineById } from "../../../../Slices/PositionSlice"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #333333",
  boxShadow: 24,
  p: 4,
}

function PositionGuidline() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { positionid } = useParams()
  const [guidlineForm, setGuidlineForm] = useState(false)
  const [guidlineId, setGuidlineId] = useState()
  const [guidline, setGuidline] = useState()
  const [open, setOpen] = useState(false)
  const [disapprovalMessage, setDisapprovalMessage] = useState("")
  const [guidlineFormInsert, setGuidlineFormInsert] = useState(false)

  const deleteGuidlineAlert = useAlert(
    deleteGuidlineById,
    "Position Deleted Successfully..."
  )

  function handleOpen({ id, name }) {
    setGuidlineId(id)
    setGuidline(name)
    setGuidlineForm(true)
    // dispatch(getGuidlineById(id))
  }

  function handleOpenInsertForm() {
    setGuidlineFormInsert(true)
    setGuidline("")
    // dispatch(getGuidlineById(id))
  }

  function handleCloseInsertForm(reason, event) {
    if (event === "backdropClick") {
      setGuidlineFormInsert(true)
    } else {
      setGuidlineFormInsert(false)
    }
  }

  const handleOpenDisplayMessage = (message) => {
    setDisapprovalMessage(message)
    setOpen(true)
  }

  const handleCloseDisplayMessage = () => {
    setOpen(false)
    setDisapprovalMessage("")
  }

  function handleClose(reason, event) {
    if (event === "backdropClick") {
      setGuidlineForm(true)
    } else {
      setGuidlineForm(false)
    }
  }

  const handleDelete = (positionGuidelineId) => {
    alert(positionGuidelineId)
  }

  const columns = [
    {
      field: "positionGuidline",
      headerName: "Position Guidlines",
      width: 970,
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
            onClick={() =>
              handleOpenDisplayMessage(params.row.positionGuidline)
            }
            title="see"
          >
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
          <IconButton
            onClick={() =>
              handleOpen({
                id: params.row.positionGuidelineId,
                name: params.row.positionGuidline,
              })
            }
            title="Edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => deleteGuidlineAlert(params.row.positionGuidelineId)}
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ]

  const dispatch = useDispatch()
  const { pendding, error, positionGuidline } = useSelector(
    (state) => state.Position
  )

  const { position, guidlines } = positionGuidline || {
    position: {},
    guidlines: [],
  }

  useEffect(() => {
    dispatch(getGuidlinesById(positionid))
  }, [dispatch, positionid])

  return (
    <div>
      <Box mb={2}>
        <Typography variant="h6" component="h5" mt={1} mb={1}>
          Position Guidlines
        </Typography>
        <Button variant="contained" onClick={handleOpenInsertForm}>
          Insert Guidline
        </Button>
      </Box>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {position && (
            <Box
              sx={{
                margin: "1rem",
                padding: "1rem",
                border: "1px solid gray",
                borderRadius: "1rem",
              }}
            >
              <Grid
                container
                spacing={2}
                direction={isMobile ? "column" : "row"}
              >
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Position Name:</strong> {position?.positionName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Duration:</strong> {position?.duration}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Duration Type:</strong> {position?.durationType}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          {guidlines?.length === 0 && !pendding ? (
            <Alert severity="error">No Guidline Found</Alert>
          ) : (
            <Box mt={2}>
              <DataGrid
                columns={columns}
                rows={guidlines}
                getRowId={(row) => row.positionGuidelineId}
                loading={pendding}
                slots={{ toolbar: GridToolbar }}
                initialState={{
                  sorting: {
                    sortModel: [{ field: "createdAt", sort: "desc" }],
                  },
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 15, 25, 50, 100, 200]}
              />
            </Box>
          )}

          <Box>
            <Modal
              open={open}
              onClose={handleCloseDisplayMessage}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box>
                {" "}
                <Box sx={style}>
                  <Typography id="modal-title" variant="h6" component="h2">
                    Guidline
                  </Typography>
                  <Typography id="modal-description" sx={{ mt: 2 }}>
                    {disapprovalMessage}
                  </Typography>
                  <Button onClick={handleCloseDisplayMessage} sx={{ mt: 2 }}>
                    Close
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
        </>
      )}
      <Dialog
        open={guidlineFormInsert}
        onClose={handleCloseInsertForm}
        aria-labelledby="responsive-dialog-title"
      >
        <GuidlineForm
          GuidlineName={guidline}
          GuidlineId={guidlineId}
          PositionId={positionid}
          updateFunction={updateGuidlineById}
          insertFunction={insertGuidline}
          closeform={handleCloseInsertForm}
        ></GuidlineForm>
        <DialogActions>
          <Button autoFocus onClick={handleCloseInsertForm}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={guidlineForm}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <GuidlineForm
          GuidlineName={guidline}
          GuidlineId={guidlineId}
          closeform={handleClose}
          PositionId={positionid}
          updateFunction={updateGuidlineById}
          insertFunction={insertGuidline}
        ></GuidlineForm>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PositionGuidline
