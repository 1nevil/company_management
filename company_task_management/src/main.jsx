import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import store from "./app/Store.js"
import { Provider } from "react-redux"
import { ThemeProvider } from "@mui/material"
import { theme } from "./Theme/theme.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.Fragment>
)
