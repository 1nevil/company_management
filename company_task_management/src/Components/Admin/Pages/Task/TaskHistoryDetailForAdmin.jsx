import React, { useEffect } from "react"
import { Alert, Box, Button, Grid, Skeleton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getHistoryDetails } from "../../../../Slices/TaskSlice"
import DownloadIcon from "@mui/icons-material/Download"

function EmpTaskDetail() {
  const { pending, error } = useSelector((state) => state.Tasks)

  const { messages, checker, empTaskHistory, employee } = useSelector(
    (state) => state.Tasks.getHistoryDetail
  )

  console.log()

  const { taskId } = useParams()
  const dispatch = useDispatch()

  const proimg = {
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhASEA8PFQ8QEhUQFRUPEBAPFRUQFRUWFxURFRUYHSggGBolGxcVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAQFy0fHR0tLS0tLS0rLS0rLS0tLS0tLS0tLS0tLS0tKysrLS0tLS0rLSstLS0wLS0tKy0tLSstK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAD8QAAIBAgMFBgQEAggHAAAAAAECAAMRBCExBRJBUWEGEyJxgZEyobHBQlJy0SPwFTNDYmOy4fEUFlOCkpPC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAIBEBAQACAgIDAQEAAAAAAAAAAAECEQMhEjEiQVEEE//aAAwDAQACEQMRAD8A4FRDIsiiyxTWcNEqaywixqaw6LCnVYRViVYQCQICSAjgR7SBgI8eDrVlQFnYKo4k2/3gEitMDaHaMDKiL/3mFvYTKba9Zv7VhfIWy+Q4TqY1Nu1AkgJw9LHVb5VHv1JM0BtCoFJ32AB3b+JgWHDQj5yzC1zc9OotFaY9LarLbvL6ZkgAA9Zq0K6uMjnxGh9pLjYsylStFaStFOXSBEYiTtGIgDIkCIUiRIgBYQTLLDCDZZRVdZXqJLriBdZRQqLAOJdqLKzrCA2ikrRQLFNZaprB01lmmsCaLDKJFBCqJKqSiTAjKJMCQK0Ue0RgDq1AqszHwqCx8hOG2jjmrPvMbKMgOCj9+c6HtViitJUGtQ5/pWxPzInJXzAOhOfrOohVjn5cOR5SKkk5C8iGzvxJvCUbAE9P2ynYItQDPJj7j24jzlzB4071t4quWQzzGlr5e8yQCeP+sPSYji1+AW3vc3t6SyubNukp7zMSCt93fYizGw5kkLlrpl6SZqXvuly5yuxI4eELugWNrc9Zk4OsxsCBu3ublnJPM55n2l2q97k7xIO6pbuwqryI0v0zteae4y1pv7PxWfdsWLKLEsLZ/lOQzyl+chSY01uQ4O8DvWAXXjZRnOm2dixVW+W8NQLj1zmOeOvTbGrForR4rTN0iRIkSciYAyJBhDEQZEADCBdZaYQTiUU6iyrUWXnWVqiyoq7sULuxQLNNZZQQVMSygkVNRCKJFRCASCQEkIgI4gKMZKVNq4g06TuouwBt0P5vSByvaxiKtt7eyuBe5W+oPLgZgFiT1EsMxJJJJYm5JzOepkqGHLHITr0utgU6JMvJs1z0mzs3AKFDEZ8ZrYeiswy5vx6cf5+u3If0Y4NrfWHpbLfkc+Wc7ehhhxAl6hgh5eWUTmrq/wA8cT/QtcIWC72VtLG3HXSUcO7Kw3kBtkAdB5Ai1+uc9aw+EW27bwzN2l2RFQ7yboYdAAfMaTbDltYcnDI4XHJmWDFSbAohZ1BOl8/CcuUvbHr7roHyJFgQdQbEXH3h9t7LqU91ShFhzO6bZnIZH56zPwzWZSLEXHIEWOc3urHl1cXVmNaJTcA8xHnnaokRjJRoEDIkSZjEQBMIJhDkQbCBVcSvUEuOJXqCUVt2KEtFKiwgh0EGghlElVNRCKJFYQCQOI4ijwFKm1lvQrD/AA2+hlyVdqpejWHOm/8AlMDz+hSLMAOM6nDYJVUC2dpn9m8Ncs9tPCPPj9prnEoDbeW41zEx5Mreo9nDjJN0/dy/hMNcCUqWJU8R5za2e+Uw1Xol/BaVCwzlygcogLi8Pg6QPCXSWruEpk2mtQF/KAwtNQJepbs9OGNjy55S1g9q8Er0TcaaWzPKecmhukhb5elzqM+PKewY/DB0ZeYnmWKpEM26Brum987cehH3no4vx5uWLVD4Vvruj6ScjSHhXykjM6FGjxpBGMZKMYAyJBhCkQbCAFhAVBLLCAcSwAtFJ2jygqCGUQaCGUTkTWTEiBJCA8kIwjwHkKyXVhzUj3EmJR2liXUgJa+7vZi97ajpwktkm66wxuV1GBhg4wlLcyapck9CT9re0zG2bW/Cp9wJ02zkth6AI0QG3pMurWr1O9sQvdqXCkkFgPygf79Jljld3T15YTUtY4w1dTmGHkf2M6LZOOqCwN9LZzBw+Kqu1g18ielh5zZ2bUvY2sQbEay8luuzik31XdbK/iIeeko7Q2pWpHwUibefznR9i8ONxmPE5TJ7YYnu2AWxBzsvO9rHlOcZqbd3vK4sEdqsTf8Aq7c7bwm3gNu4lgDunmfCb29RObbalSjuM9MbrXIuLm3O1/2nbbB2rQdULpZnGQqU2psw1um9k/oZvjn+xhnxz6rd2bjhVS9rMLXB4TiO2WEFOtdcu8s1ut7G3rYzvcJQQElR8Q+U5TtvSBq4e9vAGb0v9LiMcvl04s6ZAFso8JUoOoUsjBW+EkWB8oOGJooooDSJkjGMCBkTJmRMALCCcQ7QTwA2ikrRS7BUEKsGkKsgmJISIkhAcSQjCPAUp7QsLOdFV/mAJdmfttCaTW1sfpecck3i14brOHWlZVHJQPYSti8EG4C8uodDzF5NlvPHvVfRk6c0dlAE2UC/KX9nYGzDIC2svOtoTDLxHO3nO/K11MJHcdmqdqYtpBdqdi9+gbduyX01sfLylvYK2RbcprhhYjlrN8Z08meXy28xOwmq7qvvELkLkXA5aTt9l7JBpJTqC6IMlOgP5uZa/GGqYVC11Fj0mlglta951jtM8pe4ItEKLCYeOwSVMQO8W4Wmtha4DFybn2nQ1ROW23impVg4ORAS3UXb7xbpzx4+V0q9om8WJW5Kq9JVBOQO6TkPLenPzY7UVQapUfrb9ZVR/lUe5mPLhNRlz5S59Gijxp0yNGMlGgRMiZKRMAZgnhjBtAFaKPFAIkIsGsKsCQkhGEkIDiPGEeA8q7ToF6bKNbS1FJZuaXHLxu2Xs2tvUqZ5oPe0s79hMrY1Swan/wBN3QejESxjcWtMXPkJ48sflp9TDKeO1rD2LeLS2nWGp4mnfdVlJGdgRpOcr7ZByA4QGzsX472AF75X1nc46Xmxez7FxCrT33KhVHGwAHWaHeU6il6bqcr+Egj5Tz3Z3amiR3bUyyjrbPn6TpthNhwrGmN0tm1zck8zN5Lp5srjutWgbmaaZSlQKn4SJcBlnTO9ndspy7YNKlZ61XNKbhVG8APCLsxHK4M3MbWsCAc7fWciNuAUmprRXfO+BUJzAcm+VtbG2sWbizPx7ZeIrF2Zzq7Fj6m9pCMI86eYo0eNAUaPGMCJjGSMiYEDBNCmDaAOKKKBNYVYJYVYE1jxhJCBKKMI8B40eKBye1CaOJc8KlnHDUWPzBk9rAvTBA0N/lL/AGnwm8gqAeKkbn9B19sj7zPp4lWRRzOcx5Jq7j18OW5qq2z9nOLM6BgcviK26TZoYdBkKBvbkW+a5ywr2Hh+fGDo7SKkHumv0IOXrM5lcnrxxxxja2TsvBtcCmwfjZXB+k3MRsvukvSSre2QCs+XLLOZuwts0QRvU6oa+rKD9DO2oYgMLga8Tym+NYc3jvqOJ7L7Qq1MQQQwCAhg1wb8ipz1nc1K+6JmU8BTWsaoXxPrbnzksbiFS5JFhL7Y3X0obexZVXIOZW3/AHEEC3qZytMWAHKW8fjO8a3AG5v+Y6KOgB+crzplnSijRQzPGjxQGjGOYxgMZFo5jNAgYNoUwTQIRRRQJLCLBrCLAII4kRJCBIR40UCUUaPAYj+enKcTtjCnDVABnSbxITw5p6ZfLrO3lTamASvTKN5qRqrcCIdY3V6Z9HEoaYYnhxhcDXplrsNOYB15zlcRSrUDuuPDwI0P88pPD4o2N8ucxnFHs/3vqvUdiYqg+SqMuIsPpOppsqjXhPHNmbU7lhc309501HtUXO6is5OgUEsTbT5maTBnlnt0G1tpGmyksNxha2pJ6Z8vLSZIq1sa1qIbcy3nOSqONuv7x8DsPE13L4ltxCR4BYsRyy+EWncYLCJTQKihUGgAAnVsnpzNuBxVEI7oNEO7qTpqYKdhitlHFYN8Qq/xadSoVsM3w4Yi3XIbw9ec5G0a0wvuoxR7RoCiiihDGMY5jGBExjJGQMBjBNCGDaBCKKNAkkKsCkKsAgkpASQgTijCPAeKNHvAeNXbcA/Mwv8ApXn5y9g9muxBZSE1O9lccgNZm9rX3Fd+NiPllOcmvFJvtWYB1ByKsAdLg3EFgNkYV28YK9EJX6RthZ0KQOqqAZcp07MCJ5N3GvoalnbUwvZ/CXFqSn9ZZ/kTNvCYSnT/AKumiX13FVb+0pYM2EutXVRvMwAHEzSZX9ZZSfTTw5A1lPbu1bAUKR/jVSEyz3A2Vz1zmJj+0BPho3A03zrboOE0OwWzO9rd64utMm187vxP885txzdY5/Gbr0bZWGFKjTpqLBVAA6CeddstijD1d5B/BrXZbfhb8SeXEf6T068obUp03XdqKjLycAi89Vx2+fMtV4+RIzttpdkKbXOHbcb8jksh8jqPnOSx2Cq0W3aqMp4X0PkwyPpMrjY1mUqrFHjTlTGMY5jGAzSBkjGMCBg2hDBNAhFGjwEphVMAhhlgEEmIMGWMLh2qGyjzPADmTAjLdDZ1VtFsObeH/WbODwCUwLZv+Y/blLlHU9MvWFkY9LZKjN3J6Ll85p4LD01zWmB11PvrIul2tL9JJFMwy85yna7BGpSdV+Irl58PnOsqGZ2OoZE6iK6xuq8/7O1fDabMo4jD9ziCLWFT+J6k+ID+eMuO2c8ec+T6GF3itf0iVHhGfWUK9Z3N2YmTIgyCSAoJJ4AXJ8hOsS6g+BwzVHCrqdTyXiZ6v2Xwa0qShRYHTy5+c5LYezO7TTxkb7nkBmR5CddgsfSAVQwyHXWe7hx0+b/Tyb6jXqVMpWc310t9xAmuDYgix46yOIq2RiDna3rN3k2q4E3ZgDYcLae0PXYZrUUWPMXU+/3lTZrWYSFfFNmzZLfTmeUlXXbL2p2doE3QGmTmCma+qH7WnM7Q2PWo3LLvU/zpmvrxX1nY4xsldbhWyK8m6ecjQxJGY/kTK4xrN6cBGM7naHZujWXfpfw3OZ3Phv1TT1BHkZyu0NkVqObpdPzp4l9TqPUCc3GxZlKzjGMlIGcukGgnhTAvAjFGvFAihhllZDDoZRaw1FnYKup/m5nUUKC0lCL6niTzMo7Bw26neHV8h+m/3+00KxzkBlOpj4UyF8oTDCRSAsbmTWs35RHrLGpmFSqZ+cFVW9+QhalUAZj2j01BHTWBzPabCAqr6FHH/i2R+dpmMmnlOr21g+8pso1Iy8xmPpOYwh3gBY72luN+Uw5ce3r4MutJUqTMQqjNjYeZnT4DZi0hZQGc/E/M8h0h9lbKWmAz/HrzsOQ/eaRYH4RYdJtxcWpusObn31DrTATdBvUqWBt+Fb/D5m0tf8GlJQXzc8OvlJ4NFQGo34ReUmrlyWOp+XSer08XdXadUkqOAljaB8FuMoCuAfaCr4m/HjHkePZU6tiJUxuI33/ujQRmaVlOZmdrXGLVdvCB6wVN7SVRtBAMZHUbeyq+e6dG+sWKrd0wAzB1Bzmbh61rHlI47E95U3uGVp15dM7h8htp9maNdO8o2p1DwHwk9Rw9PnOK2hgKtE2qIQDowzU+R+2s9AwYL7tO9lvvH24zQrqlX+EUBoWIIIB3uvTzluMrnyuPVeQtBPOm7RdmKlAGpTu1HUj8SDrzHX35zmHmVlntrLsOKNFChUzDqZUptLNI5iKO2pruoo/KAPYR2NyPKK+RETmcqkx0Et0RYSnQFzLqwJyBEkImgCrDSIEgXEVSNfKFX8JTSrcXKty19RMjA7F7jE12YA+INTHCzC7VPckDyMt0NQRwlrFYneWmW+Ibyk8wN0rf3M7mr7cXynoxqFj04mGpkDM6fWUmq2g2qE6y+TnxXMXjC1lHw/WJDYSrTGcsNJvbrWjO8gJBjCqJdmkXlejrD1IGmMjCw7G5jVZFDnJ1JFOhyg1GcdDJ0RcyxzW3s8WDH+7b3IH3Mt4dgNdQLnp5ynhmsjHmQPqftKuIxV/Auh1PObT0817q+lfvmIt/DsVN/wASnIg9DPNu02xzhqlhnRcncP8A8HqPmJ6DsyoL2HCC2thadUPSqC6N6ENwYHgZMsdrjl4vKbxTqf8Akj/Hf/1r+8Uz8Mm3ni4qm0t4fMqOZA+cz6bTQ2dnUp/qB9jecV07UNp5xVDnBI2kcNnOHS5hxLK6Srh9JZvCpx7yESmEOwgjlCgwdVZQTC6mLHtYL5yeGXXrA7RbJPOdRKG5uQIUCDoJxhwsipUxHqtHEE5nSGvDiAEKhgQeCfIQ7ytWlDU5JzGpyN85FPDYeAOsKGljmtF6tqWurfICZj1uAkcZivgUcN4n1t+0rhp3tl4t3Y62BYxsc+d/WLDPZJTr1b3mjGrH/EGNM3ePOKVHl9OaWyv62n5/YxRTy17HW0eEkvGPFOHS7hNIcRRQJRLHigKJ4opUo9LSVNofh9ftFFOog1LQSRiihTiBeKKUOZOnFFIHaVasUUoSyA1iikVIayRiilSqOJ+MfpP1jpqIop1HF9Nv+y9JSGkUU2edWiiilR//2Q==",
  }

  useEffect(() => {
    dispatch(getHistoryDetails(taskId))
  }, [dispatch, taskId])

  return (
    <div>
      <Box mb={2}>
        {pending ? (
          <Skeleton animation="wave" variant="rectangular" height={50} />
        ) : (
          <>
            {empTaskHistory?.isApprove === "0" ? (
              <Alert variant="filled" severity="error">
                {messages.map((message, index) => (
                  <Typography key={index} variant="body2">
                    {message}
                  </Typography>
                ))}
              </Alert>
            ) : (
              <Alert variant="filled" severity="success">
                Approved
              </Alert>
            )}
          </>
        )}
      </Box>
      <Box sx={{ p: 1 }}>
        <Button fullWidth variant="contained" startIcon={<DownloadIcon />}>
          Download File
        </Button>
        {JSON.stringify(empTaskHistory?.fileUpload)}
      </Box>
      {/* Checked By */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Checked By Checker
        </Typography>
        <Box
          mt={2}
          p={3}
          sx={{
            border: "2px solid gray",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px 1px black",
          }}
        >
          {pending ? (
            <Skeleton animation="wave" />
          ) : (
            <>
              {checker ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">
                      <strong>Employee ID:</strong> {checker.employeeId}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Name:</strong> {checker.employeeName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Email:</strong> {checker.employeeEmail}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Age:</strong> {checker.employeeAge}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Mobile Number:</strong> {checker.mobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Alternate Mobile Number:</strong>{" "}
                      {checker.altmobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>DOB:</strong> {checker.dob}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Address:</strong> {checker.addressEmployee}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <img
                        style={{
                          borderRadius: "10%",
                          objectFit: "cover",
                          padding: "6px",
                          background: "linear-gradient(#e66465, #565656)",
                          height: "300px",
                          width: "300px",
                          display: "block",
                          margin: "0 auto",
                        }}
                        alt=""
                        src={proimg.img}
                      />
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="h5" gutterBottom>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Completed By Employee
        </Typography>
        <Box
          mt={2}
          p={4}
          sx={{
            border: "2px solid gray",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px 1px black",
          }}
        >
          {pending ? (
            <Skeleton animation="wave" />
          ) : (
            <>
              {employee ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">
                      <strong>Employee ID:</strong> {employee.employeeId}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Name:</strong> {employee.employeeName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Email:</strong> {employee.employeeEmail}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Age:</strong> {employee.employeeAge}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Mobile Number:</strong> {employee.mobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Alternate Mobile Number:</strong>{" "}
                      {employee.altmobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>DOB:</strong> {employee.dob}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Address:</strong> {employee.addressEmployee}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <img
                        style={{
                          borderRadius: "10%",
                          objectFit: "cover",
                          padding: "6px",
                          background: "linear-gradient(#e66465, #565656)",
                          height: "300px",
                          width: "300px",
                          display: "block",
                          margin: "0 auto",
                        }}
                        alt=""
                        src={proimg.img}
                      />
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="h5" gutterBottom>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default EmpTaskDetail
