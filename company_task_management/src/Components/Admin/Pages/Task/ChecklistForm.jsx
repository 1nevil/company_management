/* eslint-disable react/prop-types */
import React from "react"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import {
  checklistSchema,
  GuidlineSchema,
} from "../../../Validation/validationSchema"
import { useDispatch, useSelector } from "react-redux"
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

function ChecklistForm({
  checkListName,
  taskId,
  checklistId,
  closeform,
  insertFunction,
  updateFunction,
  taskStatus,
}) {
  const initValue = {
    checklist: checkListName || "",
    status: taskStatus,
  }
  const { error, pending, formPending } = useSelector(
    (state) => state.CheckList
  )

  console.log(checkListName)

  const dispatch = useDispatch()
  const notifyEditSubmit = () =>
    toast.success("CheckList Edited Successfully..")
  const notifyInsertSubmit = () =>
    toast.success("CheckList Inserted Successfully..")

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initValue,
      validationSchema: checklistSchema,
      onSubmit: (data) => {
        let result
        if (checkListName) {
          const updateGuidline = {
            ChecklistId: checklistId,
            TaskMessage: data.checklist,
            Status: data.status,
            TaskId: taskId,
          }

          result = updateGuidline

          dispatch(updateFunction(result)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
              notifyEditSubmit()
              closeform()
              values.guidline = ""
            }
          })
        } else {
          const insertGuidline = {
            TaskMessage: data.checklist,
            taskId,
            Status: "0",
          }
          result = insertGuidline
          dispatch(insertFunction(result)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
              notifyInsertSubmit()
              closeform()
              values.guidline = ""
            }
          })
        }

        console.log(result)
      },
    })
  return (
    <div>
      <div>
        <Stack
          gap={5}
          direction={["column", "row"]}
          style={{
            padding: "20px",
            borderRadius: "20px",
            display: { sm: "block", md: "flex", lg: "flex" },
            justifyContent: "space-around",
            width: "35rem",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            style={{ textAlign: "center" }}
          >
            <Typography variant="h5" color="#7986cb" component="h5">
              Checklist
            </Typography>
            {pending ? (
              <>
                <Skeleton
                  sx={{ mt: 2 }}
                  variant="rectangular"
                  width="30rem"
                  height={60}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Skeleton
                    sx={{ mt: 2 }}
                    variant="rectangular"
                    width="6rem"
                    height={35}
                  />
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ "& .MuiTextField-root": { m: 1, width: "30rem" } }}>
                  <TextField
                    required
                    id="checklist"
                    name="checklist"
                    multiline
                    rows={4}
                    label="checklist"
                    value={values.checklist}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                {errors.guidline && touched.guidline ? (
                  <Typography variant="caption" color="error">
                    {errors.guidline}
                  </Typography>
                ) : null}

                {checkListName && (
                  <FormControl sx={{ width: "30rem" }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      required
                      name="status"
                      label="Status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="1">Done</MenuItem>
                      <MenuItem value="0">Not Done</MenuItem>
                    </Select>
                  </FormControl>
                )}

                {/* {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )} */}
                <Box>
                  <Button
                    disable={formPending}
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: "20px" }}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Stack>
      </div>
    </div>
  )
}

export default ChecklistForm
