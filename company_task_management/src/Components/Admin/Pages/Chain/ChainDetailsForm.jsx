// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react"

// import Box from "@mui/material/Box"
// import Button from "@mui/material/Button"
// import Select from "@mui/material/Select"
// import MenuItem from "@mui/material/MenuItem"
// import DeleteIcon from "@mui/icons-material/Delete"
// import { useSelector, useDispatch } from "react-redux"
// import { fetchPosition } from "../../../../Slices/PositionSlice"
// import { checkersEmp } from "../../../../Slices/EmployeeSlice"
// import { insertChainDetails } from "../../../../Slices/ChainDetailsSlice"
// import {
//   Dialog,
//   DialogActions,
//   Divider,
//   FormControl,
//   InputLabel,
//   Typography,
// } from "@mui/material"
// import AddIcon from "@mui/icons-material/Add"
// import { toast } from "react-toastify"

// function ChainDetailsForm({ handleCloseDetails, chainDetails, chainId }) {
//   const [showAdditionalInputs, setShowAdditionalInputs] = useState(false)
//   const [additionalInputCount, setAdditionalInputCount] = useState(0)

//   const [checklistItems, setChecklistItems] = useState([])
//   const dispatch = useDispatch()

//   const Positions = useSelector((state) => state.Position.positions)

//   useEffect(() => {
//     dispatch(fetchPosition())
//     dispatch(checkersEmp())
//   }, [dispatch])

//   const handleSubmit = () => {
//     // console.log(chainid)
//     handleCloseDetails()
//     notifySubmit()
//     console.log(checklistItems)
//     console.log({
//       //   chainId: Number(chainid),
//       chainFlow: checklistItems.toString(),
//     })

//     const notifySubmit = () =>
//       toast.success("Chain Details Created successfully..")

//     const chainDetails = {
//       chainId: Number(chainId),
//       chainFlow: checklistItems.toString(),
//     }
//     alert("Ok !!!")

//     dispatch(insertChainDetails(chainDetails))
//   }

//   const handleChange = (index) => (event) => {
//     const newChecklistItems = [...checklistItems]
//     newChecklistItems[index] = event.target.value
//     setChecklistItems(newChecklistItems)
//   }

//   const handleAddInput = () => {
//     setAdditionalInputCount(additionalInputCount + 1)
//     setShowAdditionalInputs(true)
//     setChecklistItems([...checklistItems, null])
//   }

//   const handleDeleteInput = (index) => () => {
//     const newChecklistItems = [...checklistItems]
//     newChecklistItems.splice(index, 1)
//     setChecklistItems(newChecklistItems)
//     setAdditionalInputCount(additionalInputCount - 1)
//     if (additionalInputCount === 1) {
//       setShowAdditionalInputs(false)
//     }
//   }

//   return (
//     <Dialog open={chainDetails} onClose={handleCloseDetails}>
//       {/* <AddChain></AddChain> */}

//       <Box sx={{ width: "30rem", padding: "3rem 3rem" }}>
//         <Box>
//           <Typography variant="h6" component="h2" textAlign="center">
//             Enter Flow of Position
//           </Typography>
//           <Divider width="100%" sx={{ m: "1.5rem 0rem" }} />
//         </Box>
//         <Box mt={1} sx={{ lineHeight: ".5px" }}>
//           {showAdditionalInputs && (
//             <div>
//               {[...Array(additionalInputCount)].map((_, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     margin: "4px",
//                   }}
//                 >
//                   <FormControl fullWidth size="small">
//                     <InputLabel id="demo-simple-select-label">
//                       Select Position
//                     </InputLabel>
//                     <Select
//                       labelId={`select-label-${index}`}
//                       id={`select-${index}`}
//                       value={checklistItems[index] || ""}
//                       onChange={handleChange(index)}
//                       fullWidth
//                     >
//                       <MenuItem value="" disabled>
//                         Select Position
//                       </MenuItem>
//                       {Positions.map((position) => (
//                         // eslint-disable-next-line react/jsx-key
//                         <MenuItem value={position.positionId}>
//                           {position.positionName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <Button
//                     variant="outlined"
//                     startIcon={<DeleteIcon />}
//                     color="error"
//                     onClick={handleDeleteInput(index)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//           <Box mt={2}>
//             <Button
//               variant="outlined"
//               fullWidth
//               onClick={handleAddInput}
//               startIcon={<AddIcon />}
//             >
//               Add Flow of Position
//             </Button>
//           </Box>
//         </Box>
//         <Box mt={2}>
//           <Button fullWidth variant="contained" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Box>
//         <DialogActions>
//           <Button autoFocus onClick={handleCloseDetails}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Box>
//     </Dialog>
//   )
// }

// export default ChainDetailsForm

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  Divider,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { useSelector, useDispatch } from "react-redux"
import { fetchPosition } from "../../../../Slices/PositionSlice"
import { checkersEmp } from "../../../../Slices/EmployeeSlice"
import { insertChainDetails } from "../../../../Slices/ChainDetailsSlice"
import { toast } from "react-toastify"

function ChainDetailsForm({ handleCloseDetails, chainDetails, chainId }) {
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false)
  const [additionalInputCount, setAdditionalInputCount] = useState(0)
  const [checklistItems, setChecklistItems] = useState([])

  const dispatch = useDispatch()
  const positions = useSelector((state) => state.Position.positions)

  useEffect(() => {
    dispatch(fetchPosition())
    dispatch(checkersEmp())
  }, [dispatch])

  // const notifySubmit = () =>
  // toast.success("Chain Details Created successfully..")

  const handleSubmit = () => {
    handleCloseDetails()
    // notifySubmit()
    const chainDetails = {
      chainId: Number(chainId),
      chainFlow: checklistItems.toString(),
    }
    dispatch(insertChainDetails(chainDetails))
  }

  const handleChange = (index) => (event) => {
    const newChecklistItems = [...checklistItems]
    newChecklistItems[index] = event.target.value
    setChecklistItems(newChecklistItems)
  }

  const handleAddInput = () => {
    setAdditionalInputCount(additionalInputCount + 1)
    setShowAdditionalInputs(true)
    setChecklistItems([...checklistItems, ""])
  }

  const handleDeleteInput = (index) => () => {
    const newChecklistItems = [...checklistItems]
    newChecklistItems.splice(index, 1)
    setChecklistItems(newChecklistItems)
    setAdditionalInputCount(additionalInputCount - 1)
    if (additionalInputCount === 1) {
      setShowAdditionalInputs(false)
    }
  }

  return (
    <Dialog open={chainDetails} onClose={handleCloseDetails}>
      <Box sx={{ width: "30rem", padding: "3rem 3rem" }}>
        <Box>
          <Typography variant="h6" component="h2" textAlign="center">
            Enter Flow of Position
          </Typography>
          <Divider width="100%" sx={{ m: "1.5rem 0rem" }} />
        </Box>
        <Box mt={1} sx={{ lineHeight: ".5px" }}>
          {showAdditionalInputs && (
            <div>
              {[...Array(additionalInputCount)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    margin: "4px",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel>Select Position</InputLabel>
                    <Select
                      labelId={`select-label-${index}`}
                      id={`select-${index}`}
                      value={checklistItems[index] || ""}
                      onChange={handleChange(index)}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Position
                      </MenuItem>
                      {positions.map((position) => (
                        <MenuItem
                          key={position.positionId}
                          value={position.positionId}
                        >
                          {position.positionName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={handleDeleteInput(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Box mt={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleAddInput}
              startIcon={<AddIcon />}
            >
              Add Flow of Position
            </Button>
          </Box>
        </Box>
        <Box mt={2}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDetails}>
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default ChainDetailsForm
