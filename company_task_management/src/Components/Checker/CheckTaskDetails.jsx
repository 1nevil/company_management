import { Checkbox, Divider, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

function CheckerTaskDetails(params) {
  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Box>
            <h1>Task Name</h1>
          </Box>
          <Box mt={5}>
            <ul>
              <li>
                <Typography variant="h5" gutterBottom>
                  <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
                  Check List
                </Typography>
              </li>
              <li>
                <Typography variant="h5" gutterBottom>
                  <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
                  Check List
                </Typography>
              </li>
              <li>
                <Typography variant="h5" gutterBottom>
                  <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
                  Check List
                </Typography>
              </li>
            </ul>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={7} sx={{ textAlign: "center" }}>
          <Grid>
            <Grid>132</Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default CheckerTaskDetails;