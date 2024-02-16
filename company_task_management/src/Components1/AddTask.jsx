import { Box, Container, TextField } from '@mui/material'
import React from 'react'

const AddTask = () => {
  return (
    <div>
<Container sx={{bgcolor: "#424242"}}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, height: '200px', bgcolor :'#bdbdbd'},
      }}
      noValidate
      autoComplete="off"
      
    >
        <TextField
          label="Enter Task"
          id="outlined-size-small"
          size="small"
          sx={{
           m: 1, bgcolor :'red',
          }}
        />
    
    </Box>
    </Container>
    </div>
  )
}

export default AddTask
