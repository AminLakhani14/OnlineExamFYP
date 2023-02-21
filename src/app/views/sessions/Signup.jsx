import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import HeadBreadCrumb from 'app/components/BreadCrumb/HeadBreadCrumb'
import "./Style.css"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";

const Signup = () => {
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [state, setState] = React.useState({ UserName: "", Age: "", email: "", password: "", City: "", Country: "", Subject: ""});

  function reset(ev) {
    ev.preventDefault();
    setState({ UserName: "", message: "", Age: "", email: "", password: "", City: "", Country: "", Subject: ""});
  }
  
  return (
    <>
      <HeadBreadCrumb
        text1={'Dashboard'}
        text2={'Registration Form'}
        url={'/'}
      />
        <div className='container'>
      <div className="row mt-0">
        <div className="column col-12">
          <h3>Registration Form</h3>
        </div>
        <div className="col-6 mt-4">
          <FormControl  sx={{ width: '475px' }}size="small">
            <InputLabel id="demo-select-small">Select</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Subject"
              margin='dense'
              name='Subject'
              value={state.Subject}
              onChange={(ev) => {
                setState({ ...state, Subject: ev.target.value });
              }}
              variant="outlined"
            >
          <MenuItem value={1}>Student</MenuItem>
          <MenuItem value={2}>Teacher</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-6 mt-2">
        </div>

        <div className="col-6 mt-0">
        <TextField
        fullWidth
        name='User'
        margin='dense'
        size="small"
        value={state.UserName}
        onChange={(ev) => {
            setState({ ...state, UserName: ev.target.value });
          }}
        variant="outlined"
        placeholder='My Name is Amin Lakhani...'
        label="User Name"
      />
        </div>
        <div className="col-6">
        <TextField
        fullWidth
        name='Age'
        variant="outlined"
        size="small"
        value={state.Age}
        onChange={(ev) => {
            setState({ ...state, Age: ev.target.value });
          }}
        margin='dense'
        type='number'
        placeholder='My age is 18...'
        label="Age"
      />
        </div>
        

        <div className="col-6 mt-0">
        <TextField
        fullWidth
        name='email'
        margin='dense'
        type={'email'}
        size="small"
        value={state.email}
        onChange={(ev) => {
            setState({ ...state, email: ev.target.value });
          }}
        variant="outlined"
        placeholder='yahoo@.com'
        label="Email"
      />
        </div>
       <div className="col-6 mt-2">
        
        <FormControl sx={{ width: '475px' }} variant="outlined" size="small">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          value={state.password}
          name='password'
          type={showPassword ? 'text' : 'password'} 
          onChange={(ev) => {
            setState({ ...state, password: ev.target.value });
          }}
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
      name='Country'
      margin='dense'
      type={'text'}
      size="small"
      value={state.Country}
      onChange={(ev) => {
        setState({ ...state, Country: ev.target.value });
      }}
      variant="outlined"
      placeholder='Enter Pakistan...'
      label="Country"
    />
      </div>
      <div className="col-6">
      <TextField
      fullWidth
      name='City'
      variant="outlined"
      size="small"
      margin='dense'
      value={state.City}
      onChange={(ev) => {
        setState({ ...state, City: ev.target.value });
      }}
      type='text'
      placeholder='Enter Karachi...'
      label="City"
    />
      </div>
     
    </div>
    <div className="d-flex justify-content-center mt-5">
    <Button
      variant="outlined"
      className="mx-3"
      sx={{
        width: 200,
      }}
      startIcon={<SendIcon />}
      onClick={reset}
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
      
    >
      Register
    </Button>
    </div>
      </div>
    </>
  )
}
export default Signup
