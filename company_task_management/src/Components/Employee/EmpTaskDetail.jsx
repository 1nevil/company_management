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
} from "@mui/material";
import { Box, Stack } from "@mui/system";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTaskUsingEmpId } from "../../Slices/TaskSlice";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTaskUsingTaskId } from "../../Slices/TaskSlice";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { updateTaskWithCompeletedate } from "../../Slices/AssignToTask";

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
});

function EmpTaskDeatil(params) {
  const { task, guidelines } = useSelector((state) => state.Tasks.tasks);
  const { pending, error } = useSelector((state) => state.Tasks);

  const [completedGuidelines, setCompletedGuidelines] = useState([]);
  const [incompleteGuidelines, setIncompleteGuidelines] = useState([]);
  const [fileUpload, setFileUpload] = useState("");
  const empID = 9;

  const { taskId } = useParams();
  console.log(taskId);
  const dispatch = useDispatch();

  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
    dispatch(getTaskUsingTaskId({ positionId: 2, taskId: taskId }));
  }, [dispatch, taskId]);

  useEffect(() => {
    const storedCompletedGuidelines =
      JSON.parse(localStorage.getItem(`completedGuidelines_${taskId}`)) || [];
    const storedIncompleteGuidelines =
      JSON.parse(localStorage.getItem(`incompleteGuidelines_${taskId}`)) || [];
    setCompletedGuidelines(storedCompletedGuidelines);
    setIncompleteGuidelines(storedIncompleteGuidelines);
  }, [taskId]);

  const handleUploadWork = () => {
    var currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    var completedAt = day + "/" + month + "/" + year;
    const updatedAssign = {
      taskId: Number(taskId),
      empID,
      completedAt,
      fileUpload,
      isActive: "2",
    };
    dispatch(updateTaskWithCompeletedate(updatedAssign));
  };

  const handleCheckboxChange = (guidelineId, isChecked) => {
    if (isChecked) {
      // Move the guideline to completed list
      setCompletedGuidelines([...completedGuidelines, guidelineId]);
      setIncompleteGuidelines(
        incompleteGuidelines.filter((id) => id !== guidelineId)
      );
    } else {
      // Move the guideline to incomplete list
      setIncompleteGuidelines([...incompleteGuidelines, guidelineId]);
      setCompletedGuidelines(
        completedGuidelines.filter((id) => id !== guidelineId)
      );
    }
  };

  useEffect(() => {
    localStorage.setItem(
      `completedGuidelines_${taskId}`,
      JSON.stringify(completedGuidelines)
    );
    localStorage.setItem(
      `incompleteGuidelines_${taskId}`,
      JSON.stringify(incompleteGuidelines)
    );
  }, [completedGuidelines, incompleteGuidelines, taskId]);

  return (
    <div>
      {/* {JSON.stringify(task)} */}
      <Grid container>
        <Grid item xs={4}>
          <Box mt={5} p={4}>
            {guidelines ? (
              guidelines.map((guideline) => (
                <Box
                  key={guideline.positionGuidelineId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4",
                  }}
                >
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    checked={completedGuidelines.includes(
                      guideline.positionGuidelineId
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        guideline.positionGuidelineId,
                        e.target.checked
                      )
                    }
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    textTransform="capitalize"
                    ml={3}
                  >
                    {guideline.positionGuidline}
                  </Typography>
                </Box>
              ))
            ) : error ? (
              <Typography variant="h5" gutterBottom>
                Guidline not Found !!
              </Typography>
            ) : (
              <Typography variant="h5" gutterBottom>
                No Guideline Available
              </Typography>
            )}
            {guidelines && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  textTransform="capitalize"
                  ml={3}
                >
                  completed guideline
                </Typography>
                {completedGuidelines.map((guidelineId) => (
                  <Typography key={guidelineId}>{guidelineId}</Typography>
                ))}
              </>
            )}
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
            <Box p={2}>
              <TextField
                type="file"
                fullWidth
                name="employeeAdharImage"
                // value={employeeData.employeeResume}
                onChange={(e) => setFileUpload(e.target.value)}
                // onBlur={handleBlur}
              />
              <VisuallyHiddenInput id="employee-adhar-file" type="file" />
              <InputLabel htmlFor="employee-adhar-file">
                Upload Your File
              </InputLabel>
            </Box>
            <Box p={2}>
              <Button onClick={handleUploadWork} fullWidth variant="contained">
                Upload Your Work
              </Button>
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
  );
}
export default EmpTaskDeatil;
