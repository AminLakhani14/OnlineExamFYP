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
  import SaveIcon from '@mui/icons-material/Save';
  import NavigateNextIcon from '@mui/icons-material/NavigateNext';

  const AttemptQA = () => {
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
          <div className="col-3" >
            <h3 id="QuestionText">Question:</h3>
          </div>
          <div className="col-7"></div>
          <div className="col-2">
            <label className="ms-4 px-2">marks:</label>
            <input type={Text} disabled  className="w-50"></input>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12" >
            <h6>Who is the current Prime Minister of Pakistan?Which Party did he belongs to?</h6>
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
            <textarea id="Answer" className="w-100 h-100"></textarea>
          </div>
        </div>
  
        <br />
  
        <br />
        <br />
        <br />
        <div className="row m-0">
        <div className="col-12">
  
       
        {/* <Button variant="contained">Add Question</Button> */}
        <Button variant="outlined" 
        className="float-end" 
         sx={{
          width: 300,
          color: 'red',
        }} 
        endIcon={<NavigateNextIcon />}>
          Next Question
        </Button>

        <Button variant="outlined" 
        className="float-start" 
         sx={{
          width: 300,
        }}
         endIcon={<SaveIcon />}>
          Save Answer
        </Button>
        </div>
        </div>
  
      </>
    );
  };
  export default AttemptQA;
  