import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDashBoardDatas } from "../../Slices/DashboardSlice"
import { Grid, Card, Box, CardHeader, Divider } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import ChartCard from "./ChartCard"

const columnsEmployee = [
  {
    field: "positionName",  
    headerName: "Position Name",
    width: 250,
  },
  {
    field: "employeeCount",
    headerName: "Employees",
    width: 250,
  },
]

const columnsChecker = [
  {
    field: "positionName",
    headerName: "Position Name",
    width: 250,
  },
  {
    field: "checkerCount",
    headerName: "Checkers",
    width: 250,
  },
]

const LinkStyle = {
  textDecoration: "none",
}

function DashBord() {
  const dispatch = useDispatch()
  const { pending, dashBoardData } = useSelector((state) => state.DashBord)

  useEffect(() => {
    dispatch(getDashBoardDatas())
  }, [dispatch])

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/admin/employee" style={LinkStyle}>
            <ChartCard
              name="Employees"
              value={dashBoardData?.empsCount}
              color="#8884d8"
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/admin/employee" style={LinkStyle}>
            <ChartCard
              name="Checkers"
              value={dashBoardData?.checkerCount}
              color="#82ca9d"
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/admin/chain" style={LinkStyle}>
            <ChartCard
              name="Chains"
              value={dashBoardData?.chainCount}
              color="#ffc658"
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/admin/task" style={LinkStyle}>
            <ChartCard
              name="Tasks"
              value={dashBoardData?.taskCount}
              color="#d0ed57"
            />
          </Link>
        </Grid>
        <Grid mt={2} item xs={12} sm={6} md={6}>
          <Card sx={{ maxWidth: 500, margin: "auto" }}>
            <CardHeader title="Position Wise Employees" />
            <Divider />
            <Box>
              <DataGrid
                loading={pending}
                rows={dashBoardData?.employeePositionCounts}
                getRowId={(row) => row.positionId}
                columns={columnsEmployee}
                slots={{ toolbar: GridToolbar }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
              />
            </Box>
            <Divider />
          </Card>
        </Grid>
        <Grid mt={2} item xs={12} sm={6} md={6}>
          <Card sx={{ margin: "auto" }}>
            <CardHeader title="Position Wise Checkers" />
            <Divider />
            <Box>
              <DataGrid
                rows={dashBoardData?.checkerPositionCounts}
                getRowId={(row) => row.positionId}
                loading={pending}
                columns={columnsChecker}
                slots={{ toolbar: GridToolbar }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default DashBord
