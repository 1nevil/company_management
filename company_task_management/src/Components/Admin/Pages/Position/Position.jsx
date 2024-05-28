import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import { Grid, IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PositionForm from "./PositionForm"
import { deletePosition, fetchPosition } from "../../../../Slices/PositionSlice"
import { useMediaQuery } from "@mui/material"

function Position() {
  const isMobile = useMediaQuery("(max-width:600px)")
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)")
  const isLaptop = useMediaQuery("(min-width:1025px) and (max-width:1440px)")
  const isDesktop = useMediaQuery("(min-width:1441px)")

  const getPageSize = () => {
    if (isMobile) return 5
    if (isTablet) return 10
    if (isLaptop) return 15
    return 20 // Default for larger screens
  }

  const getGridWidth = () => {
    if (isMobile) return "100%"
    if (isTablet) return "90%"
    if (isLaptop) return "80%"
    return "70%" // Default for larger screens
  }
  const dispatch = useDispatch()
  const Positions = useSelector((state) => state.Position.positions)

  const handleDelete = (id, position) => {
    dispatch(deletePosition(id));
    notify(position);
  };

  const handleEdit = (id) => {
    alert(id);
  };

  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);

  const notify = (position) => toast(position + " is deleted !");

  const columns = [
    {
      field: "positionName",
      headerName: "Position Name",
      width: 140,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 140,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 140,
    },
    {
      field: "unitName",
      headerName: "Unit Name",
      width: 140,
    },
    {
      field: "rate",
      headerName: "Rate Per Unit",
      width: 140,
      valueFormatter: (params) => `${params.value} Rs`,
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row.positionId)}
            title="Edit"
          >
            <Edit />
          </IconButton>
          {/* <IconButton
            onClick={() =>
              handleDelete(params.row.positionId, params.row.positionName)
            }
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton> */}
        </>
      ),
    },
  ];

  return (
    <>
      <Box style={{ width: getGridWidth(), margin: "auto" }}>
        <ToastContainer />
        <PositionForm></PositionForm>
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          color="primary"
          mb={2}
        >
          Position
        </Typography>
        <Grid container>
          <Grid item xs={11} sm={12} md={12} sx={{ margin: "auto" }}>
            <DataGrid
              rows={Positions}
              getRowId={(row) => row.positionId}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 20,
                  },
                },
              }}
              pageSizeOptions={[5, 15, 25, 50, 100, 200]}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Position;
