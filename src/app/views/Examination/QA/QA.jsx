import {
  Breadcrumbs,
  Button,
  FormControl,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const QA = () => {
  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];

  return (
    <>
      <div className="row m-0 mt-3">
        <div className="col-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              DashBoard
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Question/Answer
            </Typography>
          </Breadcrumbs>
        </div>
        <hr />
      </div>

      <div className="row m-0">
        <div className="col-3">
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">Subject</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Age"
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row m-0">
        <div className="col-3" >
          <h3 id="QuestionText">Question1: </h3>
        </div>
        <div className="col-7"></div>
        <div className="col-2">
          <label className="ms-4 px-2">marks:</label>
          <input type={Text}  className="w-50"></input>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12" >
        <input
           type={Text}  
           id="Answer"
           className="w-100 "
          >
          </input> 
        </div>
      </div>

      <br />

      <div className="row m-0">
        <div className="col-3">
          <h3 id="AnswerText">Answer:</h3>
        </div>
      </div>

      <div className="row m-0">
        <div className="col-12">
        <input
           type={Text}  
           id="Answer"
           className="w-100 "
          >
          </input>
          {/* <textarea id="Answer" className="w-100 h-100"></textarea> */}
        </div>
      </div>

      <br />

      <div className="row m-0">
        <div className="col-3">
          <h3 id="AnswerText">Key Words:</h3>
        </div>
      </div>

      <div className="row m-0">
        <div className="col-2 ">
          <input
           type={Text}  
           
          >
          </input>
        </div>
        <div className="col-2 mx-2">
          <input type={Text}></input>
        </div>
        <div className="col-2 mx-2">
          <input type={Text} ></input>
        </div>
        <div className="col-2 mx-2">
          <input type={Text} ></input>
        </div>
        <div className="col-2 mx-2">
          <input type={Text} ></input>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="row m-0">
      <div className="col-12">

      <Button variant="outlined" 
      className="float-start" 
       sx={{
        width: 300,
      }} startIcon={<SendIcon   />}>
        Add Question
      </Button>
      {/* <Button variant="contained">Add Question</Button> */}
      <Button variant="outlined" 
      className="float-end" 
       sx={{
        width: 300,
        color: 'red',
      }} 
      startIcon={<DeleteIcon />}>
        Clear
      </Button>
      </div>
      </div>

    </>
  );
};
export default QA;
