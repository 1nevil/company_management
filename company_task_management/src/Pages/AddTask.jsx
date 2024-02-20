import { Box, Button, Chip, Container, Divider, FormControlLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AddTask = () => {
    // State variables to hold form data

    const [showOpenForm, setshowOpenForm] = useState(false);
    const [showClosedForm, setShowClosedForm] = useState(false);
    const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [additionalInputCount, setAdditionalInputCount] = useState(0);
const [addictionInputValues,setaddictionInputValues] = useState({})

    const [formData, setFormData] = useState({
      taskName: '',
      rate: '',
      role_id : '',
      task_dependency : '',
      unit :'',
      instructions : '',
      start_date : '',
      end_date_increase_time : '',
      employee_id : '',
      description : '',
      department : '',
      subdepartment_id : '',
      task_status : '',
      duration:'',
      start_date : '',
      checklist:'',
      end_date_increase_time : '',
      set_Reminder:""
    });
  
    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the form data, e.g., send it to a server
      console.log(formData);
    };
  
    // Handle input changes
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
      console.log(name);
    };

    const handlechecklistInputChange = (event) => {
      const { name, value } = event.target;
      console.log(`${name} ${value}`);
      setaddictionInputValues({ ...addictionInputValues, [name]: value });
      console.log(name);
    };

    const handleRadioChange = (event) => {
      const value = event.target.value;
      setshowOpenForm(value === 'open');
      setShowClosedForm(value === 'closed');
    };

    const handleAddInput = () => {
      setAdditionalInputCount((prevCount) => prevCount + 1);
      setShowAdditionalInputs(true);
    };
  
    const handleDeleteInput = () => {
      setAdditionalInputCount((prevCount) => prevCount - 1);
    };
  

    
  
  return (
    <Paper elevation={10} style={{ margin:"0 auto", padding:"20px", borderRadius:"20px",padding:"20px",borderRadius:"20px" , width:"110vh" }}>
<form onSubmit={handleSubmit} style={{width:"100vh" }}>
<Typography variant='h6' component='h6' color="#7986cb" textAlign='center'>Add Task</Typography>
<Divider  width="100%" sx={{marginBottom:".5rem"}} />
      <Box sx={{ '& .MuiTextField-root': { m: 1, width: '100vh' } }}>
        <TextField
          required
          id="taskName"
          name="taskName"
          label="Add Task"
          value={formData.taskName}
          size='small'
          onChange={handleInputChange}
        />

        <Select
          value={formData.department}
          onChange={handleInputChange}
          displayEmpty
          name='department'
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width:"46%" , marginLeft:"8px"}}
          size='small'

        >
          <MenuItem value="">
          <div>Department</div>
          </MenuItem>
          <MenuItem value={"script_writing"}>Script Writing</MenuItem>
          <MenuItem value={"content_writing"}>Content Writing</MenuItem>
        </Select>
 
    <Select
          value={formData.subdepartment_id}
          onChange={handleInputChange}
          displayEmpty
          name='subdepartment_id'
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width:"46%" , marginLeft:"34px"}}
          size='small'
        >
          <MenuItem value="">
            <>Sub Department</>
          </MenuItem>
          <MenuItem value={"comedy"}>comedy</MenuItem>
  <MenuItem value={"politics"}>politics</MenuItem>
        </Select>

        <TextField
          required
          id="rate"
          name="rate"
          label="Rate"
          value={formData.rate}
          onChange={handleInputChange}
          size='small'
        />
        <TextField
          required
          id="unit"
          name="unit"
          label="Unit"
          value={formData.unit}
          onChange={handleInputChange}
          size='small'
        />
        <TextField
          required
          id="instructions"
          name="instructions"
          label="Instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          size='small'
        />
      {/* <TextField
          required
          id="Set Reminder"
          name="set_Reminder"
          label="Set Reminder"
          value={formData.set_Reminder}
          onChange={handleInputChange}
          size='small'
        /> */}

<Typography variant='h6' component='h6' color="#7986cb" textAlign='center'>Set Reminder</Typography>
<Divider  width="100%" sx={{marginBottom:".5rem"}} />

      <RadioGroup name="formStatus" value={showOpenForm ? 'open' : 'closed'} onChange={handleRadioChange} >
        
        <Box marginLeft="10px">
        <FormControlLabel value="open" control={<Radio />} label="Time" />
        <FormControlLabel value="closed" control={<Radio />} label="Date" />
        </Box>
      </RadioGroup>
      
      {showOpenForm && (
        <form onSubmit={handleSubmit} style={{display:"flex"}}>
          <TextField label="number" type='number' variant="outlined" size='small' sx={{width:"30%"}}/>
          <Select
          value={formData.duration}
          onChange={handleInputChange}
          name='duration'
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width:"97.5%" }}
          size='small'
            
        >
          <MenuItem value="">
            <div>Select Duration</div>
          </MenuItem>
          <MenuItem value={"minute"}>Minute</MenuItem>
          <MenuItem value={"hour"}>Hour</MenuItem>
          <MenuItem value={"day"}>Day</MenuItem>
          <MenuItem value={"month"}>Month</MenuItem>
          <MenuItem value={"year"}>Year</MenuItem>
        </Select>
        </form>
        
      )}
       {showClosedForm && (
<form>
   
        <TextField
          required
          id="start_date"
          name="start_date"
          type='date'
          value={formData.start_date}
          onChange={handleInputChange}
          size='small'
        />
        <TextField
          required
          id="end_date_increase_time"
          name="end_date_increase_time"
          type='date'
          value={formData.end_date_increase_time}
          onChange={handleInputChange}
          size='small'
        />
        </form>
        )}
        <TextField
          required
          id="description "
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          size='small'
        />

<Typography variant='h6' component='h6' color="#7986cb" textAlign='center'>Checklist</Typography>
<Divider  width="100%" sx={{marginBottom:".5rem"}} />
{showAdditionalInputs && (
              <div>
                {[...Array(additionalInputCount)].map((_, index) => (
                  <div key={index}>
                    <TextField
                      label={`check list ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      name={`checkList ${index + 1}`}
                      onChange={handleInputChange}
                      size='small'
                    />

                    
                    
                    <Button variant="outlined" sx={{marginLeft:"0.5rem"}} startIcon={<DeleteIcon />}  color="error" onClick={handleDeleteInput} >
  Delete checklist
</Button>
                  </div>
                ))}
              </div>
            )}

            {/* Render button to add input */}
            
            <Button variant="outlined" sx={{width:"97%" , margin:"0.5rem 0 0 0.5rem"}} onClick={handleAddInput} startIcon={<AddIcon />} >
              Add Checklist 
            </Button>

        
      </Box>
      <Button type="submit" variant="outlined" sx={{marginTop:"10px", marginLeft:"7px"}}>Submit</Button>
    </form>
    </Paper>
  )
}

export default AddTask
