import { Box } from "@mui/system"

import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
  getCheckerTaskHistoryByCheckerId,
  getTaskFromHistoryUsingEmpId,
  // updateTaskWithCompeletedate,
} from "../../Slices/AssignToTask"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Alert, Button, Modal, Typography } from "@mui/material"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import DoneAllIcon from "@mui/icons-material/DoneAll"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #333333",
  boxShadow: 24,
  p: 4,
}

function CheckerTaskIsActive() {
  const { pendding, taskHistory, error } = useSelector(
    (state) => state.AssignToTask
  )
  const [open, setOpen] = useState(false)
  const [disapprovalMessage, setDisapprovalMessage] = useState("")
  const { id: checkerId } = useSelector((state) => state.Auth.authicatedUser)

  const handleOpen = (message) => {
    setDisapprovalMessage(message)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setDisapprovalMessage("")
  }

  const dispatch = useDispatch()
  const columns = [
    {
      field: "empTaskHistoryId",
      headerName: "empTaskHistoryId",
      width: 200,
      editable: true,
    },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 500,
      editable: true,
    },
    {
      field: "isApprove",
      headerName: "Disapproval Message",
      description: "Show disapproval message if not approved",
      sortable: false,
      width: 200,
      renderCell: (params) =>
        // 0 means not approved
        params.row.isApprove === "0" ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpen(params.row.message)}
          >
            <ThumbDownOffAltIcon />
          </Button>
        ) : (
          <Button variant="contained" color="success">
            <DoneAllIcon />
          </Button>
        ),
    },
    {
      field: "seeDetails",
      headerName: "See Details",
      description: "Task details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/Checker/CheckerTaskIsActiveDeatils/${params.row.empTaskHistoryId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
  ]

  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
    dispatch(getCheckerTaskHistoryByCheckerId(checkerId))
  }, [dispatch, checkerId])

  return (
    <div>
      {/* {JSON.stringify(task)} */}
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            loading={pendding}
            rows={taskHistory}
            columns={columns}
            getRowId={(row) => row.empTaskHistoryId}
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
          {/* <ChainDetailsForm
          handleCloseDetails={handleCloseChainDetail}
          chainDetails={TaskDetails}
          chainId={selectedRow}
        /> */}
        </Box>
      )}
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box>
            {" "}
            <Box sx={style}>
              <Typography id="modal-title" variant="h6" component="h2">
                Disapproval Message
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                {disapprovalMessage}
              </Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  )
}
export default CheckerTaskIsActive
