import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Divider,
  Grid,
  InputLabel,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material"
import { Box, Stack } from "@mui/system"
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTaskUsingEmpId } from "../../Slices/TaskSlice";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
  getTaskDataAndGuidlinesByTaskId,
  getTaskUsingTaskId,
  getTaskUsingTaskIdAndPostionId,
} from "../../Slices/TaskSlice"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { updateTaskWithCompeletedate } from "../../Slices/AssignToTask"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

function EmpTaskDeatil() {
  const { pending, getActiveTaskDetail, error } = useSelector(
    (state) => state.Tasks
  )
  console.log(getActiveTaskDetail)

  const { task, guidelines } = getActiveTaskDetail

  const { Position: positionId } = useSelector(
    (state) => state.Auth.authicatedUser
  )

  const { taskId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
    console.log(taskId)
    dispatch(getTaskUsingTaskIdAndPostionId({ positionId, taskId }))
  }, [dispatch, positionId, taskId])

  return (
    <div>
      {/* {JSON.stringify(task)} */}
      <Grid container>
        <Grid item xs={4}>
          <Box mt={5} p={4}>
            {guidelines?.map((guideline) => (
              <Box
                key={guideline.positionGuidelineId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  textTransform="capitalize"
                  ml={3}
                >
                  {guideline.positionGuidline}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={7} sx={{ textAlign: "center", margin: "auto" }}>
          <Grid xs={12}>
            <Typography variant="h5">Task Detail</Typography>
            <Box
              mt={5}
              p={4}
              sx={{
                border: "2px solid gray",
                boxShadow: "2px 2px 10px 1px black",
              }}
            >
              {task ? (
                <>
                  <Card
                    sx={{
                      border: "2px solid gray",
                      boxShadow: "2px 2px 10px black",
                    }}
                  >
                    <CardHeader
                      title={`Task Name: ${task.taskName}`}
                      subheader={
                        <>
                          <Typography component="span" variant="body2">
                            Start Date: {task.startDate}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            End Date: {task.endDate}
                          </Typography>
                        </>
                      }
                    />
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Instructions: {task.instructions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Description: {task.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
              ) : error ? (
                <Typography variant="h5" gutterBottom>
                  {error}
                </Typography>
              ) : (
                <Typography variant="h5" gutterBottom>
                  Loading...
                  <Skeleton animation="wave" />
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
    // <Box>
    //   <DataGrid
    //     slots={{ toolbar: GridToolbar }}
    //     rows={tasksByEmpId}
    //     columns={columns}
    //     getRowId={(row) => row.taskId}
    //     initialState={{
    //       pagination: {
    //         paginationModel: {
    //           pageSize: 5,
    //         },
    //       },
    //     }}
    //     pageSizeOptions={[5]}
    //     disableRowSelectionOnClick
    //   />
    //   {/* <ChainDetailsForm
    //     handleCloseDetails={handleCloseChainDetail}
    //     chainDetails={TaskDetails}
    //     chainId={selectedRow}
    //   /> */}
    // </Box>
  )
}
export default EmpTaskDeatil
