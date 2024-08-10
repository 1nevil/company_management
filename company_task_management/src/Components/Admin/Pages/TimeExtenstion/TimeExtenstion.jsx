import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"

import { useSelector, useDispatch } from "react-redux"
import { getallextestionrequestForTime } from "../../../../Slices/TaskSlice"
import {
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import {
  DisapprovetaskTimeextension,
  approvetaskTimeextension,
} from "../../../../Slices/TimeExtensionSlice"
import { toast } from "react-toastify"

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
function TimeExtenstion() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getallextestionrequestForTime())
  }, [dispatch])

  const { taskextenstionreqest } = useSelector((state) => state.Tasks)
  console.log(taskextenstionreqest)
  const [extensionRequest, setExtensionRequest] = useState({})
  const [open, setOpen] = useState(false)
  const [opentimeinc, setOpentimeinc] = useState(false)
  const [hrWantToExtend, setHrWantToExtend] = useState("")
  const [message, setMessage] = useState("")
  const [dataparams, setDataparams] = useState({})
  const handleOpentimeincrese = () => setOpentimeinc(true)
  const handleClosetimeincrese = () => setOpentimeinc(false)

  const handleOpenModel = (extensionReq) => {
    setExtensionRequest(extensionReq)
    setOpen(true)
  }

  const handleCloseModel = () => {
    setOpen(false)
    setExtensionRequest({})
  }

  const handleApprovetime = (params) => {
    const data = {
      taskExtensionId: params.requestId,
      empTaskAss: params.empTaskAss,
    }
    dispatch(approvetaskTimeextension(data))
  }

  const handleDisApprovetime = (params) => {
    const data = {
      taskExtensionId: params.requestId,
      empTaskAss: params.empTaskAss,
    }
    dispatch(DisapprovetaskTimeextension(data))
    console.log(data)
  }

  const notifySubmit = () => toast.success("Time is Increase Successfully")
  const handleClickToIncreaseTime = () => {
    const data = {
      taskExtensionId: dataparams.requestId,
      empTaskAss: dataparams.empTaskAss,
      AdminExtendedTime: Number(hrWantToExtend),
    }
    console.log(data)
    dispatch(approvetaskTimeextension(data)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notifySubmit()
      }
    })
    console.log("hello")
  }
  const columns = [
    {
      field: "taskName",
      headerName: "Task Name",
      width: 150,
      editable: true,
    },
    {
      field: "employeeName",
      headerName: "employeeName",
      width: 170,
      editable: true,
    },
    {
      field: "requestedAt",
      headerName: "Requested At",
      width: 200,
      editable: true,
    },
    {
      field: "hrWantToExtend",
      headerName: "Hr Want To Extend",
      width: 90,
      editable: true,
    },
    {
      field: "message",
      headerName: "Message",
      width: 350,
      editable: true,
    },
    {
      field: "Action",
      headerName: "See More",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenModel(params.row)} title="see">
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
          <IconButton
            onClick={() => handleApprovetime(params.row)}
            title="Approve"
          >
            <CheckCircleOutlinedIcon sx={{ color: "green" }} />
          </IconButton>
          <IconButton
            onClick={() => handleDisApprovetime(params.row)}
            title="DissApprove"
          >
            <CancelOutlinedIcon sx={{ color: "red" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpentimeincrese()
              setDataparams(params.row)
            }}
            title="Approve With Time"
          >
            <AddCircleOutlineIcon sx={{ color: "yellowgreen" }} />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <Box>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        columns={columns}
        rows={taskextenstionreqest}
        getRowId={(row) => row.requestId}
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
      <Modal
        open={open}
        onClose={handleCloseModel}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box>
          <Box sx={style}>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Task Extension Request
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Task Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {extensionRequest.taskName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1">Employee Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {extensionRequest.employeeName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1">Requested At:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {extensionRequest.requestedAt}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  Hour Want To Extend:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {extensionRequest.hrWantToExtend}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1">Message:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {extensionRequest.message}
                </Typography>
              </Grid>
            </Grid>
            <Button
              onClick={handleCloseModel}
              sx={{
                mt: 2,
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={opentimeinc}
        onClose={handleClosetimeincrese}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box mt={1}>
            <TextField
              fullWidth
              type="number"
              label="Enter Time In Hours"
              name="hrWantToExtend"
              value={hrWantToExtend}
              required
              onChange={(e) => setHrWantToExtend(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <Button
              // taskId={EmpTask}
              // empId={Employee}
              onClick={handleClickToIncreaseTime}
              fullWidth
              variant="contained"
            >
              Increase Time
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default TimeExtenstion
