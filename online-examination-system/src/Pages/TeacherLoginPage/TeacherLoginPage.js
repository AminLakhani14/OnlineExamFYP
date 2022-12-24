import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherLoginPage = (props) => {
  const paperStyle = {
    width: 400,
    margin: "20px auto",
    background: "#31457d",
    opacity: "0.4",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" , backgroundColor: "#892020" }
    
  const back = {backgroundImage: "url('https://www.xmple.com/wallpaper/purple-gradient-blue-linear-1920x1080-c2-87cefa-da70d6-a-195-f-14.svg')" }

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/DashBoard");
  };
 
  return (
    <>
    <div style={back} className="pt-lg-2 pb-lg-5">
      <Grid >
        <Paper elevation={10} 
        style={paperStyle}
        >
          <Grid align="center">
            <Avatar style={avatarStyle}>{/* <LockOutlinedIcon /> */}</Avatar>
            <h2>Login Page Of Teacher</h2>
          </Grid>
          <div className="row m-0">
          <div className="col-lg-12">
          <TextField
          label="Email" sx={{ input: { color: 'white' } }}
          color="info"
          type={"email"}
          name="Email"
          variant="outlined"
          placeholder="Enter Email"
          fullWidth
        />
        </div>
        </div>
        <br/>
        <div className="row m-0">
          <div className="col-lg-12">
        <TextField
          label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
          fullWidth
          variant="standard"
          required
        />
        </div>
        </div>
        <div className="row m-0">
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          </div>
        <div className="row m-2">

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={navigateToDashboard}
          >
            Login
          </Button>
          </div>

          <h6 className="px-2">Do you have an account ?</h6>
         
          <div className="row m-2">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={navigateToDashboard}
          >
            Student Login
          </Button>          
          </div>
          {/* <a href="/SignInOutContainer">Student Login</a> */}
        </Paper>
      </Grid>
    </div>
    </>
  );
};
export default TeacherLoginPage;
