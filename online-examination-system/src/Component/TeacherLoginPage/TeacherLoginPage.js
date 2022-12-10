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
  
  const TeacherLoginPage = (props) => {
    const paperStyle = {
      padding: 20,
      height: "70vh",
      width: 280,
      margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };
  
    return (
      <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>{/* <LockOutlinedIcon /> */}</Avatar>
              <h2>Login Page Of Teacher</h2>
            </Grid>
            <TextField
              label="Username"
              className=""
              placeholder="Enter username"
              fullWidth
              variant="standard"
              required
            />
            <br />
            <TextField
              label="Password"
              className=""
              placeholder="Enter password"
              type="password"
              fullWidth
              variant="standard"
              required
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Login
            </Button>
            Do you have an account ?
            <a href="/SignInOutContainer">Student Login</a>
          </Paper>
        </Grid>
      </div>
    );
  };
  export default TeacherLoginPage;
  