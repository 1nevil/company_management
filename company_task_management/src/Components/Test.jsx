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
import { Box, Container, Grid, IconButton, Stack } from "@mui/material";
import SubDepartmentForm from "../Components/SubDepartmentForm";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ViewDepartment from "../Components/ViewDepartment";
import ViewSubDepartment from "../Components/ViewSubDepartment";
import AddIcon from "@mui/icons-material/Add";

export default function Department() {
  return (
    <>
      <div id="root"></div>
    </>
  );
}
