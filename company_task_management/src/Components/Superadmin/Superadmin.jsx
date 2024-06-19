import { useEffect } from "react"
import { getSuperAdminDashBoardDatas } from "../../Slices/DashboardSlice"
import { Grid } from "@mui/material"
import { Link } from "react-router-dom"
import AdminCard from "../Layout/AdminCard"
import { useDispatch, useSelector } from "react-redux"

function Superadmin() {
  const dispatch = useDispatch()
  const { notActiveEmployee, activeEmployee } = useSelector(
    (state) => state.DashBord.superAdminDashBoard
  )
  useEffect(() => {
    dispatch(getSuperAdminDashBoardDatas())
  }, [dispatch])

  const LinkStyle = {
    textDecoration: "none",
  }

  return (
    <div>
      <Grid container columnSpacing={2} rowSpacing={2} mt={1} mb={2}>
        <Grid item xs={12} sm={6}>
          <Link to="/superadmin/Disapproved" style={LinkStyle}>
            <AdminCard
              name="Disapproved Employee"
              value={notActiveEmployee}
              textColor="red"
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/superadmin/Approved" style={LinkStyle}>
            <AdminCard
              name="Approved Employee"
              value={activeEmployee}
              textColor="green"
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default Superadmin
