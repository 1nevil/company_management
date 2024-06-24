/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import React from "react"
import {
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import { GuidlineSchema } from "../../../Validation/validationSchema"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

function GuidlineForm({
  GuidlineName,
  GuidlineId,
  PositionId,
  closeform,
  insertFunction,
  updateFunction,
}) {
  const { error, pending } = useSelector((state) => state.CheckList)
  const initValue = {
    guidline: GuidlineName || "",
  }

  const dispatch = useDispatch()
  const notifyEditSubmit = () => toast.success("Guidline Edited Successfully..")
  const notifyInsertSubmit = () =>
    toast.success("Guidline Inserted Successfully..")

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initValue,
      validationSchema: GuidlineSchema,
      onSubmit: (data) => {
        let result
        if (GuidlineName) {
          const updateGuidline = { GuidlineId, name: data.guidline }
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
            PositionGuidline: data.guidline,
            PositionId,
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
            Edit Guidline
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
                  id="guidline"
                  name="guidline"
                  multiline
                  label="Guidline"
                  value={values.guidline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              {errors.guidline && touched.guidline ? (
                <Typography variant="caption" color="error">
                  {errors.guidline}
                </Typography>
              ) : null}
              {/* {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )} */}
              <Box>
                <Button
                  disable={pending}
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
  )
}

export default GuidlineForm
