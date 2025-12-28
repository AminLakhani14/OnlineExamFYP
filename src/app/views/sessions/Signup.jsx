import IconButton from "@mui/material/IconButton";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useAuth from "app/hooks/useAuth";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";
import "./Style.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios.js";
import CloseIcon from "@mui/icons-material/Close";

const INITIAL_STATE = {
  Type: "",
  UserName: "",
  Age: "",
  Email: "",
  Password: "",
  Country: "",
  City: "",
};

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const Signup = () => {
  const { user } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function reset(prevState) {
    prevState.preventDefault();
    setformData({
      Type: "",
      UserName: "",
      Age: "",
      Email: "",
      Password: "",
      Country: "",
      City: "",
    });
  }

  const [formData, setformData] = useState({ ...INITIAL_STATE });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getpost = () => {
    axios
      .post("/api/Registration/post-Register", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("hello world", res.data);
          handleClick(true);
        } else {
          console.log("something went wrong");
          handleClicked(true);
        }
      })
      .catch((err) => {
        handleClicked(true);
        console.log(err);
      });
    handleClose();
  };

  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      setformData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } catch (error) {}
  };
  //success
  const [openS, setOpenS] = useState(false);

  const handleClick = () => {
    setOpenS(true);
  };

  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenS(false);
  };

  //warning
  const [news, setnews] = useState(false);

  const handleClicked = () => {
    setnews(true);
  };

  const handleCloseded = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setnews(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openS}
        autoHideDuration={1000}
        onClose={handleClosed}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Data Add successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={news}
        autoHideDuration={1000}
        onClose={handleCloseded}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Something Went wrong!
        </Alert>
      </Snackbar>
      <HeadBreadCrumb
        text1={"Dashboard"}
        text2={"Registration Form"}
        url={"/"}
      />
      <Dialog
        keepMounted
        open={open}
        // onClose={handleClose}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setOpen(false);
          }
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <Box>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            className="mt-3 mx-4 mb-4"
          >
            Do you want to Add this Question?
          </Typography>
          <div className="mb-4">
            <Button
              variant="outlined"
              className="ms-4"
              sx={{
                width: 100,
                color: "red",
              }}
              onClick={handleClose}
            >
              NO
            </Button>
            <Button
              variant="outlined"
              className="float-end me-4"
              sx={{
                width: 100,
              }}
              onClick={getpost}
            >
              YES
            </Button>
          </div>
        </Box>
      </Dialog>
      <div className="container">
        <div className="row mt-0">
          <div className="column col-12">
            <h3 className="my-2">Registration Form</h3>
          </div>
          <div className="col-6 mt-4">
            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="demo-select-small">Select</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Type"
                margin="dense"
                name="Type"
                onChange={handleChange}
                value={formData.Type}
                variant="outlined"
              >
                {(user?.role === "SA" || user?.Type === "SA") && (
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                )}
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Teacher"}>Teacher</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col-6 mt-2"></div>

          <div className="col-6 mt-0">
            <TextField
              fullWidth
              name="UserName"
              margin="dense"
              size="small"
              value={formData.UserName}
              onChange={handleChange}
              variant="outlined"
              placeholder="My Name is Amin Lakhani..."
              label="User Name"
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              name="Age"
              variant="outlined"
              size="small"
              value={formData.Age}
              onChange={handleChange}
              margin="dense"
              type="number"
              placeholder="My age is 18..."
              label="Age"
            />
          </div>

          <div className="col-6 mt-0">
            <TextField
              fullWidth
              name="Email"
              margin="dense"
              type={"email"}
              size="small"
              value={formData.Email}
              onChange={handleChange}
              variant="outlined"
              placeholder="yahoo@.com"
              label="Email"
            />
          </div>
          <div className="col-6 mt-2">
            <FormControl
              sx={{ width: "418px" }}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={formData.Password}
                name="Password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className="col-6 mt-0">
            <TextField
              fullWidth
              name="Country"
              margin="dense"
              type={"text"}
              size="small"
              value={formData.Country}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter Pakistan..."
              label="Country"
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              name="City"
              variant="outlined"
              size="small"
              margin="dense"
              value={formData.City}
              onChange={handleChange}
              type="text"
              placeholder="Enter Karachi..."
              label="City"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Button
            variant="outlined"
            className="me-4"
            sx={{
              width: 200,
            }}
            onClick={reset}
            startIcon={<SendIcon />}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            className=""
            sx={{
              width: 200,
            }}
            startIcon={<SendIcon />}
            onClick={handleOpen}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};
export default Signup;
