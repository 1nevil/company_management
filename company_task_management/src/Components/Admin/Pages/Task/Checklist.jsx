import {
  Box,
  Button,
  DialogActions,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MyButton from "../../../Layout/MyButton";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { TaskSchema } from "../../../Validation/validationSchema";

const CheckList = () => {
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [additionalInputCount, setAdditionalInputCount] = useState(0);

  const initValue = {
    checklist: "",
  };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: TaskSchema,
      onSubmit: (data) => {
        alert("hello world");
        console.log(data);
      },
    }
  );

  const handleAddTask = () => {};

  const handleAddInput = () => {
    setAdditionalInputCount((prevCount) => prevCount + 1);
    setShowAdditionalInputs(true);
  };

  const handleDeleteInput = () => {
    setAdditionalInputCount((prevCount) => prevCount - 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ width: "500px" }}>
        <div style={{ textAlign: "center" }}>
          <Grid sx={{ "& .MuiTextField-root": { m: 1 } }}>
            <Typography
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
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      label={`check list ${index + 1}`}
                      multiline
                      rows={2}
                      // variant="outlined"
                      fullWidth
                      name={`checkList ${index + 1}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // size="small"
                    />
                    {errors.checklist && touched.checklist ? (
                      <Typography variant="caption" color="error">
                        {errors.checklist}
                      </Typography>
                    ) : null}

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

            {/* Render button to add input */}

            <Button
              variant="outlined"
              sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
              onClick={handleAddInput}
              startIcon={<AddIcon />}
            >
              Add Checklist
            </Button>
          </Grid>
        </div>
        {/* </Stack> */}
        <MyButton type="submit" fullWidth={true} onSmash={handleAddTask}>
          Submit
        </MyButton>
      </form>
    </div>
  );
};

export default CheckList;
