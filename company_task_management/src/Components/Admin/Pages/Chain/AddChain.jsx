import React from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { ChainSchema } from "../../../Validation/validationSchema"
import { useDispatch, useSelector } from "react-redux"
import { insertChainMater } from "../../../../Slices/ChainSliceMaster"
import { toast } from "react-toastify"

// eslint-disable-next-line react/prop-types
const AddChain = ({ closeform }) => {
  const error = useSelector((state) => state.Chain.error)

  const initValue = {
    ChainName: "",
  }

  const dispatch = useDispatch()
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: ChainSchema,
      onSubmit: (data) => {
        closeform()
        notifySubmit()
        dispatch(insertChainMater(data))
      },
    }
  )
  const notifySubmit = () => toast.success("Chain Created successfully..")

  return (
    <Stack
      gap={5}
      direction={["column", "row"]}
      style={{
        padding: "20px",
        borderRadius: "20px",
        display: { sm: "block", md: "flex", lg: "flex" },
        justifyContent: "space-around",
      }}
    >
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <Typography variant="h5" color="#7986cb" component="h5">
          Enter Chain Name
        </Typography>
        <Box sx={{ "& .MuiTextField-root": { m: 1, width: "30rem" } }}>
          <TextField
            required
            id="chainName"
            name="ChainName"
            label="Chain Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        {errors.ChainName && touched.ChainName ? (
          <Typography variant="caption" color="error">
            {errors.ChainName}
          </Typography>
        ) : null}
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "20px" }}
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Stack>
  )
}

export default AddChain
