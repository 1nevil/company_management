import React from "react"
import { Box, Breadcrumbs, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

function Breadcrumb() {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  return (
    <Box mb={1}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join("/")}`

          return last ? (
            <Typography color="text.primary" key={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Typography color="text.primary" key={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb
