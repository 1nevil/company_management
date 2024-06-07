/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import MyButton from "../../../Layout/MyButton"
import { useFormik } from "formik"
import { TaskSchema } from "../../../Validation/validationSchema"
import { useDispatch, useSelector } from "react-redux"
import { fetchChainMater } from "../../../../Slices/ChainSliceMaster"
import { fetchPosition } from "../../../../Slices/PositionSlice"
import { insertTask } from "../../../../Slices/TaskSlice"
import CheckList from "./Checklist"
import { Link } from "react-router-dom"
import CallMadeIcon from "@mui/icons-material/CallMade"

const AddTask = ({ handleCloseForm }) => {
  const [showOpenForm, setshowOpenForm] = useState(false)
  const [showClosedForm, setShowClosedForm] = useState(false)
  const [durationType, setDurationType] = useState(null)
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false)
  const [additionalInputCount, setAdditionalInputCount] = useState(0)
  const [inputs, setInputs] = useState([])

  const dispatch = useDispatch()

  const chainMaster = useSelector((state) => state.Chain.chainMaster)
  const { pending, error } = useSelector((state) => state.Tasks)

  const initValue = {
    taskName: "",
    rate: "",
    unit: "",
    instructions: "",
    startDate: "",
    endDate: "",
    description: "",
    durationNum: "",
    chainid: "",
  }
  useEffect(() => {
    dispatch(fetchChainMater())
    // dispatch(fetchPosition())
  }, [dispatch])

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      // validationSchema: TaskSchema,
      onSubmit: (data) => {
        console.log(error)
        error === null && handleCloseForm()
        let TaskStatus = "Pending"
        data.durationNum = String(data.durationNum)

        dispatch(
          insertTask({
            ...data,
            durationType,
            taskStatus: TaskStatus,
            checklists: inputs,
          })
        )
      },
    }
  )

  const [checkListData, setCheckListData] = useState(null)

  const handleCheckListSubmit = (data) => {
    // Update the state in the parent component with the checklist data
    setCheckListData(data)
  }

  const handleAddInput = () => {
    setShowAdditionalInputs(true)
    setAdditionalInputCount((prevCount) => prevCount + 1)
  }

  const handleDeleteInput = () => {
    setAdditionalInputCount((prevCount) => Math.max(0, prevCount - 1))
  }

  const handleGuildlineChange = (event, index) => {
    const { name, value } = event.target
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  const handleRadioChange = (event) => {
    const value = event.target.value
    setshowOpenForm(value === "open")
    setShowClosedForm(value === "closed")
  }

  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = React.useCallback((event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }, [])

  return (
    <div>
      {error !== null && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "30rem" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
      {/* {JSON.stringify(chainMaster)} */}
      <form onSubmit={handleSubmit} style={{ width: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100vh" } }}>
            <TextField
              size="small"
              label="Enter task name"
              name="taskName"
              multiline
              rows={3}
              //value={formData.taskName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.taskName && touched.taskName ? (
              <Typography variant="caption" color="error">
                {errors.taskName}
              </Typography>
            ) : null}
            {error && (
              <Box m={1}>
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
                <Link
                  style={{
                    color: "blue",
                    textDecoration: "none",
                  }}
                  to="/admin/Chain"
                >
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    <CallMadeIcon /> Do you want to create chain ?
                  </Box>
                </Link>
              </Box>
            )}

            <Typography
              variant="h6"
              component="h6"
              color="#7986cb"
              textAlign="center"
            >
              Set Reminder
            </Typography>
            <Divider width="100%" sx={{ marginBottom: ".5Reminder" }} />

            <RadioGroup
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
            </RadioGroup>
            {errors.formStatus && touched.formStatus ? (
              <Typography variant="caption" color="error">
                {errors.formStatus}
              </Typography>
            ) : null}

            {showOpenForm && (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Duration number"
                  type="number"
                  variant="outlined"
                  size="small"
                  name="durationNum"
                  //sx={{ width: "10%" }}

                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.duration && touched.duration ? (
                  <Typography variant="caption" color="error">
                    {errors.duration}
                  </Typography>
                ) : null}

                <FormControl size="small" fullWidth sx={{ m: 1 }}>
                  <InputLabel>Duration Type</InputLabel>
                  <Select
                    name="durationType"
                    value={durationType}
                    onChange={(e) => setDurationType(e.target.value)}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em>Select Duration Type</em>
                    </MenuItem>
                    <MenuItem value="Minutes">Minutes</MenuItem>
                    <MenuItem value="Hours">Hours</MenuItem>
                    <MenuItem value="Days">Days</MenuItem>
                    <MenuItem value="Weeks">Weeks</MenuItem>
                    <MenuItem value="Month">Month</MenuItem>
                    <MenuItem value="Year">Year</MenuItem>
                  </Select>
                </FormControl>
              </form>
            )}
            {showClosedForm && (
              <form>
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
              </form>
            )}
            <TextField
              multiline
              rows={5}
              name="description"
              label="Description"
              //value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {errors.description && touched.description ? (
              <Typography variant="caption" color="error">
                {errors.description}
              </Typography>
            ) : null}
            <FormControl fullWidth sx={{ m: 1 }} size="small">
              <InputLabel>chain </InputLabel>
              <Select
                //value={formData.teamname}
                onChange={handleChange}
                label="chain"
                name="chainid"
              >
                <MenuItem value="">
                  <em>Select Chain</em>
                </MenuItem>
                {chainMaster?.map((chain) => {
                  return (
                    <MenuItem value={chain.chainId}>{chain.chainName}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            <Grid sx={{ "& .MuiTextField-root": { m: 1 } }}>
              <Typography
                variant="h6"
                component="h6"
                color="#7986cb"
                textAlign="center"
              >
                Enter CheckList
              </Typography>
              <Divider width="100%" sx={{ marginBottom: ".5rem" }} />
              {showAdditionalInputs && (
                <div>
                  {[...Array(additionalInputCount)].map((_, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        label={`Checklist ${index + 1}`}
                        multiline
                        rows={2}
                        fullWidth
                        name={`Checklist ${index + 1}`}
                        onChange={(event) =>
                          handleGuildlineChange(event, index)
                        }
                        // onBlur={handleBlur}
                      />
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={handleDeleteInput}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="outlined"
                onClick={handleAddInput}
                startIcon={<AddIcon />}
                fullWidth
              >
                Add CheckList of the task
              </Button>
            </Grid>

            {/* <CheckList onSubmit={handleCheckListSubmit}></CheckList> */}
          </Grid>
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: ".5rem" }}
        >
          Enter Task details
        </Button>
      </form>
    </div>
  )
}

export default AddTask
