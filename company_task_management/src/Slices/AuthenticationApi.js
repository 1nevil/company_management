import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const loginAuthUser = (user) => {
  return axiosInstance.post("api/Login", user)
}

export const Forgetpassword = (email) => {
  return axiosInstance.post(`api/ForgotPassword/${email}`)
}

export const MetchOtp = async ({ email, otp, password }) => {
  try {
    const response = await axiosInstance.post("api/verifyandsetnewpassword", {
      email,
      otp,
      password,
    })
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "An unexpected error occurred"
  }
}
