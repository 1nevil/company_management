import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import MyButton from "../../../Layout/MyButton"
import { useFormik } from "formik"
import { TaskSchema } from "../../../Validation/validationSchema"
import { useDispatch, useSelector } from "react-redux"
import { insertTask } from "../../../../Slices/TaskSlice"
import { fetchChainMater } from "../../../../Slices/ChainSliceMaster"
import { getChainDetailsByChainId } from "../../../../Slices/ChainDetailsSlice"

const AddTask = () => {
  const initValue = {
    taskName: "",
    // rate: "",
    // unit: "",
    instructions: "",
    startDate: "",
    endDate: "",
    description: "",
    // duration: "",
  }

  // "taskId": 2,
  //   "taskName": "e-com website",
  //   "instructions": "Follow the guidelines provided.",
  //   "startDate": "2024-02-07",
  //   "endDate": "2024-02-15",
  //   "description": "Task 1 description.",
  //   "taskStatus": "Pending",

  const dispatch = useDispatch()
  const [currentPostion, setCurrentPosition] = useState(null)
  const [chainId, setChainId] = useState()

  useEffect(() => {
    dispatch(fetchChainMater())
  }, [dispatch])
  const chains = useSelector((state) => state.Chain.chainMaster)

  const chaindetails = useSelector((state) => state.ChainDetail.chainDetail)

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: TaskSchema,
      onSubmit: (data) => {
        alert("hello world")
        console.log(currentPostion)
        console.log({
          ...data,
          taskStatus: "Pending",
          chainId,
          currentPostion: currentPostion[0],
        })

        const taskData = {
          ...data,
          taskStatus: "Pending",
          currentPostion: currentPostion[0],
          chainId,
        }
        dispatch(insertTask(taskData))
      },
    }
  )

  const handleChangeChain = (e) => {
    setChainId(e.target.value)
    dispatch(getChainDetailsByChainId(e.target.value))
    let cd = chaindetails.chainFlow
    const t = cd.split(",")
    console.log(t[0])
    setCurrentPosition(t)
  }

  const handleAddTask = () => {}

  // const handleRadioChange = (event) => {
  //   const value = event.target.value
  //   setshowOpenForm(value === "open")
  //   setShowClosedForm(value === "closed")
  // }

  return (
    <div>
      {/* <Formik onSubmit={handleSubmit}>
        {({ isSubmitting }) => ( */}
      <form onSubmit={handleSubmit} style={{ width: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100vh" } }}>
            <TextField
              label="task Name"
              name="taskName"
              //value={formData.taskName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.taskName && touched.taskName ? (
              <Typography variant="caption" color="error">
                {errors.taskName}
              </Typography>
            ) : null}
            {/* <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Position </InputLabel>
              <Select
                size="small"
                name="Position"
                // value={employeeData.Position}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="video editior">video editior</MenuItem>
                <MenuItem value="writer">writer</MenuItem>
                <MenuItem value="Enimation">Enimation</MenuItem>
              </Select>
            </FormControl> */}
            {/* <TextField
              name="rate"
              label="Rate"
              //value={formData.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />

            {errors.rate && touched.rate ? (
              <Typography variant="caption" color="error">
                {errors.rate}
              </Typography>
            ) : null}

            <TextField
              id="unit"
              name="unit"
              label="Unit"
              //value={formData.unit}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {errors.unit && touched.unit ? (
              <Typography variant="caption" color="error">
                {errors.unit}
              </Typography>
            ) : null} */}
            <TextField
              id="instructions"
              name="instructions"
              label="Instructions"
              //value={formData.instructions}
              multiline
              rows={6}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {errors.instructions && touched.instructions ? (
              <Typography variant="caption" color="error">
                {errors.instructions}
              </Typography>
            ) : null}

            {/* <RadioGroup
              name="formStatus"
              value={showOpenForm ? "open" : "closed"}
              onChange={handleRadioChange}
            >
              <Box marginLeft="10px">
                <FormControlLabel
                  value="open"
                  control={<Radio />}
                  label="Time"
                />
                <FormControlLabel
                  value="closed"
                  control={<Radio />}
                  label="Date"
                />
              </Box>
            </RadioGroup>{" "} */}
            {/* {showOpenForm && (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Duration number"
                  type="number"
                  variant="outlined"
                  size="small"
                  name="duration"
                  //sx={{ width: "10%" }}

                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.duration && touched.duration ? (
                  <Typography variant="caption" color="error">
                    {errors.duration}
                  </Typography>
                ) : null}

                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel>duration </InputLabel>
                  <Select
                    size="small"
                    name="duration"
                    // value={employeeData.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <div>Select Duration</div>
                    </MenuItem>
                    <MenuItem value="minute">Minute</MenuItem>
                    <MenuItem value="hour">Hour</MenuItem>
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                  </Select>
                </FormControl>
              </form>
            )}
            {showClosedForm && (
              <form>
                 
              </form>
            )} */}
            <TextField
              name="description"
              label="Description"
              //value={formData.description}
              multiline
              rows={6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description ? (
              <Typography variant="caption" color="error">
                {errors.description}
              </Typography>
            ) : null}
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Select Chain </InputLabel>
              <Select
                value={chainId}
                onChange={handleChangeChain}
                label="chain"
                name="chainid"
              >
                <MenuItem value="">
                  <div>Select chain</div>
                </MenuItem>
                {chains.map((chain, index) => (
                  <MenuItem key={index} value={chain.chainId}>
                    {chain.chainName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Typography
              variant="h6"
              component="h6"
              color="#7986cb"
              textAlign="center"
            >
              Checklist
            </Typography>
            <Divider width="100%" sx={{ marginBottom: ".5rem" }} />
            {showAdditionalInputs && (
              <div>
                {[...Array(additionalInputCount)].map((_, index) => (
                  <div key={index}>
                    <TextField
                      label={`check list ${index + 1}`}
                      //variant="outlined"
                      fullWidth
                      name={`checkList ${index + 1}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="small"
                    />
                     {errors.checklist && touched.checklist ? (
                       <Typography variant="caption" color="error">
                         {errors.checklist}
                       </Typography>
                     ) : null}

                    <Button
                      variant="outlined"
                      sx={{ marginLeft: "0.5rem" }}
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={handleDeleteInput}
                    >
                      Delete checklist
                    </Button>
                  </div>
                ))}
              </div>
            )}

            Render button to add input

            <Button
              variant="outlined"
              sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
              onClick={handleAddInput}
              startIcon={<AddIcon />}
            >
              Add Checklist
            </Button> */}
            <Typography
              variant="h6"
              component="h6"
              color="#7986cb"
              textAlign="center"
            >
              Enter Start Date and End Date
            </Typography>
            <Divider width="100%" sx={{ marginBottom: ".5rem" }} />

            <TextField
              id="startDate"
              name="startDate"
              type="date"
              //value={formData.start_date}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {errors.startDate && touched.startDate ? (
              <Typography variant="caption" color="error">
                {errors.startDate}
              </Typography>
            ) : null}
            <TextField
              id="endDate"
              name="endDate"
              type="date"
              //value={formData.end_date_increase_time}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {errors.endDate && touched.endDate ? (
              <Typography variant="caption" color="error">
                {errors.endDate}
              </Typography>
            ) : null}
          </Grid>
        </div>
        {/* </Stack> */}
        <MyButton type="submit" fullWidth={true} onSmash={handleAddTask}>
          Submit
        </MyButton>
      </form>
      {/* )}
      </Formik> */}
    </div>
  )
}

export default AddTask
