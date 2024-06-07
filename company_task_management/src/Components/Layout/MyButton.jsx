import React from "react"
import { Button } from "@mui/material"

// eslint-disable-next-line react/prop-types
function MyButton({ children, type, onSmash, fullWidth }) {
  return (
    <Button
      type={type}
      onClick={onSmash}
      variant="contained"
      fullWidth={fullWidth}
      sx={{ margin: "0 0 0.7rem 0" }}
    >
      {children}
    </Button>
  )
}

export default MyButton
