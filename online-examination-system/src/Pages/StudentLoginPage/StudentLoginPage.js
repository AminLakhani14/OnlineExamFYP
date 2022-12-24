import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentLoginPage = ({ handleChange }, props) => {
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/DashBoard');
  };


  //   const onSubmit = (values, props) => {
  //     console.log(values);
  //     setTimeout(() => {
  //       props.resetForm();
  //       props.setSubmitting(false);
  //     }, 2000);
  //   };
  return (
    <>
        <Grid  align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <div className="row">
        <div className="col-3 "></div>


        <div className="col-6 ">

        <TextField
          label="Email"
          type={"email"}
          name="Email"
          variant="standard"
          placeholder="Enter Email"
          fullWidth
          required
        />
        </div>
        </div>
        <div className="col-3 "></div>

        <br/>
        <TextField
          label="Password"
          name="password"
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
          disabled={props.isSubmitting}
          style={btnstyle}
          onClick={navigateToDashboard}
          fullWidth
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#">Forgot password1 ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
        </>
  );
};

export default StudentLoginPage;
