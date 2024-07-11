import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import OtpInput from "react-otp-input"
import { useNavigate } from "react-router-dom"
import SetNewPassword from "./SetNewPassword"
import { toast } from "react-toastify" // if using react-toastify for notifications
import {
  ForgetpasswordWithEmail,
  clearErrorMessage,
  verifyAndSetNewPassword,
} from "../../Slices/AuthenticationSlice"

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("") // Define newPassword state
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { message, error, loading } = useSelector((state) => state.Auth || {})

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      if (!email) {
        return toast.error("Please Enter Email")
      }
      dispatch(ForgetpasswordWithEmail(email))
    } else if (step === 2) {
      if (!otp || otp.length < 6) {
        return toast.warning("Please Enter a Valid OTP")
      }
      dispatch(verifyAndSetNewPassword({ email, otp })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStep(3)
          toast.success("OTP verified successfully")
        }
      })
      // Handle OTP verification logic here
    } else if (step === 3) {
      if (!newPassword) {
        return toast.error("Please Enter a New Password")
      }
      // Handle new password set logic here
      console.log("New Password Set:", newPassword)
    }
  }

  useEffect(() => {
    let intervalId
    if (isActive && count > 0) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
    } else if (count === 0) {
      setIsActive(false)
    }
    return () => clearInterval(intervalId)
  }, [isActive, count])

  useEffect(() => {
    if (message) {
      // toast.success(message)
      setStep(2)
      setIsActive(true)
      setCount(60)
    }
    if (error) {
      toast.error(error)
    }
    dispatch({
      type: "clearErrorMessage",
    })
  }, [error, message, dispatch])

  return (
    <Box margin={"10rem auto"} p={2} maxWidth={"600px"}>
      <Paper elevation={4}>
        <IconButton aria-label="" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Stack component={"form"} spacing={2} p={2} onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Typography color={"#565656"} fontWeight={900} variant="h5">
                Forgot Password
              </Typography>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="Enter Registered Email"
                size="small"
                placeholder="Enter Registered Email..."
              />
              <Button disabled={loading} variant="outlined" type="submit">
                {loading ? <CircularProgress size={24} /> : "Continue"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Stack>
                <Typography color={"darkgray"} fontWeight={900} variant="h5">
                  Enter OTP
                </Typography>
              </Stack>
              <Stack justifyContent={"center"} spacing={2} direction={"row"}>
                <OtpInput
                  inputStyle={{
                    width: "40px",
                    height: "40px",
                    margin: "10px",
                    border: "2px solid gray",
                  }}
                  value={otp}
                  onChange={setOtp}
                  inputType="number"
                  numInputs={6}
                  renderInput={(props, index) => (
                    <input {...props} autoFocus={index === 0} />
                  )}
                />
              </Stack>
              {step < 3 && (
                <Button type="submit" variant="outlined">
                  Continue
                </Button>
              )}
              <p>
                Resend OTP After{" "}
                {isActive ? (
                  count
                ) : (
                  <Button
                    onClick={() => {
                      setStep(1)
                      setOtp("")
                    }}
                  >
                    Resend
                  </Button>
                )}
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <SetNewPassword
                otp={otp}
                email={email}
                setNewPassword={setNewPassword}
                newPassword={newPassword}
              />
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  )
}

export default ForgotPassword
