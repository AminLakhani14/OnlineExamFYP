import {
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


const INITIAL_STATE = {
  course: "",
  question: "",
  marks: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctAnswer: "",
};
const MCQ = () => {

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

  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];
  const [state, setState] = useState({ ...INITIAL_STATE });

  function reset(ev) {
    ev.preventDefault();
    setState({
      course: "",
      question: "",
      marks: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
    });
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
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
        //  onClick={getpost}
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
              value={state.course}
              onChange={(ev) => {
                setState({ ...state, course: ev.target.value });
              }}
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
                value={state.marks}
                onChange={(ev) => {
                  setState({ ...state, marks: ev.target.value });
                }}
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
            value={state.question}
            onChange={(ev) => {
              setState({ ...state, question: ev.target.value });
            }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                value={state.option1}
                onChange={(ev) => {
                  setState({ ...state, option1: ev.target.value });
                }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                value={state.option2}
                onChange={(ev) => {
                  setState({ ...state, option2: ev.target.value });
                }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                value={state.option3}
                onChange={(ev) => {
                  setState({ ...state, option3: ev.target.value });
                }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                value={state.option4}
                onChange={(ev) => {
                  setState({ ...state, option4: ev.target.value });
                }}
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

            <div className="col-1 my-2">
              <TextField
                fullWidth
                value={state.correctAnswer}
                onChange={(ev) => {
                  setState({ ...state, correctAnswer: ev.target.value });
                }}
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
            width: 300,
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
            width: 300,
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
