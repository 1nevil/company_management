import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DepartmentForm from "../Components/DepartmentForm";
import { Box, IconButton, Stack } from "@mui/material";
import SubDepartmentForm from "../Components/SubDepartmentForm";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ViewDepartment from "../Components/ViewDepartment";
import ViewSubDepartment from "../Components/ViewSubDepartment";
import AddIcon from "@mui/icons-material/Add";

export default function Department() {
  const [openDepartment, setOpenDepartment] = React.useState(false);
  const [openSubDepartment, setOpenSubDepartment] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpenDepartment = () => {
    setOpenDepartment(true);
  };

  const handleClickOpenSubDepartment = () => {
    setOpenSubDepartment(true);
  };

  const handleClose = () => {
    setOpenDepartment(false);
    setOpenSubDepartment(false);
  };

  return (
    <Stack sx={{ mt: 3 }}>
      <Box>
        {/* <Button variant="outlined" onClick={handleClickOpenDepartment}>
          Department
        </Button> */}
        <Button
          sx={{ margin: "1rem 0" }}
          variant="contained"
          onClick={handleClickOpenDepartment}
        >
          <AddIcon />
          Add Department
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={openDepartment}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DepartmentForm></DepartmentForm>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <ViewDepartment></ViewDepartment>
      </Box>
      <Box sx={{ mt: 10 }}>
        <Button
          sx={{ margin: "1rem 0" }}
          variant="contained"
          onClick={handleClickOpenSubDepartment}
        >
          <AddIcon />
          Add SubDepartment
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={openSubDepartment}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <SubDepartmentForm></SubDepartmentForm>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <ViewSubDepartment></ViewSubDepartment>
      </Box>
    </Stack>
    // <Stack direction={["column", "row"]} sx={{ width: "20rem" }} gap={4}>

    // </Stack>
  );
}
