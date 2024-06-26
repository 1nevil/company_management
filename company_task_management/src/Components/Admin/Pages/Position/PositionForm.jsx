import React, { useState } from "react"
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material"
import { useFormik } from "formik"
import { PositionSchema } from "../../../Validation/validationSchema"
import { insertPosition } from "../../../../Slices/PositionSlice"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { toast } from "react-toastify"

const PositionForm = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const [guidlines, setGuidlines] = useState([])
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false)
  const [additionalInputCount, setAdditionalInputCount] = useState(0)
  const [inputs, setInputs] = useState([])
  const { error, pendding } = useSelector((state) => state.Position) || []

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (reason, event) => {
    if (event === "backdropClick") {
      setOpen(true)
    } else {
      setOpen(false)
    }
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

  const initValue = {
    positionName: "",
    duration: "",
    durationType: "",
  }

  // const handleAddInput = () => {
  //   setAdditionalInputCount((prevCount) => prevCount + 1);
  //   setShowAdditionalInputs(true);
  // };

  // const handleDeleteInput = () => {
  //   setAdditionalInputCount((prevCount) => prevCount - 1);
  // };

  const notifySubmit = () => toast.success("Position Submitted successfully..")
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: PositionSchema,
      onSubmit: (data) => {
        const positionWithGuidlines = { ...data, positionGuidelines: inputs }

        console.log("🚀 ~ PositionForm ~ data:", positionWithGuidlines)
        // notifySubmit()
        dispatch(insertPosition(positionWithGuidlines)).then((action) => {
          if (action.meta.requestStatus === "fulfilled") {
            handleClose()
            notifySubmit()
          }
        })
        setAdditionalInputCount(0)
      },
    }
  )
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Position
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Position</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            style={{ paddingTop: "10px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position Name"
                  name="positionName"
                  //value={employeeData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.positionName && touched.positionName ? (
                  <Typography variant="caption" color="error">
                    {errors.positionName}
                  </Typography>
                ) : null}
                {error && (
                  <Typography variant="caption" color="error">
                    {error}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  // value={employeeData.Duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.duration && touched.duration ? (
                  <Typography variant="caption" color="error">
                    {errors.duration}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Duration Type</InputLabel>
                  <Select
                    name="durationType"
                    label="Duration Type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {/* <MenuItem value="Minutes">Minutes</MenuItem> */}
                    <MenuItem value="Hours">Hours</MenuItem>
                    {/* <MenuItem value="Days">Days</MenuItem> */}
                    {/* <MenuItem value="Weeks">Weeks</MenuItem> */}
                    {/* <MenuItem value="Month">Month</MenuItem> */}
                    {/* <MenuItem value="Year">Year</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid sx={{ "& .MuiTextField-root": { m: 1 } }}>
              <Typography
                variant="h6"
                component="h6"
                color="#7986cb"
                textAlign="center"
              >
                guideline
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
                        label={`guideline ${index + 1}`}
                        multiline
                        rows={2}
                        fullWidth
                        name={`guideline ${index + 1}`}
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
                sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
                onClick={handleAddInput}
                startIcon={<AddIcon />}
              >
                Add Guideline
              </Button>
              {/*= <Button
                variant="outlined"
                onClick={handleLogData}
                sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
              >
                Log Data
              </Button> */}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              loading={pendding}
              loadingPosition="start"
            >
              Add Position
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PositionForm
