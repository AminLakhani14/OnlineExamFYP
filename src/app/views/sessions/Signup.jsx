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
import axios from 'axios'

const INITIAL_STATE={

}
const Signup = () => {
  const [post, setpost] = useState();

    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be 6 character length")
      .required("Password is required!"),
    email: Yup.string()
      .email("Invalid Email address")
      .required("Email is required!"),
  });

  const [formData, setformData] = useState({...INITIAL_STATE});

  // function reset(ev) {
  //   ev.preventDefault();
  //   setState({ UserName: "", Age: "", Email: "", Password: "", City: "", Country: "", Type: ""});
  // }


const getpost = () =>{
  debugger
  axios 
  .post('https://localhost:7040/api/Registration/post-Register',formData)
  .then((res)=>{
    debugger
    if(res.status===200){ 
      setpost(res.data);
      console.log("hello world",res.data)
    }else{
      console.log("something went wrong")
    }
  })
  .catch((err)=> {
    debugger
    console.error(err)
  });
};

const handleChange=(e)=>{
    try {
      let name=e.target.name
      let value=e.target.value
      setformData((prevState)=>({
        ...prevState,
        [name]:value
      }))
    } catch (error) {
      
    }
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
          <FormControl  sx={{ width: 200 }}size="small">
            <InputLabel id="demo-select-small">Select</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Type"
              margin='dense'
              name='type'
              onChange={handleChange}
              value={formData.type}
              variant="outlined"
            >
          <MenuItem value={"Student"}>Student</MenuItem>
          <MenuItem value={"Teacher"}>Teacher</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-6 mt-2">
        </div>

        <div className="col-6 mt-0">
        <TextField
        fullWidth
        name='userName'
        margin='dense'
        size="small"
        value={formData.userName}
        onChange={handleChange}
        variant="outlined"
        placeholder='My Name is Amin Lakhani...'
        label="User Name"
      />
        </div>
        <div className="col-6">
        <TextField
        fullWidth
        name='age'
        variant="outlined"
        size="small"
        value={formData.age}
        onChange={handleChange}
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
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        placeholder='yahoo@.com'
        label="Email"
      />
        </div>
       <div className="col-6 mt-2">
        
        <FormControl sx={{ width: '418px' }} variant="outlined" size="small">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          value={formData.password}
          name='password'
          type={showPassword ? 'text' : 'password'} 
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
      name='country'
      margin='dense'
      type={'text'}
      size="small"
      value={formData.country}
      onChange={handleChange}
      variant="outlined"
      placeholder='Enter Pakistan...'
      label="Country"
    />
      </div>
      <div className="col-6">
      <TextField
      fullWidth
      name='city'
      variant="outlined"
      size="small"
      margin='dense'
      value={formData.city}
      onChange={handleChange}
      type='text'
      placeholder='Enter Karachi...'
      label="City"
    />
      </div>
     
    </div>
    <div className="d-flex justify-content-center mt-5">
    <Button
      variant="outlined"
      className=""
      sx={{
        width: 200,
      }}
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
      onClick={getpost}
    >
      Register
    </Button>
    </div>
      </div>
    </>
  )
}
export default Signup
