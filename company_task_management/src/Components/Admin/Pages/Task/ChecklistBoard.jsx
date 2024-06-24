import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteChecklistByChecklistId,
  getchecklistsByTaskId,
  insertChecklistTask,
  updateChecklistById,
} from "../../../../Slices/ChecklistSlice"
import { Typography } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Modal,
} from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Grid, useMediaQuery, useTheme } from "@mui/material"
import useAlert from "../../../../Hooks/useAlert"
import ChecklistForm from "./ChecklistForm"

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

function ChecklistBoard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { taskid } = useParams()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    status: "",
  })
  const [checklistId, setCheckListId] = useState()
  const [checklistName, setCheckListName] = useState("")

  const [checklistForm, setChecklistForm] = useState(false)
  const [checklistInsertForm, setCheckInsertForm] = useState(false)
  const [status, setStatus] = useState("")

  function handleOpen({ id, name, status }) {
    console.log({ id, name, status })
    setCheckListId(id)
    setCheckListName(name)
    setStatus(status)
    setChecklistForm(true)
    // dispatch(getGuidlineById(id))
  }

  function handleClose(reason, event) {
    if (event === "backdropClick") {
      setChecklistForm(true)
    } else {
      setChecklistForm(false)
    }
  }

  function handleOpenInsertForm() {
    setCheckInsertForm(true)
    setCheckListName("")
    // dispatch(getGuidlineById(id))
  }

  function handleCloseInsertForm(reason, event) {
    if (event === "backdropClick") {
      setCheckInsertForm(true)
    } else {
      setCheckInsertForm(false)
    }
  }

  const handleOpenDisplayMessage = (data) => {
    setStatusMessage({ message: data.message, status: data.status })
    setOpen(true)
  }

  const handleCloseDisplayMessage = () => {
    setOpen(false)
    setStatusMessage({})
  }

  const { pending, error, taskWithChecklist } = useSelector(
    (state) => state.CheckList
  )

  const { task, checklists } = taskWithChecklist || {
    task: {},
    checklists: [],
  }

  useEffect(() => {
    dispatch(getchecklistsByTaskId(taskid))
  }, [dispatch, taskid])

  const deleteCheckListAlert = useAlert(
    deleteChecklistByChecklistId,
    "Checklist Deleted Successfully..."
  )

  const columns = [
    {
      field: "taskMessage",
      headerName: "Checklist",
      width: 870,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
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
              handleOpenDisplayMessage({
                message: params.row.taskMessage,
                status: params.row.status,
              })
            }
            title="see"
          >
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
          <IconButton
            onClick={() =>
              handleOpen({
                id: params.row.checklistId,
                name: params.row.taskMessage,
                status: params.row.status,
              })
            }
            title="Edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => deleteCheckListAlert(params.row.checklistId)}
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <div>
      <div>
        <Box mb={2}>
          <Typography variant="h6" component="h5" mt={1} mb={1}>
            Task Checklist
          </Typography>
          <Button variant="contained" onClick={handleOpenInsertForm}>
            Insert CheckList
          </Button>
        </Box>
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            {task && (
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
                      <strong>Task Name:</strong> {task?.taskName}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
            {checklists?.length === 0 && !pending ? (
              <Alert severity="error">No Guidline Found</Alert>
            ) : (
              <Box mt={2}>
                <DataGrid
                  columns={columns}
                  rows={checklists}
                  getRowId={(row) => row.checklistId}
                  loading={pending}
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
                      Checklist
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                      <p>Message : {statusMessage.message}</p>
                      <p style={{ marginTop: "1rem" }}>
                        status :{statusMessage.status}
                      </p>
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
          open={checklistInsertForm}
          onClose={handleCloseInsertForm}
          aria-labelledby="responsive-dialog-title"
        >
          <ChecklistForm
            checkListName={checklistName}
            checklistId={checklistId}
            taskId={taskid}
            taskStatus={status}
            // updateFunction={updateGuidlineById}
            insertFunction={insertChecklistTask}
            closeform={handleCloseInsertForm}
          ></ChecklistForm>
          <DialogActions>
            <Button autoFocus onClick={handleCloseInsertForm}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={checklistForm}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <ChecklistForm
            checkListName={checklistName}
            checklistId={checklistId}
            taskId={taskid}
            taskStatus={status}
            updateFunction={updateChecklistById}
            closeform={handleClose}
          ></ChecklistForm>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default ChecklistBoard
