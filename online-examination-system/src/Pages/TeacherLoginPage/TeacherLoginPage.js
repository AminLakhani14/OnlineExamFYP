import { useState } from "react";
import "./TeacherLoginPage.css";
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

const TeacherLoginPage = () => {
  const [permission, setPermission] = useState(0);
  const [error, setError] = useState(0);
  const [userName, setUserName] = useState("");
  const [password, setUserPassword] = useState("");

  const loginHandle = () => {
    if (userName && password >= 3) {
      setPermission(1);
      setError(0);
    } else {
      setError(1);
      setPermission(0);
    }
  };

  const logoutHandle = () => {
    // this.login.username.value = "";
    // this.login.password.value = "";
    setError(0);
    setPermission(0);
  };
  const handleChange = (event) => {
    console.log(event);
  };

  let errormessage = <p className="error-msg"> Invalid login attempt! </p>;

  return (
    <div className="login-app">
      <div className={`box ${permission ? "content" : "login"}`}>
        {permission ? (
          <>
            <div>
              <h2>Wellcome!</h2>
              <div className="btn btn-login" onClick={logoutHandle}>
                Logout
              </div>
            </div>
          </>
        ) : (
          <div className="align-items-center d-flex flex-column justify-content-center">
            <input
              type="text"
              // tabindex="1"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="password"
              // tabindex="1"
              placeholder="Password"
              onChange={handleChange}
              className=""
            />
            {error ? errormessage : null}
            <input
              id="abc"
              name="abc"
              type="checkbox"
              className="display-none"
            />
            <div className="d-flex align-items-center justify-content-space-between">
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />
              <Button className="text-capitalize forgotPassword">
                Forgot Password ?
              </Button>
            </div>
            <div className="btn btn-login mt-4" onClick={loginHandle}>
              Login
            </div>
            <Button className="text-capitalize forgotPassword mt-4">Don't have an account? Sign up</Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default TeacherLoginPage;
