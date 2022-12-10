import {
    Avatar,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
  } from "@mui/material";
  // import axios from "axios";
  
  const StudentSignUpPage = () => {
    // const [name, setName] = useState("")
    // const [phoneNo, setPhoneNo] = useState("")
    // const [address, setAddress] = useState("")
  
    // const handleNameChange = (value) =>{
    //   setName(value)
    // }
    // const handlePhoneNoChange = (value) =>{
    //   setPhoneNo(value)
    // }
    // const handleAddressChange = (value) =>{
    //   setAddress(value)
    // }
  
    // const handleSave = () =>{
    //   const data ={
    //     Name : name,
    //     PhoneNo : phoneNo,
    //     Address : address,
    //     IsActive : 1
  
    //   };
    //   const url = 'https://localhost:44377/api/Test/Registration';
    //   axios.post(url,data).then((result)=>{
    //     alert(result.data);
    //     console.log("baby",data)
    //   }).catch((error)=>{
    //     alert(error);
    //   })
    // }
  
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const marginTop = { marginTop: 5 };
    return (
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form>
            <TextField
              fullWidth
              label="Name"
              variant="standard"
              // onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter your name"
            />
            <br />
            <TextField
              fullWidth
              label="Address"
              variant="standard"
              // onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Enter your Address"
            />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                style={{ display: "initial" }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              variant="standard"
              // onChange={(e) => handlePhoneNoChange(e.target.value)}
              placeholder="Enter your phone number"
            />
            <br />
            <TextField
              fullWidth
              label="Password"
              variant="standard"
              placeholder="Enter your password"
            />
            <br />
            <TextField
              fullWidth
              variant="standard"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
            />
            <Button
              type="submit"
              // onClick={()=>handleSave}
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    );
  };
  
  export default StudentSignUpPage;
  