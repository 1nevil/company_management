import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      //   main: "#303f9f",
      //   main: "#4D869C",
      main: "#365486",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffff", // text color
          backgroundColor: "#3949ab", // background color
          "&:hover": {
            backgroundColor: "#3f51b5", // hover color
          },
          // Use CSS class to exclude grid buttons
          "&.exclude-from-grid": {
            backgroundColor: "inherit",
            color: "inherit",
            "&:hover": {
              backgroundColor: "inherit",
            },
          },
        },
      },
    },
  },
})
