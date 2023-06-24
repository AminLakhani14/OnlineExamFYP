import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";
import { useState } from "react";
import { Modal } from "antd";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";


const INITIAL_STATE = {
  course: "",
  question: "",
  marks: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "",
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
            position: 'absolute',
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
const MCQ = () => {

  
  const [post, setpost] = useState();
  const [formData, setformData] = useState({ ...INITIAL_STATE });

  
  function reset() {
    setformData({...INITIAL_STATE});
  }
  const getpost = () => {
    axios
      .post(`https://localhost:7040/api/MCQs/post-MCQs`, formData)
      .then((res) => {
        debugger;
        if (res.status === 200) {
          setpost(res.data);
          console.log("nikl laura", res.data);
        } else {
          console.log("something went wrong");
        }
      })
      .catch((err) => {
        handleClicked(true)
        console.log(err);
      });
      handleClick(true)
      handleClose();
      reset()
  };

  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];

  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      setformData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } catch (error) {

    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openS, setOpenS] = useState(false);

  const handleClick = () => {
    setOpenS(true);
  };

  const handleClosed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenS(false);
  };

  const [news, setnews] = useState(false);

  const handleClicked = () => {
    setnews(true);
  };

  const handleCloseded = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setnews(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={openS}
        autoHideDuration={1000}
        onClose={handleClosed}
      >
      <Alert severity="success" sx={{ width: '100%' }}>
        Data Add successfully!
      </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={news}
        autoHideDuration={1000}
        onClose={handleCloseded}
      >
      <Alert severity="error" sx={{ width: '100%' }}>
        Something Went wrong!
      </Alert>
      </Snackbar>
      
      <HeadBreadCrumb text1={"Dashboard"} text2={"MCQs"} url={"/"} />

      <Dialog
       
       keepMounted
       open={open}
       // onClose={handleClose}
       onClose={(event, reason) => {
         if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
             setOpen(false);
         }
     }
   }
       aria-labelledby="keep-mounted-modal-title"
       aria-describedby="keep-mounted-modal-description"
           sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
     >
       <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
       </BootstrapDialogTitle>
       <Box>
         <Typography id="keep-mounted-modal-title" variant="h6" component="h2" className="mt-3 mx-4 mb-4">
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

      <div className="row m-2">
        <div className="col-12">
          <FormControl className="mt-4" sx={{ minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">Subject</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Subject"
              name="course"
              onChange={handleChange}
              value={formData.course}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="d-flex justify-content-between mt-4">
            <h3 id="QuestionText" className="m-0 mt-2">
              Question1:{" "}
            </h3>
            <div className="align-items-center d-flex justify-content-end w-auto">
              <label className="align-items-center mt-2 d-flex px-2">
                marks:
              </label>
              <TextField
                className="mt-2 w-50"
                fullWidth
                size="small"
                name="marks"
                onChange={handleChange}
                value={formData.marks}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
          <TextField
            className="mt-2"
            fullWidth
            size="small"
            name="question"
            onChange={handleChange}
            value={formData.question}
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />
          <div className="d-flex justify-content-between mt-4">
            <div className="col-3">
              <h3 id="Answer_MCQs">Answer:</h3>
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 1:</label>
            </div>
            <div className="col-2 my-2">
              <TextField
                fullWidth
                name="optionA"
                onChange={handleChange}
                value={formData.optionA}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 2:</label>
            </div>
            <div className="col-2 my-2">
              <TextField
                fullWidth
                name="optionB"
                onChange={handleChange}
                value={formData.optionB}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 3:</label>
            </div>
            <div className="col-2 my-2">
              <TextField
                fullWidth
                name="optionC"
                onChange={handleChange}
                value={formData.optionC}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 4:</label>
            </div>
            <div className="col-2 my-2">
              <TextField
                fullWidth
                name="optionD"
                onChange={handleChange}
                value={formData.optionD}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Correct Answer:</label>
            </div>

            <div className="col-2 my-2">
              <TextField
                fullWidth
                name="correctAnswer"
                onChange={handleChange}
                value={formData.correctAnswer}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footerBtn d-flex justify-content-between mt-5 my-5">
        <Button
          variant="outlined"
          className=""
          onClick={reset}
          sx={{
            width: 200,
            color: "red",
          }}
          startIcon={<DeleteIcon />}
        >
          Clear
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
          Add Question
        </Button>
      </div>
    </>
  );
};
export default MCQ;
